<?php

namespace App\Http\Controllers\SatuSehat;

use App\Http\Controllers\Controller;
use App\Traits\SatuSehatTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

/**
 * Controller integrasi SATUSEHAT (FHIR R4)
 *
 * Endpoints dasar yang disediakan:
 * - GET /api/satusehat/token        : Mendapatkan token (untuk debugging)
 * - GET /api/satusehat/metadata     : Ambil CapabilityStatement dari FHIR server
 * - POST /api/satusehat/{resource}  : Relay create resource (mis. Patient, Encounter, Observation)
 * - GET /api/satusehat/{resource}/{id} : Relay get resource by ID
 *
 * Referensi:
 * - HL7 FHIR: https://www.hl7.org/fhir/
 * - SATUSEHAT FHIR: https://satusehat.kemkes.go.id/platform/docs/id/fhir/
 */
class SatuSehatController extends Controller
{
    use SatuSehatTraits;

    /**
     * Mengembalikan token SATUSEHAT untuk verifikasi cepat.
     * PERINGATAN: Endpoint ini sebaiknya dibatasi aksesnya (role admin/teknis saja).
     */
    public function token()
    {
        $token = $this->satusehatToken();
        if (!$token) {
            return response()->json([
                'ok' => false,
                'message' => 'Gagal mendapatkan token SATUSEHAT. Periksa .env dan kredensial.',
            ], 500);
        }

        return response()->json([
            'ok' => true,
            'env' => $this->satusehatEnv(),
            'token' => $token,
        ]);
    }

    /**
     * Endpoint debug untuk melihat status & body error dari permintaan token
     * TANPA mengembalikan client_id/client_secret pada response.
     *
     * Gunakan sementara saat troubleshooting; lindungi route ini di production.
     */
    public function tokenDebug(\Illuminate\Http\Request $request)
    {
        $authBase = config('services.satusehat.auth');
        $clientIdPresent = !empty(config('services.satusehat.client_id'));
        $clientSecretPresent = !empty(config('services.satusehat.client_secret'));
        // Izinkan override via query params untuk keperluan debugging cepat
        $clientIdOverride = $request->query('client_id');
        $clientSecretOverride = $request->query('client_secret');

        if (!$clientIdPresent || !$clientSecretPresent || empty($authBase)) {
            return response()->json([
                'ok' => false,
                'message' => 'Konfigurasi SATUSEHAT belum lengkap. Pastikan SATUSEHAT_AUTH, SATUSEHAT_CLIENT_ID, dan SATUSEHAT_CLIENT_SECRET terisi.',
                'env' => $this->satusehatEnv(),
                'config' => [
                    'auth_base_present' => !empty($authBase),
                    'client_id_present' => $clientIdPresent,
                    'client_secret_present' => $clientSecretPresent,
                ],
            ], 422);
        }

        $use = strtolower((string) $request->query('use', 'accesstoken'));
        // Default gunakan v1/accesstoken sesuai arahan user; bisa diubah dengan ?use=token atau ?use=v2-token
        if ($use === 'v2-token') {
            if (str_ends_with($authBase, '/v1')) {
                $url = substr($authBase, 0, -3) . '/v2/token';
            } else {
                $url = rtrim($authBase, '/') . '/token';
            }
        } else if ($use === 'token') {
            $url = rtrim($authBase, '/') . '/token';
        } else {
            $url = rtrim($authBase, '/') . '/accesstoken';
        }

        try {
            $response = Http::asForm()
                ->withOptions([
                    // Biarkan default verify=true untuk mencegah masalah TLS; ubah hanya saat perlu.
                    'verify' => true,
                    'connect_timeout' => 10,
                    'timeout' => 20,
                ])
                // Ikuti Playbook: grant_type di query, kredensial di body
                ->post($url . '?grant_type=client_credentials', [
                    'client_id' => $clientIdOverride ?? config('services.satusehat.client_id'),
                    'client_secret' => $clientSecretOverride ?? config('services.satusehat.client_secret'),
                ]);

            // Ambil body JSON jika bisa, fallback ke string body.
            $body = $response->json();
            if ($body === null || $body === []) {
                $rawBody = $response->body();
                // Jangan bocorkan kredensial jika server meng-echo form.
                if (is_string($rawBody) && preg_match('/client_(id|secret)/i', $rawBody)) {
                    $body = '<<redacted: server echoed credentials, hidden>>';
                } else {
                    $body = $rawBody;
                }
            } else if (is_array($body)) {
                // Hapus kredensial jika secara tidak biasa dikembalikan di body
                unset($body['client_id'], $body['client_secret']);
            }

            return response()->json([
                'ok' => $response->successful(),
                'status' => $response->status(),
                'endpoint' => $url,
                // Jangan tampilkan client_id/secret. Hanya informasi aman.
                'request' => [
                    'grant_type' => 'client_credentials (query)',
                ],
                'response_headers' => [
                    'content_type' => $response->header('Content-Type'),
                    'www_authenticate' => $response->header('WWW-Authenticate'),
                    'x_request_id' => $response->header('X-Request-Id'),
                ],
                'body' => $body,
            ], $response->status());
        } catch (\Throwable $e) {
            return response()->json([
                'ok' => false,
                'message' => 'Token debug request gagal dieksekusi.',
                'endpoint' => $url,
                'exception' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Ambil CapabilityStatement dari FHIR server (GET {FHIR}/metadata)
     */
    public function metadata()
    {
        $res = $this->satusehatRequest('GET', 'metadata');
        return response()->json($res, $res['ok'] ? 200 : ($res['status'] ?: 500));
    }

    /**
     * Ambil Organization dari FHIR menggunakan pencarian identifier berbasis SATUSEHAT_ORG_ID (IHS number).
     * Catatan: ID resource FHIR biasanya UUID. Oleh karena itu, kita melakukan pencarian via token identifier.
     * Mendukung override via query: ?identifier=<token> atau ?system=<system-url> (akan digabung dengan nilai IHS).
     */
    public function organization(Request $request)
    {
        $orgIhs = $this->satusehatOrganizationId();
        if (empty($orgIhs)) {
            return response()->json([
                'ok' => false,
                'message' => 'SATUSEHAT_ORG_ID belum diisi di .env.'
            ], 422);
        }

        // Kandidat token identifier berdasarkan variasi dokumentasi SATUSEHAT.
        // Bentuk umum FHIR: identifier = system|value
        $identifierTokens = [
            "http://sys-ids.kemkes.go.id/organization|{$orgIhs}",
            // Beberapa referensi menyebut system berakhiran IHS number; sertakan variasi ini sebagai fallback
            "http://sys-ids.kemkes.go.id/organization/{$orgIhs}|{$orgIhs}",
            // Fallback: hanya value
            (string) $orgIhs,
        ];

        // Override via query untuk fleksibilitas troubleshooting
        $overrideIdentifier = $request->query('identifier');
        if (!empty($overrideIdentifier)) {
            $identifierTokens = [ (string) $overrideIdentifier ];
        } else {
            $overrideSystem = $request->query('system');
            if (!empty($overrideSystem)) {
                $identifierTokens = [ rtrim((string) $overrideSystem, '|') . '|' . $orgIhs ];
            }
        }

        $lastRes = null;
        $bundleRes = null;
        foreach ($identifierTokens as $token) {
            $res = $this->satusehatRequest('GET', 'Organization', null, [
                'query' => [ 'identifier' => $token ],
            ]);
            // Bundle FHIR memiliki field entry ketika ada data
            if ($res['ok'] && is_array($res['json'] ?? null) && isset($res['json']['entry'])) {
                $bundleRes = $res;
                break;
            }
            $lastRes = $res; // simpan error/respons terakhir untuk konteks
        }

        if ($bundleRes) {
            $json = $bundleRes['json'] ?? [];
            $total = $json['total'] ?? (is_array($json['entry'] ?? null) ? count($json['entry']) : 0);
            $ids = [];
            foreach (($json['entry'] ?? []) as $entry) {
                $ids[] = $entry['resource']['id'] ?? null;
            }
            $ids = array_values(array_filter($ids));
            $firstResource = $json['entry'][0]['resource'] ?? null;

            return response()->json([
                'ok' => true,
                'status' => $bundleRes['status'] ?? 200,
                'search' => [
                    'tokens_tried' => $identifierTokens,
                ],
                'total' => $total,
                'matched_ids' => $ids,
                'first_resource' => $firstResource,
                'bundle' => $json,
            ], 200);
        }

        // Fallback: coba read langsung menggunakan IHS number sebagai ID resource (tidak umum, namun dicoba untuk berjaga-jaga)
        $readRes = $this->satusehatRequest('GET', 'Organization/' . $orgIhs);
        $resp = $readRes['ok'] ? $readRes : ($lastRes ?? $readRes);
        return response()->json($resp, $resp['ok'] ? 200 : ($resp['status'] ?: 404));
    }

    /**
     * Ringkasan sub-organisasi (department/unit) di bawah Organization induk (SATUSEHAT_ORG_ID)
     * Output sederhana: id (UUID FHIR), code (identifier.value), name, partOf
     * Endpoint: GET /api/satusehat/organization/subunits
     * Query opsional:
     *  - identifier=<token> (default: value-only IHS number)
     *  - limit=<n> untuk membatasi jumlah output
     */
    public function organizationSubunits(Request $request)
    {
        $orgIhs = $this->satusehatOrganizationId();
        if (empty($orgIhs)) {
            return response()->json([
                'ok' => false,
                'message' => 'SATUSEHAT_ORG_ID belum diisi di .env.'
            ], 422);
        }

        $identifierToken = $request->query('identifier', (string) $orgIhs);
        $limit = (int) $request->query('limit', 0);

        $res = $this->satusehatRequest('GET', 'Organization', null, [
            'query' => [ 'identifier' => $identifierToken ],
        ]);

        if (!$res['ok']) {
            return response()->json($res, $res['status'] ?: 500);
        }

        $json = $res['json'] ?? [];
        $entries = is_array($json['entry'] ?? null) ? $json['entry'] : [];

        $items = [];
        $map = [];
        foreach ($entries as $entry) {
            $resource = $entry['resource'] ?? [];
            if (($resource['resourceType'] ?? '') !== 'Organization') {
                continue;
            }

            $identifierCode = null;
            foreach (($resource['identifier'] ?? []) as $ident) {
                $system = $ident['system'] ?? '';
                $value = $ident['value'] ?? null;
                if (!$value) { continue; }
                // Ambil value jika system adalah sys-ids kemkes organization (dengan/atau tanpa suffix IHS)
                if (str_starts_with($system, 'http://sys-ids.kemkes.go.id/organization')) {
                    $identifierCode = $value;
                    break;
                }
            }

            $item = [
                'id' => $resource['id'] ?? null,
                'code' => $identifierCode,
                'name' => $resource['name'] ?? null,
                'partOf' => $resource['partOf']['reference'] ?? null,
                'active' => $resource['active'] ?? null,
            ];
            $items[] = $item;
            if ($identifierCode && ($resource['name'] ?? null)) {
                $map[$identifierCode] = $resource['name'];
            }
            if ($limit > 0 && count($items) >= $limit) {
                break;
            }
        }

        return response()->json([
            'ok' => true,
            'status' => $res['status'] ?? 200,
            'parent' => [ 'id' => $orgIhs, 'reference' => 'Organization/' . $orgIhs ],
            'total' => $json['total'] ?? count($items),
            'identifier_query' => $identifierToken,
            'subunits' => $items,
            // Peta kode→nama agar mudah di gunakan di UI (opsional)
            'map' => $request->boolean('map', false) ? $map : new \stdClass(),
        ], 200);
    }

    /**
     * Relay pembuatan resource FHIR (POST)
     * Body request harus berisi JSON FHIR sesuai resource yang dimaksud.
     * Contoh: POST /api/satusehat/Patient (body: FHIR Patient)
     */
    public function createResource(Request $request, string $resource)
    {
        $payload = $request->all();
        if (empty($payload)) {
            return response()->json([
                'ok' => false,
                'message' => 'Payload kosong. Kirimkan JSON FHIR yang valid.'
            ], 422);
        }

        // Validasi resource berupa huruf/angka saja untuk keamanan dasar
        if (!preg_match('/^[A-Za-z]+$/', $resource)) {
            return response()->json([
                'ok' => false,
                'message' => 'Nama resource tidak valid.'
            ], 400);
        }

        $res = $this->satusehatRequest('POST', $resource, $payload, [
            'prefer_representation' => true,
        ]);

        return response()->json($res, $res['ok'] ? 201 : ($res['status'] ?: 500));
    }

    /**
     * Relay pengambilan resource FHIR berdasarkan ID (GET)
     * Contoh: GET /api/satusehat/Patient/{id}
     */
    public function getResource(string $resource, string $id)
    {
        if (!preg_match('/^[A-Za-z]+$/', $resource)) {
            return response()->json([
                'ok' => false,
                'message' => 'Nama resource tidak valid.'
            ], 400);
        }
        if (!preg_match('/^[A-Za-z0-9\-\.]+$/', $id)) { // ID FHIR bisa mengandung dash/dot
            return response()->json([
                'ok' => false,
                'message' => 'ID resource tidak valid.'
            ], 400);
        }

        $res = $this->satusehatRequest('GET', $resource . '/' . $id);
        return response()->json($res, $res['ok'] ? 200 : ($res['status'] ?: 500));
    }

    /**
     * ===== CRUD Mapping Departemen ↔ SATUSEHAT Organization Subunit =====
     */
    public function mappingDepartemenIndex(Request $request)
    {
        // Gabungkan data departemen dan mapping
        $start = max(0, (int) $request->query('start', 0));
        $limit = max(1, min(500, (int) $request->query('limit', 50)));
        $q = trim((string) $request->query('q', ''));

        $builder = \Illuminate\Support\Facades\DB::table('departemen as d')
            ->leftJoin('satu_sehat_mapping_departemen as m', 'm.dep_id', '=', 'd.dep_id')
            ->select('d.dep_id', 'd.nama', 'm.id_organisasi_satusehat');

        if ($q !== '') {
            $builder->where(function ($w) use ($q) {
                $w->where('d.dep_id', 'like', "%{$q}%")
                  ->orWhere('d.nama', 'like', "%{$q}%");
            });
        }

        $total = (clone $builder)->count();
        $rows = $builder->orderBy('d.dep_id')->offset($start)->limit($limit)->get();

        return response()->json([
            'ok' => true,
            'total' => $total,
            'start' => $start,
            'limit' => $limit,
            'list' => $rows,
        ]);
    }

    public function mappingDepartemenStore(Request $request)
    {
        $data = $request->validate([
            'dep_id' => ['required', 'string', 'max:4'],
            // Jika sudah punya ID subunit FHIR, bisa kirim langsung; jika tidak, bisa create
            'organization_id' => ['nullable', 'string', 'max:64'],
            'create_if_missing' => ['sometimes', 'boolean'],
            // Optional override name saat create
            'name' => ['nullable', 'string', 'max:100'],
        ]);

        $dep = \Illuminate\Support\Facades\DB::table('departemen')->where('dep_id', $data['dep_id'])->first();
        if (!$dep) {
            return response()->json(['ok' => false, 'message' => 'Departemen tidak ditemukan'], 404);
        }

        $orgId = $data['organization_id'] ?? null;
        $created = null;

        if (!$orgId) {
            // Coba temukan subunit berdasarkan identifier kode departemen + partof induk
            $orgIhs = $this->satusehatOrganizationId();
            $tokens = [
                "http://sys-ids.kemkes.go.id/organization|{$data['dep_id']}",
                "http://sys-ids.kemkes.go.id/organization/{$orgIhs}|{$data['dep_id']}",
                (string) $data['dep_id'],
            ];
            $foundRes = null;
            foreach ($tokens as $t) {
                $res = $this->satusehatRequest('GET', 'Organization', null, [
                    'query' => [ 'identifier' => $t, 'partof' => $orgIhs ],
                ]);
                if ($res['ok'] && is_array($res['json'] ?? null) && isset($res['json']['entry'][0]['resource'])) {
                    $foundRes = $res;
                    break;
                }
            }
            if ($foundRes) {
                $orgId = $foundRes['json']['entry'][0]['resource']['id'] ?? null;
            }
        }

        if (!$orgId && ($data['create_if_missing'] ?? false)) {
            // Buat subunit Organization baru di SATUSEHAT
            $orgIhs = $this->satusehatOrganizationId();
            $payload = [
                'resourceType' => 'Organization',
                'active' => true,
                'name' => $data['name'] ?? ($dep->nama ?? $data['dep_id']),
                'type' => [
                    [
                        'coding' => [[
                            'system' => 'http://terminology.hl7.org/CodeSystem/organization-type',
                            'code' => 'dept',
                            'display' => 'Department',
                        ]],
                        'text' => 'Department',
                    ]
                ],
                'identifier' => [[
                    'system' => 'http://sys-ids.kemkes.go.id/organization',
                    'value' => $data['dep_id'],
                ]],
                'partOf' => [
                    'reference' => 'Organization/' . $orgIhs,
                ],
            ];
            $res = $this->satusehatRequest('POST', 'Organization', $payload, [ 'prefer_representation' => true ]);
            if (!$res['ok']) {
                return response()->json($res, $res['status'] ?: 400);
            }
            $created = $res['json'] ?? null;
            $orgId = $created['id'] ?? null;
        }

        if (!$orgId) {
            return response()->json([
                'ok' => false,
                'message' => 'Tidak menemukan atau membuat Organization subunit untuk departemen ini. Berikan organization_id atau set create_if_missing=true.',
            ], 422);
        }

        // Simpan/Update mapping
        \App\Models\SatuSehatDepartemenMapping::updateOrCreate(
            ['dep_id' => $data['dep_id']],
            ['id_organisasi_satusehat' => $orgId]
        );

        return response()->json([
            'ok' => true,
            'message' => 'Mapping tersimpan',
            'dep_id' => $data['dep_id'],
            'id_organisasi_satusehat' => $orgId,
            'created_resource' => $created,
        ], 201);
    }

    public function mappingDepartemenUpdate(Request $request, string $dep_id)
    {
        $data = $request->validate([
            'organization_id' => ['required', 'string', 'max:64'],
        ]);
        $exists = \Illuminate\Support\Facades\DB::table('departemen')->where('dep_id', $dep_id)->exists();
        if (!$exists) {
            return response()->json(['ok' => false, 'message' => 'Departemen tidak ditemukan'], 404);
        }

        // Validasi Organization ID di FHIR (optional, tapi membantu)
        $res = $this->satusehatRequest('GET', 'Organization/' . $data['organization_id']);
        if (!$res['ok']) {
            return response()->json([
                'ok' => false,
                'message' => 'Organization ID tidak valid atau tidak ditemukan di SATUSEHAT',
                'status' => $res['status'],
                'error' => $res['error'],
            ], 422);
        }

        \App\Models\SatuSehatDepartemenMapping::updateOrCreate(
            ['dep_id' => $dep_id],
            ['id_organisasi_satusehat' => $data['organization_id']]
        );

        return response()->json(['ok' => true, 'message' => 'Mapping diperbarui']);
    }

    public function mappingDepartemenDestroy(string $dep_id)
    {
        $m = \App\Models\SatuSehatDepartemenMapping::where('dep_id', $dep_id)->first();
        if (!$m) {
            return response()->json(['ok' => false, 'message' => 'Mapping tidak ditemukan'], 404);
        }
        $m->delete();
        return response()->json(['ok' => true, 'message' => 'Mapping dihapus']);
    }

    /**
     * Update Organization resource di SATUSEHAT (PUT Organization/:id)
     * Endpoint: PUT /api/satusehat/organization/{id}
     * Body: { name?: string, active?: boolean }
     */
    public function organizationUpdate(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:150'],
            'active' => ['nullable', 'boolean'],
        ]);

        // Ambil representasi penuh Organization dari SATUSEHAT
        $read = $this->satusehatRequest('GET', 'Organization/' . $id);
        if (!$read['ok'] || !is_array($read['json'] ?? null)) {
            return response()->json([
                'ok' => false,
                'message' => 'Organization tidak ditemukan atau tidak dapat dibaca dari SATUSEHAT',
                'status' => $read['status'],
                'error' => $read['error'],
            ], $read['status'] ?: 404);
        }

        $payload = $read['json'];
        // Pastikan resourceType & id konsisten
        $payload['resourceType'] = 'Organization';
        $payload['id'] = $id;

        // Terapkan perubahan yang diizinkan
        if (array_key_exists('name', $data) && $data['name'] !== null) {
            $payload['name'] = $data['name'];
        }
        if (array_key_exists('active', $data)) {
            $payload['active'] = (bool) $data['active'];
        }

        // Kirim PUT ke FHIR
        $update = $this->satusehatRequest('PUT', 'Organization/' . $id, $payload, [ 'prefer_representation' => true ]);
        if (!$update['ok']) {
            return response()->json([
                'ok' => false,
                'message' => 'Gagal memperbarui Organization di SATUSEHAT',
                'status' => $update['status'],
                'error' => $update['error'],
                'body' => $update['body'] ?? null,
            ], $update['status'] ?: 400);
        }

        return response()->json([
            'ok' => true,
            'message' => 'Organization diperbarui',
            'resource' => $update['json'] ?? null,
        ]);
    }

    /**
     * ===== Util: Koordinat default dari .env =====
     * Endpoint: GET /api/satusehat/config/coordinates
     */
    public function coordinates()
    {
        return response()->json([
            'ok' => true,
            'longitude' => (string) env('LONGITUDE', ''),
            'latitude' => (string) env('LATITUDE', ''),
            'altitude' => (string) env('ALTITUDE', ''),
        ]);
    }

    /**
     * ===== Pencarian Location di SATUSEHAT =====
     * Endpoint: GET /api/satusehat/location
     * Query opsional: identifier, name, organization, lat, lon, radius
     * 
     * Sesuai katalog SATUSEHAT: GET Location mendukung pencarian dengan berbagai parameter termasuk koordinat
     */
    public function locationSearch(\Illuminate\Http\Request $request)
    {
        $query = [];
        foreach (['identifier', 'name', 'organization'] as $key) {
            $val = trim((string) $request->query($key, ''));
            if ($val !== '') { $query[$key] = $val; }
        }

        // Dukungan koordinat untuk pencarian berbasis lokasi (jika SATUSEHAT mendukung)
        $lat = trim((string) $request->query('lat', ''));
        $lon = trim((string) $request->query('lon', ''));
        $radius = trim((string) $request->query('radius', ''));
        
        if ($lat !== '' && $lon !== '') {
            $query['near'] = $lat . ',' . $lon;
            if ($radius !== '') {
                $query['near-distance'] = $radius . '|km'; // Format: radius|unit
            }
        }

        // Jika organization berupa ID saja, tambahkan prefix reference
        if (!empty($query['organization']) && preg_match('/^[A-Za-z0-9\-\.]+$/', $query['organization'])) {
            $query['organization'] = 'Organization/' . $query['organization'];
        }

        // Jika hanya koordinat yang diisi tanpa parameter lain, tetap izinkan pencarian
        // (beberapa sistem FHIR mendukung pencarian berbasis koordinat saja)
        if (empty($query) && ($lat === '' || $lon === '')) {
            return response()->json([
                'ok' => false,
                'message' => 'Minimal salah satu parameter pencarian (identifier, name, organization, atau lat/lon) harus diisi.'
            ], 422);
        }

        $res = $this->satusehatRequest('GET', 'Location', null, [ 'query' => $query ]);
        if (!$res['ok']) {
            return response()->json($res, $res['status'] ?: 500);
        }

        $json = $res['json'] ?? [];
        $entries = is_array($json['entry'] ?? null) ? $json['entry'] : [];
        $items = [];
        foreach ($entries as $entry) {
            $r = $entry['resource'] ?? [];
            if (($r['resourceType'] ?? '') !== 'Location') { continue; }
            $items[] = [
                'id' => $r['id'] ?? null,
                'name' => $r['name'] ?? null,
                'status' => $r['status'] ?? null,
                'managingOrganization' => $r['managingOrganization']['reference'] ?? null,
                'position' => $r['position'] ?? null,
                'identifier' => $r['identifier'] ?? [],
                'address' => $r['address']['text'] ?? ($r['address']['line'][0] ?? null),
            ];
        }

        return response()->json([
            'ok' => true,
            'status' => $res['status'] ?? 200,
            'total' => $json['total'] ?? count($items),
            'query' => $query,
            'list' => $items,
            'bundle' => $json,
        ]);
    }

    /**
     * ===== CRUD Mapping Lokasi Ralan (Poliklinik ↔ SATUSEHAT Location) =====
     */
    public function mappingLokasiIndex(\Illuminate\Http\Request $request)
    {
        $start = max(0, (int) $request->query('start', 0));
        $limit = max(1, min(500, (int) $request->query('limit', 50)));
        $q = trim((string) $request->query('q', ''));

        $b = \Illuminate\Support\Facades\DB::table('satu_sehat_mapping_lokasi_ralan as m')
            ->leftJoin('poliklinik as p', 'p.kd_poli', '=', 'm.kd_poli')
            ->select('m.*', 'p.nm_poli');
        if ($q !== '') {
            $b->where(function ($w) use ($q) {
                $w->where('m.kd_poli', 'like', "%{$q}%")
                  ->orWhere('p.nm_poli', 'like', "%{$q}%")
                  ->orWhere('m.id_lokasi_satusehat', 'like', "%{$q}%");
            });
        }
        $total = (clone $b)->count();
        $rows = $b->orderBy('m.kd_poli')->offset($start)->limit($limit)->get();

        return response()->json([
            'ok' => true,
            'total' => $total,
            'start' => $start,
            'limit' => $limit,
            'list' => $rows,
        ]);
    }

    public function mappingLokasiStore(\Illuminate\Http\Request $request)
    {
        $data = $request->validate([
            'kd_poli' => ['required', 'string', 'max:5'],
            'id_organisasi_satusehat' => ['required', 'string', 'max:64'],
            'id_lokasi_satusehat' => ['nullable', 'string', 'max:64'],
            'longitude' => ['nullable', 'string', 'max:30'],
            'latitude' => ['nullable', 'string', 'max:30'],
            'altittude' => ['nullable', 'string', 'max:30'],
            'create_if_missing' => ['sometimes', 'boolean'],
        ], [
            'kd_poli.required' => 'Kode poliklinik wajib diisi.',
            'id_organisasi_satusehat.required' => 'ID Organization SATUSEHAT wajib diisi.',
        ]);

        $poli = \Illuminate\Support\Facades\DB::table('poliklinik')->where('kd_poli', $data['kd_poli'])->first();
        if (!$poli) {
            return response()->json(['ok' => false, 'message' => 'Poliklinik tidak ditemukan'], 404);
        }

        // Default koordinat dari .env jika tidak dikirim
        $longitude = $data['longitude'] ?? (string) env('LONGITUDE', '');
        $latitude = $data['latitude'] ?? (string) env('LATITUDE', '');
        $altittude = $data['altittude'] ?? (string) env('ALTITUDE', '');

        $locationId = $data['id_lokasi_satusehat'] ?? null;
        $created = null;

        if (!$locationId) {
            // Coba cari Location berdasarkan nama dan organisasi
            $queries = [
                ['name' => $poli->nm_poli, 'organization' => 'Organization/' . $data['id_organisasi_satusehat']],
                ['name' => $data['kd_poli'], 'organization' => 'Organization/' . $data['id_organisasi_satusehat']],
            ];
            foreach ($queries as $q) {
                $res = $this->satusehatRequest('GET', 'Location', null, ['query' => $q]);
                if ($res['ok'] && isset(($res['json']['entry'] ?? [])[0]['resource']['id'])) {
                    $locationId = $res['json']['entry'][0]['resource']['id'];
                    break;
                }
            }
        }

        if (!$locationId && ($data['create_if_missing'] ?? false)) {
            // Buat Location baru sesuai dokumentasi SATUSEHAT
            // Sesuai FHIR spec: position.longitude, latitude, altitude harus decimal (number), bukan string
            $payload = [
                'resourceType' => 'Location',
                'status' => 'active',
                'name' => $poli->nm_poli,
                'identifier' => [[
                    'system' => 'http://sys-ids.kemkes.go.id/location',
                    'value' => $data['kd_poli'],
                ]],
                'managingOrganization' => [
                    'reference' => 'Organization/' . $data['id_organisasi_satusehat'],
                ],
            ];

            // Tambahkan position hanya jika koordinat valid dan dapat dikonversi ke decimal
            // FHIR Location.position memerlukan tipe decimal (number), bukan string
            // CRITICAL: Pastikan nilai dikirim sebagai number, bukan string
            // Sesuai dokumentasi SATUSEHAT: position.longitude, latitude, altitude harus decimal
            $position = [];
            if (!empty($longitude) && is_numeric($longitude)) {
                // Konversi ke float dan pastikan bukan string
                // Gunakan (float) cast untuk memastikan tipe PHP float, bukan string
                $position['longitude'] = (float) $longitude;
            }
            if (!empty($latitude) && is_numeric($latitude)) {
                $position['latitude'] = (float) $latitude;
            }
            if (!empty($altittude) && is_numeric($altittude)) {
                $position['altitude'] = (float) $altittude;
            }
            
            // Hanya tambahkan position jika minimal longitude dan latitude ada
            // Pastikan nilai benar-benar sebagai number sebelum ditambahkan ke payload
            if (!empty($position['longitude']) && !empty($position['latitude'])) {
                // Pastikan semua nilai adalah number, bukan string
                $payload['position'] = [
                    'longitude' => (float) $position['longitude'],
                    'latitude' => (float) $position['latitude'],
                ];
                if (isset($position['altitude'])) {
                    $payload['position']['altitude'] = (float) $position['altitude'];
                }
            }

            $res = $this->satusehatRequest('POST', 'Location', $payload, [ 'prefer_representation' => true ]);
            if (!$res['ok']) {
                // Parse error dari OperationOutcome untuk memberikan pesan yang lebih jelas
                $errorMessage = 'Gagal membuat Location di SATUSEHAT';
                $errorDetails = [];
                
                if (isset($res['json']['issue']) && is_array($res['json']['issue'])) {
                    foreach ($res['json']['issue'] as $issue) {
                        $diagnostics = $issue['diagnostics'] ?? '';
                        $expression = is_array($issue['expression'] ?? null) ? ($issue['expression'][0] ?? '') : '';
                        if ($diagnostics) {
                            $errorDetails[] = ($expression ? "{$expression}: " : '') . $diagnostics;
                        }
                    }
                    if (!empty($errorDetails)) {
                        $errorMessage .= '. ' . implode('; ', $errorDetails);
                    }
                } else {
                    $errorMessage .= ': ' . ($res['error'] ?? 'Unknown error');
                }
                
                // Log error detail untuk debugging
                \Illuminate\Support\Facades\Log::error('[SATUSEHAT] Gagal membuat Location', [
                    'payload' => $payload,
                    'payload_json' => json_encode($payload, JSON_PRESERVE_ZERO_FRACTION),
                    'response' => $res,
                    'error_details' => $errorDetails,
                ]);
                
                return response()->json([
                    'ok' => false,
                    'message' => $errorMessage,
                    'status' => $res['status'],
                    'error' => $res['error'],
                    'body' => $res['body'] ?? null,
                    'details' => $res['json']['issue'] ?? null,
                ], $res['status'] ?: 400);
            }
            $created = $res['json'] ?? null;
            $locationId = $created['id'] ?? null;
        }

        if (!$locationId) {
            return response()->json([
                'ok' => false,
                'message' => 'Tidak menemukan atau membuat Location untuk poliklinik ini. Berikan id_lokasi_satusehat atau set create_if_missing=true.',
            ], 422);
        }

        // CRITICAL: Pastikan mapping departemen ada terlebih dahulu untuk menghindari foreign key constraint violation
        // Foreign key: satu_sehat_mapping_lokasi_ralan.id_organisasi_satusehat -> satu_sehat_mapping_departemen.id_organisasi_satusehat
        $departemenMapping = \App\Models\SatuSehatDepartemenMapping::where('id_organisasi_satusehat', $data['id_organisasi_satusehat'])->first();

        if (!$departemenMapping) {
            // Pilih dep_id yang belum terpakai terlebih dahulu, jika tidak ada gunakan salah satu yang tersedia
            $depId = null;

            $unmapped = \Illuminate\Support\Facades\DB::table('departemen as d')
                ->leftJoin('satu_sehat_mapping_departemen as m', 'm.dep_id', '=', 'd.dep_id')
                ->whereNull('m.id_organisasi_satusehat')
                ->select('d.dep_id')
                ->orderBy('d.dep_id')
                ->first();

            if ($unmapped) {
                $depId = $unmapped->dep_id;
            } else {
                // Jika semua departemen sudah termapping, gunakan salah satu dep_id yang ada
                $existingMapping = \App\Models\SatuSehatDepartemenMapping::select('dep_id')->first();
                if ($existingMapping) {
                    $depId = $existingMapping->dep_id;
                } else {
                    // Jika belum ada mapping sama sekali, ambil dep_id pertama dari tabel departemen
                    $firstDept = \Illuminate\Support\Facades\DB::table('departemen')->select('dep_id')->orderBy('dep_id')->first();
                    if ($firstDept) { $depId = $firstDept->dep_id; }
                }
            }

            if (!$depId) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Mapping departemen belum ada untuk Organization ID ini dan tidak ada data departemen. Silakan buat mapping departemen terlebih dahulu.',
                    'id_organisasi_satusehat' => $data['id_organisasi_satusehat'],
                ], 422);
            }

            try {
                // Hindari duplikasi PK: gunakan updateOrCreate berbasis dep_id
                \App\Models\SatuSehatDepartemenMapping::updateOrCreate(
                    ['dep_id' => $depId],
                    ['id_organisasi_satusehat' => $data['id_organisasi_satusehat']]
                );
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('[SATUSEHAT] Gagal memastikan mapping departemen', [
                    'dep_id' => $depId,
                    'id_organisasi_satusehat' => $data['id_organisasi_satusehat'],
                    'error' => $e->getMessage(),
                ]);

                return response()->json([
                    'ok' => false,
                    'message' => 'Gagal membuat/menetapkan mapping departemen. Pastikan dep_id valid dan belum konflik.',
                    'error' => $e->getMessage(),
                ], 422);
            }
        }

        // Simpan mapping lokasi
        \App\Models\SatuSehatMappingLokasiRalan::updateOrCreate(
            ['kd_poli' => $data['kd_poli']],
            [
                'id_organisasi_satusehat' => $data['id_organisasi_satusehat'],
                'id_lokasi_satusehat' => $locationId,
                'longitude' => $longitude,
                'latitude' => $latitude,
                'altittude' => $altittude,
            ]
        );

        return response()->json([
            'ok' => true,
            'message' => 'Mapping lokasi tersimpan',
            'kd_poli' => $data['kd_poli'],
            'id_lokasi_satusehat' => $locationId,
            'created_resource' => $created,
        ], 201);
    }

    public function mappingLokasiUpdate(\Illuminate\Http\Request $request, string $kd_poli)
    {
        $data = $request->validate([
            'id_organisasi_satusehat' => ['required', 'string', 'max:64'],
            'id_lokasi_satusehat' => ['required', 'string', 'max:64'],
            'longitude' => ['nullable', 'string', 'max:30'],
            'latitude' => ['nullable', 'string', 'max:30'],
            'altittude' => ['nullable', 'string', 'max:30'],
            'name' => ['nullable', 'string', 'max:100'],
            'active' => ['nullable', 'boolean'],
        ]);

        $m = \App\Models\SatuSehatMappingLokasiRalan::where('kd_poli', $kd_poli)->first();
        if (!$m) {
            return response()->json(['ok' => false, 'message' => 'Mapping belum ada untuk kd_poli ini'], 404);
        }

        // Baca Location dari SATUSEHAT
        $read = $this->satusehatRequest('GET', 'Location/' . $data['id_lokasi_satusehat']);
        if (!$read['ok'] || !is_array($read['json'] ?? null)) {
            return response()->json([
                'ok' => false,
                'message' => 'Location tidak ditemukan atau tidak dapat dibaca dari SATUSEHAT',
                'status' => $read['status'],
                'error' => $read['error'],
            ], $read['status'] ?: 404);
        }

        $payload = $read['json'];
        $payload['resourceType'] = 'Location';
        $payload['id'] = $data['id_lokasi_satusehat'];
        if (array_key_exists('name', $data) && $data['name'] !== null) {
            $payload['name'] = $data['name'];
        }
        if (array_key_exists('active', $data)) {
            $payload['status'] = $data['active'] ? 'active' : 'inactive';
        }
        // Update koordinat jika dikirim - HARUS dikonversi ke decimal (number)
        // FHIR Location.position memerlukan tipe decimal, bukan string
        if (!isset($payload['position']) || !is_array($payload['position'])) {
            $payload['position'] = [];
        }
        if (array_key_exists('longitude', $data) && $data['longitude'] !== null && $data['longitude'] !== '') {
            if (is_numeric($data['longitude'])) {
                $payload['position']['longitude'] = (float) $data['longitude'];
            }
        }
        if (array_key_exists('latitude', $data) && $data['latitude'] !== null && $data['latitude'] !== '') {
            if (is_numeric($data['latitude'])) {
                $payload['position']['latitude'] = (float) $data['latitude'];
            }
        }
        if (array_key_exists('altittude', $data) && $data['altittude'] !== null && $data['altittude'] !== '') {
            // FHIR menggunakan key 'altitude' — map dari field DB yang salah eja
            if (is_numeric($data['altittude'])) {
                $payload['position']['altitude'] = (float) $data['altittude'];
            }
        }
        // Pastikan managingOrganization benar
        $payload['managingOrganization'] = [ 'reference' => 'Organization/' . $data['id_organisasi_satusehat'] ];

        $update = $this->satusehatRequest('PUT', 'Location/' . $data['id_lokasi_satusehat'], $payload, [ 'prefer_representation' => true ]);
        if (!$update['ok']) {
            return response()->json([
                'ok' => false,
                'message' => 'Gagal memperbarui Location di SATUSEHAT',
                'status' => $update['status'],
                'error' => $update['error'],
                'body' => $update['body'] ?? null,
            ], $update['status'] ?: 400);
        }

        // Update mapping di DB
        $m->update([
            'id_organisasi_satusehat' => $data['id_organisasi_satusehat'],
            'id_lokasi_satusehat' => $data['id_lokasi_satusehat'],
            'longitude' => $data['longitude'] ?? $m->longitude,
            'latitude' => $data['latitude'] ?? $m->latitude,
            'altittude' => $data['altittude'] ?? $m->altittude,
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Location & mapping diperbarui',
            'resource' => $update['json'] ?? null,
        ]);
    }

    public function mappingLokasiDestroy(string $kd_poli)
    {
        $m = \App\Models\SatuSehatMappingLokasiRalan::where('kd_poli', $kd_poli)->first();
        if (!$m) {
            return response()->json(['ok' => false, 'message' => 'Mapping tidak ditemukan'], 404);
        }
        $m->delete();
        return response()->json(['ok' => true, 'message' => 'Mapping dihapus']);
    }

    /**
     * ===== CRUD Mapping Lokasi Ranap (Bangsal ↔ SATUSEHAT Location) =====
     */
    public function mappingLokasiRanapIndex(\Illuminate\Http\Request $request)
    {
        $start = max(0, (int) $request->query('start', 0));
        $limit = max(1, min(500, (int) $request->query('limit', 50)));
        $q = trim((string) $request->query('q', ''));
        $b = \Illuminate\Support\Facades\DB::table('satu_sehat_mapping_lokasi_ranap as m')
            ->leftJoin('kamar as k', 'k.kd_kamar', '=', 'm.kd_kamar')
            ->leftJoin('bangsal as b', 'b.kd_bangsal', '=', 'k.kd_bangsal')
            ->select('m.*', 'k.kd_bangsal', 'b.nm_bangsal');
        if ($q !== '') {
            $b->where(function ($w) use ($q) {
                $w->where('m.kd_kamar', 'like', "%{$q}%")
                  ->orWhere('b.nm_bangsal', 'like', "%{$q}%")
                  ->orWhere('m.id_lokasi_satusehat', 'like', "%{$q}%");
            });
        }
        $total = (clone $b)->count();
        $rows = $b->orderBy('m.kd_kamar')->offset($start)->limit($limit)->get();

        return response()->json([
            'ok' => true,
            'total' => $total,
            'start' => $start,
            'limit' => $limit,
            'list' => $rows,
        ]);
    }

    public function mappingLokasiRanapStore(\Illuminate\Http\Request $request)
    {
        $data = $request->validate([
            'kd_kamar' => ['required', 'string', 'max:15'],
            'id_organisasi_satusehat' => ['required', 'string', 'max:40'],
            'id_lokasi_satusehat' => ['nullable', 'string', 'max:40'],
            'longitude' => ['nullable', 'string', 'max:30'],
            'latitude' => ['nullable', 'string', 'max:30'],
            'altittude' => ['nullable', 'string', 'max:30'],
            'create_if_missing' => ['sometimes', 'boolean'],
        ], [
            'kd_kamar.required' => 'Kode kamar wajib diisi.',
            'id_organisasi_satusehat.required' => 'ID Organization SATUSEHAT wajib diisi.',
        ]);

        $kamar = \Illuminate\Support\Facades\DB::table('kamar')->where('kd_kamar', $data['kd_kamar'])->first();
        if (!$kamar) {
            return response()->json(['ok' => false, 'message' => 'Kamar tidak ditemukan'], 404);
        }
        $bangsal = null;
        if (isset($kamar->kd_bangsal)) {
            $bangsal = \Illuminate\Support\Facades\DB::table('bangsal')->where('kd_bangsal', $kamar->kd_bangsal)->first();
        }

        $longitude = $data['longitude'] ?? (string) env('LONGITUDE', '');
        $latitude = $data['latitude'] ?? (string) env('LATITUDE', '');
        $altittude = $data['altittude'] ?? (string) env('ALTITUDE', '');

        $locationId = $data['id_lokasi_satusehat'] ?? null;
        $created = null;

        if (!$locationId) {
            $queries = [
                ['name' => $data['kd_kamar'], 'organization' => 'Organization/' . $data['id_organisasi_satusehat']],
                ['name' => ($bangsal->nm_bangsal ?? '') . ' ' . $data['kd_kamar'], 'organization' => 'Organization/' . $data['id_organisasi_satusehat']],
            ];
            foreach ($queries as $q) {
                $res = $this->satusehatRequest('GET', 'Location', null, ['query' => $q]);
                if ($res['ok'] && isset(($res['json']['entry'] ?? [])[0]['resource']['id'])) {
                    $locationId = $res['json']['entry'][0]['resource']['id'];
                    break;
                }
            }
        }

        if (!$locationId && ($data['create_if_missing'] ?? false)) {
            $payload = [
                'resourceType' => 'Location',
                'status' => 'active',
                'name' => trim(($bangsal->nm_bangsal ?? '') . ' ' . $data['kd_kamar']) ?: $data['kd_kamar'],
                'identifier' => [[
                    'system' => 'http://sys-ids.kemkes.go.id/location',
                    'value' => $data['kd_kamar'],
                ]],
                'managingOrganization' => [
                    'reference' => 'Organization/' . $data['id_organisasi_satusehat'],
                ],
            ];

            $position = [];
            if (!empty($longitude) && is_numeric($longitude)) {
                $position['longitude'] = (float) $longitude;
            }
            if (!empty($latitude) && is_numeric($latitude)) {
                $position['latitude'] = (float) $latitude;
            }
            if (!empty($altittude) && is_numeric($altittude)) {
                $position['altitude'] = (float) $altittude;
            }
            if (!empty($position['longitude']) && !empty($position['latitude'])) {
                $payload['position'] = $position;
            }

            $res = $this->satusehatRequest('POST', 'Location', $payload, ['prefer_representation' => true]);
            if (!$res['ok']) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Gagal membuat Location di SATUSEHAT',
                    'status' => $res['status'],
                    'error' => $res['error'],
                    'body' => $res['body'] ?? null,
                ], $res['status'] ?: 400);
            }
            $created = $res['json'] ?? null;
            $locationId = $created['id'] ?? null;
        }

        if (!$locationId) {
            return response()->json([
                'ok' => false,
                'message' => 'Tidak menemukan atau membuat Location untuk bangsal ini. Berikan id_lokasi_satusehat atau set create_if_missing=true.',
            ], 422);
        }

        // Pastikan mapping departemen ada terlebih dahulu seperti pada ralan
        $departemenMapping = \App\Models\SatuSehatDepartemenMapping::where('id_organisasi_satusehat', $data['id_organisasi_satusehat'])->first();
        if (!$departemenMapping) {
            $depId = null;
            // Prefer dep_id yang belum termapping
            $unmapped = \Illuminate\Support\Facades\DB::table('departemen as d')
                ->leftJoin('satu_sehat_mapping_departemen as m', 'm.dep_id', '=', 'd.dep_id')
                ->whereNull('m.id_organisasi_satusehat')
                ->select('d.dep_id')
                ->orderBy('d.dep_id')
                ->first();
            if ($unmapped) {
                $depId = $unmapped->dep_id;
            } else {
                $existingMapping = \App\Models\SatuSehatDepartemenMapping::select('dep_id')->first();
                if ($existingMapping) { $depId = $existingMapping->dep_id; }
                else {
                    $firstDept = \Illuminate\Support\Facades\DB::table('departemen')->select('dep_id')->orderBy('dep_id')->first();
                    if ($firstDept) { $depId = $firstDept->dep_id; }
                }
            }
            if (!$depId) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Mapping departemen belum ada untuk Organization ID ini dan tidak ada data departemen. Silakan buat mapping departemen terlebih dahulu.',
                    'id_organisasi_satusehat' => $data['id_organisasi_satusehat'],
                ], 422);
            }
            try {
                \App\Models\SatuSehatDepartemenMapping::updateOrCreate(
                    ['dep_id' => $depId],
                    ['id_organisasi_satusehat' => $data['id_organisasi_satusehat']]
                );
            } catch (\Exception $e) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Gagal membuat/menetapkan mapping departemen. Pastikan dep_id valid dan belum konflik.',
                    'error' => $e->getMessage(),
                ], 422);
            }
        }

        \App\Models\SatuSehatMappingLokasiRanap::updateOrCreate(
            ['kd_kamar' => $data['kd_kamar']],
            [
                'id_organisasi_satusehat' => $data['id_organisasi_satusehat'],
                'id_lokasi_satusehat' => $locationId,
                'longitude' => $longitude,
                'latitude' => $latitude,
                'altittude' => $altittude,
            ]
        );

        return response()->json([
            'ok' => true,
            'message' => 'Mapping lokasi ranap tersimpan',
            'kd_kamar' => $data['kd_kamar'],
            'id_lokasi_satusehat' => $locationId,
            'created_resource' => $created,
        ], 201);
    }

    public function mappingLokasiRanapUpdate(\Illuminate\Http\Request $request, string $kd_kamar)
    {
        $data = $request->validate([
            'id_organisasi_satusehat' => ['required', 'string', 'max:40'],
            'id_lokasi_satusehat' => ['required', 'string', 'max:40'],
            'longitude' => ['nullable', 'string', 'max:30'],
            'latitude' => ['nullable', 'string', 'max:30'],
            'altittude' => ['nullable', 'string', 'max:30'],
            'name' => ['nullable', 'string', 'max:100'],
            'active' => ['nullable', 'boolean'],
        ]);

        $m = \App\Models\SatuSehatMappingLokasiRanap::where('kd_kamar', $kd_kamar)->first();
        if (!$m) {
            return response()->json(['ok' => false, 'message' => 'Mapping belum ada untuk kd_kamar ini'], 404);
        }

        $read = $this->satusehatRequest('GET', 'Location/' . $data['id_lokasi_satusehat']);
        if (!$read['ok'] || !is_array($read['json'] ?? null)) {
            return response()->json([
                'ok' => false,
                'message' => 'Location tidak ditemukan atau tidak dapat dibaca dari SATUSEHAT',
                'status' => $read['status'],
                'error' => $read['error'],
            ], $read['status'] ?: 404);
        }

        $payload = $read['json'];
        $payload['resourceType'] = 'Location';
        $payload['id'] = $data['id_lokasi_satusehat'];
        if (array_key_exists('name', $data) && $data['name'] !== null) {
            $payload['name'] = $data['name'];
        }
        if (array_key_exists('active', $data)) {
            $payload['status'] = $data['active'] ? 'active' : 'inactive';
        }
        if (!isset($payload['position']) || !is_array($payload['position'])) {
            $payload['position'] = [];
        }
        if (array_key_exists('longitude', $data) && $data['longitude'] !== null && $data['longitude'] !== '') {
            if (is_numeric($data['longitude'])) { $payload['position']['longitude'] = (float) $data['longitude']; }
        }
        if (array_key_exists('latitude', $data) && $data['latitude'] !== null && $data['latitude'] !== '') {
            if (is_numeric($data['latitude'])) { $payload['position']['latitude'] = (float) $data['latitude']; }
        }
        if (array_key_exists('altittude', $data) && $data['altittude'] !== null && $data['altittude'] !== '') {
            if (is_numeric($data['altittude'])) { $payload['position']['altitude'] = (float) $data['altittude']; }
        }
        $payload['managingOrganization'] = [ 'reference' => 'Organization/' . $data['id_organisasi_satusehat'] ];

        $update = $this->satusehatRequest('PUT', 'Location/' . $data['id_lokasi_satusehat'], $payload, ['prefer_representation' => true]);
        if (!$update['ok']) {
            return response()->json([
                'ok' => false,
                'message' => 'Gagal memperbarui Location di SATUSEHAT',
                'status' => $update['status'],
                'error' => $update['error'],
                'body' => $update['body'] ?? null,
            ], $update['status'] ?: 400);
        }

        $m->update([
            'id_organisasi_satusehat' => $data['id_organisasi_satusehat'],
            'id_lokasi_satusehat' => $data['id_lokasi_satusehat'],
            'longitude' => $data['longitude'] ?? $m->longitude,
            'latitude' => $data['latitude'] ?? $m->latitude,
            'altittude' => $data['altittude'] ?? $m->altittude,
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Location & mapping ranap diperbarui',
            'resource' => $update['json'] ?? null,
        ]);
    }

    public function mappingLokasiRanapDestroy(string $kd_kamar)
    {
        $m = \App\Models\SatuSehatMappingLokasiRanap::where('kd_kamar', $kd_kamar)->first();
        if (!$m) { return response()->json(['ok' => false, 'message' => 'Mapping tidak ditemukan'], 404); }
        $m->delete();
        return response()->json(['ok' => true, 'message' => 'Mapping ranap dihapus']);
    }

    public function mappingLokasiFarmasiIndex(\Illuminate\Http\Request $request)
    {
        $start = max(0, (int) $request->query('start', 0));
        $limit = max(1, min(500, (int) $request->query('limit', 50)));
        $q = trim((string) $request->query('q', ''));
        $b = \Illuminate\Support\Facades\DB::table('bangsal as b')
            ->leftJoin('kamar as k', 'k.kd_bangsal', '=', 'b.kd_bangsal')
            ->leftJoin('satu_sehat_mapping_lokasi_ranap as m', 'm.kd_kamar', '=', 'k.kd_kamar')
            ->select(
                'b.kd_bangsal',
                'b.nm_bangsal',
                \Illuminate\Support\Facades\DB::raw('MIN(m.id_organisasi_satusehat) as id_organisasi_satusehat'),
                \Illuminate\Support\Facades\DB::raw('MIN(m.id_lokasi_satusehat) as id_lokasi_satusehat'),
                \Illuminate\Support\Facades\DB::raw('MIN(m.longitude) as longitude'),
                \Illuminate\Support\Facades\DB::raw('MIN(m.latitude) as latitude'),
                \Illuminate\Support\Facades\DB::raw('MIN(m.altittude) as altittude')
            )
            ->groupBy('b.kd_bangsal', 'b.nm_bangsal');
        if ($q !== '') {
            $b->where(function ($w) use ($q) {
                $w->where('b.kd_bangsal', 'like', "%{$q}%")
                  ->orWhere('b.nm_bangsal', 'like', "%{$q}%");
            });
        }
        $total = (clone $b)->get()->count();
        $rows = $b->orderBy('b.kd_bangsal')->offset($start)->limit($limit)->get();
        return response()->json([
            'ok' => true,
            'total' => $total,
            'start' => $start,
            'limit' => $limit,
            'list' => $rows,
        ]);
    }

    public function mappingLokasiFarmasiStore(\Illuminate\Http\Request $request)
    {
        $data = $request->validate([
            'kd_bangsal' => ['required', 'string', 'max:15'],
            'id_organisasi_satusehat' => ['required', 'string', 'max:40'],
            'id_lokasi_satusehat' => ['nullable', 'string', 'max:40'],
            'longitude' => ['nullable', 'string', 'max:30'],
            'latitude' => ['nullable', 'string', 'max:30'],
            'altittude' => ['nullable', 'string', 'max:30'],
            'create_if_missing' => ['sometimes', 'boolean'],
        ], [
            'kd_bangsal.required' => 'Kode bangsal wajib diisi.',
            'id_organisasi_satusehat.required' => 'ID Organization SATUSEHAT wajib diisi.',
        ]);

        $bangsal = \Illuminate\Support\Facades\DB::table('bangsal')->where('kd_bangsal', $data['kd_bangsal'])->first();
        if (!$bangsal) {
            return response()->json(['ok' => false, 'message' => 'Bangsal tidak ditemukan'], 404);
        }

        $longitude = $data['longitude'] ?? (string) env('LONGITUDE', '');
        $latitude = $data['latitude'] ?? (string) env('LATITUDE', '');
        $altittude = $data['altittude'] ?? (string) env('ALTITUDE', '');

        $locationId = $data['id_lokasi_satusehat'] ?? null;
        $created = null;

        if (!$locationId) {
            $queries = [
                ['name' => $bangsal->nm_bangsal, 'organization' => 'Organization/' . $data['id_organisasi_satusehat']],
                ['identifier' => $data['kd_bangsal'], 'organization' => 'Organization/' . $data['id_organisasi_satusehat']],
            ];
            foreach ($queries as $q) {
                $res = $this->satusehatRequest('GET', 'Location', null, ['query' => $q]);
                if ($res['ok'] && isset(($res['json']['entry'] ?? [])[0]['resource']['id'])) {
                    $locationId = $res['json']['entry'][0]['resource']['id'];
                    break;
                }
            }
        }

        if (!$locationId && ($data['create_if_missing'] ?? false)) {
            $payload = [
                'resourceType' => 'Location',
                'status' => 'active',
                'name' => $bangsal->nm_bangsal,
                'identifier' => [[
                    'system' => 'http://sys-ids.kemkes.go.id/location',
                    'value' => $data['kd_bangsal'],
                ]],
                'managingOrganization' => [
                    'reference' => 'Organization/' . $data['id_organisasi_satusehat'],
                ],
            ];
            $position = [];
            if (!empty($longitude) && is_numeric($longitude)) { $position['longitude'] = (float) $longitude; }
            if (!empty($latitude) && is_numeric($latitude)) { $position['latitude'] = (float) $latitude; }
            if (!empty($altittude) && is_numeric($altittude)) { $position['altitude'] = (float) $altittude; }
            if (!empty($position['longitude']) && !empty($position['latitude'])) { $payload['position'] = $position; }
            $res = $this->satusehatRequest('POST', 'Location', $payload, ['prefer_representation' => true]);
            if (!$res['ok']) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Gagal membuat Location di SATUSEHAT',
                    'status' => $res['status'],
                    'error' => $res['error'],
                    'body' => $res['body'] ?? null,
                ], $res['status'] ?: 400);
            }
            $created = $res['json'] ?? null;
            $locationId = $created['id'] ?? null;
        }

        if (!$locationId) {
            return response()->json([
                'ok' => false,
                'message' => 'Tidak menemukan atau membuat Location untuk bangsal ini. Berikan id_lokasi_satusehat atau set create_if_missing=true.',
            ], 422);
        }

        $departemenMapping = \App\Models\SatuSehatDepartemenMapping::where('id_organisasi_satusehat', $data['id_organisasi_satusehat'])->first();
        if (!$departemenMapping) {
            $depId = null;
            $unmapped = \Illuminate\Support\Facades\DB::table('departemen as d')
                ->leftJoin('satu_sehat_mapping_departemen as m', 'm.dep_id', '=', 'd.dep_id')
                ->whereNull('m.id_organisasi_satusehat')
                ->select('d.dep_id')
                ->orderBy('d.dep_id')
                ->first();
            if ($unmapped) { $depId = $unmapped->dep_id; }
            else {
                $existingMapping = \App\Models\SatuSehatDepartemenMapping::select('dep_id')->first();
                if ($existingMapping) { $depId = $existingMapping->dep_id; }
                else {
                    $firstDept = \Illuminate\Support\Facades\DB::table('departemen')->select('dep_id')->orderBy('dep_id')->first();
                    if ($firstDept) { $depId = $firstDept->dep_id; }
                }
            }
            if (!$depId) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Mapping departemen belum ada untuk Organization ID ini dan tidak ada data departemen. Silakan buat mapping departemen terlebih dahulu.',
                    'id_organisasi_satusehat' => $data['id_organisasi_satusehat'],
                ], 422);
            }
            \App\Models\SatuSehatDepartemenMapping::updateOrCreate(
                ['dep_id' => $depId],
                ['id_organisasi_satusehat' => $data['id_organisasi_satusehat']]
            );
        }

        $kamarList = \Illuminate\Support\Facades\DB::table('kamar')->where('kd_bangsal', $data['kd_bangsal'])->pluck('kd_kamar')->all();
        foreach ($kamarList as $kk) {
            \App\Models\SatuSehatMappingLokasiRanap::updateOrCreate(
                ['kd_kamar' => $kk],
                [
                    'id_organisasi_satusehat' => $data['id_organisasi_satusehat'],
                    'id_lokasi_satusehat' => $locationId,
                    'longitude' => $longitude,
                    'latitude' => $latitude,
                    'altittude' => $altittude,
                ]
            );
        }

        return response()->json([
            'ok' => true,
            'message' => 'Mapping lokasi farmasi tersimpan',
            'kd_bangsal' => $data['kd_bangsal'],
            'id_lokasi_satusehat' => $locationId,
            'created_resource' => $created,
        ], 201);
    }

    public function mappingLokasiFarmasiUpdate(\Illuminate\Http\Request $request, string $kd_bangsal)
    {
        $data = $request->validate([
            'id_organisasi_satusehat' => ['required', 'string', 'max:40'],
            'id_lokasi_satusehat' => ['required', 'string', 'max:40'],
            'longitude' => ['nullable', 'string', 'max:30'],
            'latitude' => ['nullable', 'string', 'max:30'],
            'altittude' => ['nullable', 'string', 'max:30'],
            'name' => ['nullable', 'string', 'max:100'],
            'active' => ['nullable', 'boolean'],
        ]);

        $m = \Illuminate\Support\Facades\DB::table('satu_sehat_mapping_lokasi_ranap as m')
            ->leftJoin('kamar as k', 'k.kd_kamar', '=', 'm.kd_kamar')
            ->where('k.kd_bangsal', $kd_bangsal)
            ->select('m.*')
            ->first();
        if (!$m) {
            return response()->json(['ok' => false, 'message' => 'Mapping belum ada untuk kd_bangsal ini'], 404);
        }

        $read = $this->satusehatRequest('GET', 'Location/' . $data['id_lokasi_satusehat']);
        if (!$read['ok'] || !is_array($read['json'] ?? null)) {
            return response()->json([
                'ok' => false,
                'message' => 'Location tidak ditemukan atau tidak dapat dibaca dari SATUSEHAT',
                'status' => $read['status'],
                'error' => $read['error'],
            ], $read['status'] ?: 404);
        }

        $payload = $read['json'];
        $payload['resourceType'] = 'Location';
        $payload['id'] = $data['id_lokasi_satusehat'];
        if (array_key_exists('name', $data) && $data['name'] !== null) { $payload['name'] = $data['name']; }
        if (array_key_exists('active', $data)) { $payload['status'] = $data['active'] ? 'active' : 'inactive'; }
        if (!isset($payload['position']) || !is_array($payload['position'])) { $payload['position'] = []; }
        if (array_key_exists('longitude', $data) && $data['longitude'] !== null && $data['longitude'] !== '') { if (is_numeric($data['longitude'])) { $payload['position']['longitude'] = (float) $data['longitude']; } }
        if (array_key_exists('latitude', $data) && $data['latitude'] !== null && $data['latitude'] !== '') { if (is_numeric($data['latitude'])) { $payload['position']['latitude'] = (float) $data['latitude']; } }
        if (array_key_exists('altittude', $data) && $data['altittude'] !== null && $data['altittude'] !== '') { if (is_numeric($data['altittude'])) { $payload['position']['altitude'] = (float) $data['altittude']; } }
        $payload['managingOrganization'] = [ 'reference' => 'Organization/' . $data['id_organisasi_satusehat'] ];

        $update = $this->satusehatRequest('PUT', 'Location/' . $data['id_lokasi_satusehat'], $payload, ['prefer_representation' => true]);
        if (!$update['ok']) {
            return response()->json([
                'ok' => false,
                'message' => 'Gagal memperbarui Location di SATUSEHAT',
                'status' => $update['status'],
                'error' => $update['error'],
                'body' => $update['body'] ?? null,
            ], $update['status'] ?: 400);
        }

        $kamarIds = \Illuminate\Support\Facades\DB::table('kamar')->where('kd_bangsal', $kd_bangsal)->pluck('kd_kamar')->all();
        foreach ($kamarIds as $kk) {
            $updateData = [
                'id_organisasi_satusehat' => $data['id_organisasi_satusehat'],
                'id_lokasi_satusehat' => $data['id_lokasi_satusehat'],
            ];
            if (array_key_exists('longitude', $data) && $data['longitude'] !== null && $data['longitude'] !== '') { $updateData['longitude'] = $data['longitude']; }
            if (array_key_exists('latitude', $data) && $data['latitude'] !== null && $data['latitude'] !== '') { $updateData['latitude'] = $data['latitude']; }
            if (array_key_exists('altittude', $data) && $data['altittude'] !== null && $data['altittude'] !== '') { $updateData['altittude'] = $data['altittude']; }
            \App\Models\SatuSehatMappingLokasiRanap::updateOrCreate(['kd_kamar' => $kk], $updateData);
        }

        return response()->json([
            'ok' => true,
            'message' => 'Location & mapping farmasi diperbarui',
            'resource' => $update['json'] ?? null,
        ]);
    }

    public function mappingLokasiFarmasiDestroy(string $kd_bangsal)
    {
        $kamarIds = \Illuminate\Support\Facades\DB::table('kamar')->where('kd_bangsal', $kd_bangsal)->pluck('kd_kamar')->all();
        if (empty($kamarIds)) { return response()->json(['ok' => false, 'message' => 'Bangsal tidak memiliki kamar atau tidak ditemukan'], 404); }
        \App\Models\SatuSehatMappingLokasiRanap::whereIn('kd_kamar', $kamarIds)->delete();
        return response()->json(['ok' => true, 'message' => 'Mapping farmasi dihapus']);
    }

    /**
     * Referensi daftar kamar untuk pemetaan ranap
     * Endpoint: GET /api/ranap/kamar
     * Query:
     *  - q: string pencarian bebas (kd_kamar, nm_kamar, kd_bangsal, nm_bangsal)
     *  - kd_bangsal: filter berdasarkan bangsal tertentu
     *  - start, limit: pagination
     */
    public function kamarList(\Illuminate\Http\Request $request)
    {
        $start = max(0, (int) $request->query('start', 0));
        $limit = max(1, min(500, (int) $request->query('limit', 50)));
        $q = trim((string) $request->query('q', ''));
        $kd_bangsal = trim((string) $request->query('kd_bangsal', ''));

        $tbl = \Illuminate\Support\Facades\DB::table('kamar as k')
            ->leftJoin('bangsal as b', 'b.kd_bangsal', '=', 'k.kd_bangsal')
            ->select('k.kd_kamar', 'k.kd_bangsal', 'b.nm_bangsal');

        if ($kd_bangsal !== '') {
            $tbl->where('k.kd_bangsal', $kd_bangsal);
        }
        if ($q !== '') {
            $tbl->where(function ($w) use ($q) {
                $w->where('k.kd_kamar', 'like', "%{$q}%")
                  ->orWhere('k.kd_bangsal', 'like', "%{$q}%")
                  ->orWhere('b.nm_bangsal', 'like', "%{$q}%");
            });
        }

        $total = (clone $tbl)->count();
        $rows = $tbl->orderBy('k.kd_kamar')->offset($start)->limit($limit)->get();

        return response()->json([
            'ok' => true,
            'total' => $total,
            'start' => $start,
            'limit' => $limit,
            'list' => $rows,
        ]);
    }

    /**
     * Update sebagian Location menggunakan PATCH (sesuai katalog SATUSEHAT)
     * Endpoint: PATCH /api/satusehat/location/{id}
     * Body: Array JSON Patch operations [{ op, path, value }]
     * 
     * Contoh body:
     * [
     *   { "op": "replace", "path": "/name", "value": "Nama Baru" },
     *   { "op": "replace", "path": "/status", "value": "inactive" }
     * ]
     */
    public function locationPatch(\Illuminate\Http\Request $request, string $id)
    {
        $data = $request->validate([
            'patches' => ['required', 'array', 'min:1'],
            'patches.*.op' => ['required', 'string', 'in:replace,add,remove'],
            'patches.*.path' => ['required', 'string'],
            'patches.*.value' => ['required'],
        ]);

        // Validasi ID format
        if (!preg_match('/^[A-Za-z0-9\-\.]+$/', $id)) {
            return response()->json([
                'ok' => false,
                'message' => 'ID Location tidak valid.'
            ], 400);
        }

        // Kirim PATCH request ke SATUSEHAT dengan header JSON Patch
        $res = $this->satusehatRequest('PATCH', 'Location/' . $id, $data['patches'], [
            'prefer_representation' => true,
            'headers' => $this->satusehatPatchHeaders(),
        ]);

        if (!$res['ok']) {
            return response()->json([
                'ok' => false,
                'message' => 'Gagal memperbarui Location di SATUSEHAT',
                'status' => $res['status'],
                'error' => $res['error'],
                'body' => $res['body'] ?? null,
            ], $res['status'] ?: 400);
        }

        return response()->json([
            'ok' => true,
            'message' => 'Location berhasil diperbarui (PATCH)',
            'resource' => $res['json'] ?? null,
        ]);
    }

    public function practitionerSearch(\Illuminate\Http\Request $request)
    {
        $nik = trim((string) $request->query('nik', ''));
        if ($nik === '') {
            return response()->json([
                'ok' => false,
                'message' => 'Parameter nik wajib diisi',
            ], 422);
        }
        $query = [
            'identifier' => 'https://fhir.kemkes.go.id/id/nik|' . $nik,
        ];
        $res = $this->satusehatRequest('GET', 'Practitioner', null, ['query' => $query]);
        if (!$res['ok']) {
            return response()->json([
                'ok' => false,
                'status' => $res['status'],
                'error' => $res['error'],
                'body' => $res['body'] ?? null,
                'message' => 'Gagal mencari Practitioner di SATUSEHAT',
            ], $res['status'] ?: 400);
        }
        $json = $res['json'] ?? [];
        $entries = is_array($json['entry'] ?? null) ? $json['entry'] : [];
        $items = [];
        foreach ($entries as $entry) {
            $r = $entry['resource'] ?? [];
            if (($r['resourceType'] ?? '') !== 'Practitioner') { continue; }
            $nameArr = is_array($r['name'] ?? null) ? $r['name'] : [];
            $displayName = null;
            if (!empty($nameArr)) {
                $n = $nameArr[0];
                $displayName = $n['text'] ?? trim(($n['prefix'][0] ?? '') . ' ' . implode(' ', (array) ($n['given'] ?? [])) . ' ' . ($n['family'] ?? ''));
            }
            $items[] = [
                'id' => $r['id'] ?? null,
                'name' => $displayName,
                'gender' => $r['gender'] ?? null,
                'birthDate' => $r['birthDate'] ?? null,
                'identifier' => $r['identifier'] ?? [],
                'telecom' => $r['telecom'] ?? [],
                'address' => $r['address'] ?? [],
                'qualification' => $r['qualification'] ?? [],
            ];
        }
        return response()->json([
            'ok' => true,
            'total' => $json['total'] ?? count($items),
            'list' => $items,
            'bundle' => $json,
        ]);
    }

    public function patientSearch(\Illuminate\Http\Request $request)
    {
        $nik = trim((string) $request->query('nik', ''));
        if ($nik === '') {
            return response()->json([
                'ok' => false,
                'message' => 'Parameter nik wajib diisi',
            ], 422);
        }
        $query = [
            'identifier' => 'https://fhir.kemkes.go.id/id/nik|' . $nik,
        ];
        $res = $this->satusehatRequest('GET', 'Patient', null, ['query' => $query]);
        if (!$res['ok']) {
            return response()->json([
                'ok' => false,
                'status' => $res['status'],
                'error' => $res['error'],
                'body' => $res['body'] ?? null,
                'message' => 'Gagal mencari Patient di SATUSEHAT',
            ], $res['status'] ?: 400);
        }
        $json = $res['json'] ?? [];
        $entries = is_array($json['entry'] ?? null) ? $json['entry'] : [];
        $items = [];
        foreach ($entries as $entry) {
            $r = $entry['resource'] ?? [];
            if (($r['resourceType'] ?? '') !== 'Patient') { continue; }
            $nameArr = is_array($r['name'] ?? null) ? $r['name'] : [];
            $displayName = null;
            if (!empty($nameArr)) {
                $n = $nameArr[0];
                $displayName = $n['text'] ?? trim(($n['prefix'][0] ?? '') . ' ' . implode(' ', (array) ($n['given'] ?? [])) . ' ' . ($n['family'] ?? ''));
            }
            $items[] = [
                'id' => $r['id'] ?? null,
                'name' => $displayName,
                'gender' => $r['gender'] ?? null,
                'birthDate' => $r['birthDate'] ?? null,
                'identifier' => $r['identifier'] ?? [],
                'telecom' => $r['telecom'] ?? [],
                'address' => $r['address'] ?? [],
            ];
        }
        return response()->json([
            'ok' => true,
            'total' => $json['total'] ?? count($items),
            'list' => $items,
            'bundle' => $json,
        ]);
    }
}