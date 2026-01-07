<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use App\Traits\BpjsTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class IcareController extends Controller
{
    use BpjsTraits;

    public function ping()
    {
        $cfg = $this->icareConfig();
        $timestamp = $this->generateTimestamp();
        $headers = $this->buildIcareHeaders($timestamp);

        return response()->json([
            'icare' => [
                'base_url' => $cfg['base_url'],
            ],
            'headers' => $headers,
        ]);
    }

    public function proxy(Request $request, string $endpoint)
    {
        $method = strtoupper($request->method());
        $query = $request->query();
        $body = $request->all();

        // Normalisasi dan mapping kode dokter untuk endpoint validate Icare
        try {
            $ep = strtolower(trim($endpoint));
            $isValidate = (str_contains($ep, 'pcare/validate') || str_ends_with($ep, 'validate'));
            if ($isValidate && strtoupper($method) === 'POST') {
                $noka = (string) ($body['param'] ?? '');
                $noRawat = (string) ($body['no_rawat'] ?? '');
                $kdDokterRs = (string) ($body['kodedokter'] ?? '');

                // Jika kd_dokter RS tidak disediakan, coba ambil dari reg_periksa by no_rawat, lalu by noka
                if ($kdDokterRs === '') {
                    if ($noRawat !== '') {
                        try {
                            $kd = DB::table('reg_periksa')->where('no_rawat', $noRawat)->value('kd_dokter');
                            $kdDokterRs = (string) ($kd ?? '');
                        } catch (\Throwable $e) {
                        }
                    }
                    if ($kdDokterRs === '' && $noka !== '') {
                        try {
                            $noRkm = DB::table('pasien')->where('no_peserta', $noka)->value('no_rkm_medis');
                            if ($noRkm) {
                                $row = DB::table('reg_periksa')
                                    ->where('no_rkm_medis', $noRkm)
                                    ->orderByDesc('tgl_registrasi')
                                    ->orderByDesc('jam_reg')
                                    ->select(['kd_dokter'])
                                    ->first();
                                $kdDokterRs = (string) ($row?->kd_dokter ?? '');
                            }
                        } catch (\Throwable $e) {
                        }
                    }
                }

                // Map ke kd_dokter_pcare jika tersedia
                $kdDokterPcare = '';
                if ($kdDokterRs !== '') {
                    try {
                        $map = DB::table('maping_dokter_pcare')->where('kd_dokter', $kdDokterRs)->value('kd_dokter_pcare');
                        $kdDokterPcare = (string) ($map ?? '');
                    } catch (\Throwable $e) {
                    }
                }

                // Set body kodedokter ke kode PCare bila ada; jika tidak, pertahankan RS code agar tetap ada nilai
                if ($kdDokterPcare !== '') {
                    $body['kodedokter'] = $kdDokterPcare;
                } elseif ($kdDokterRs !== '') {
                    $body['kodedokter'] = $kdDokterRs;
                }

                // Logging ringan untuk diagnostik
                try {
                    Log::channel('bpjs')->debug('Icare validate doctor mapping', [
                        'no_rawat' => $noRawat ?: null,
                        'noka' => $noka ? substr($noka, 0, 6).'****'.substr($noka, -4) : null,
                        'kd_dokter_rs' => $kdDokterRs ?: null,
                        'kd_dokter_pcare' => $kdDokterPcare ?: null,
                        'body_has_kodedokter' => array_key_exists('kodedokter', $body),
                    ]);
                } catch (\Throwable $e) {
                }
            }
        } catch (\Throwable $e) {
            // Abaikan jika mapping gagal; lanjutkan proxy apa adanya
        }
        try {
            $result = $this->icareRequest($method, $endpoint, $query, $body);
            $response = $result['response'];
            $raw = $response->body();
            $processed = $this->maybeDecryptAndDecompressIcare($raw, $result['timestamp_used']);

            return response()->json([
                'ok' => $response->successful(),
                'status' => $response->status(),
                'endpoint' => $result['url'],
                'headers_used' => $result['headers_used'],
                'data' => $processed,
                'raw' => $response->json() ?? $raw,
            ], $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('Icare proxy error', [
                'endpoint' => $endpoint,
                'method' => $method,
                'query' => $query,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'ok' => false,
                'status' => 503,
                'endpoint' => $endpoint,
                'error' => 'Icare connection error: '.$e->getMessage(),
            ], 503);
        }
    }

    public function getPeserta(string $noka)
    {
        $noka = trim($noka);
        if ($noka === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter nomor kartu (noka) wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'peserta/'.urlencode($noka);
        try {
            $result = $this->icareRequest('GET', $endpoint);
            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompressIcare($response->body(), $result['timestamp_used']);

            return response()->json($processed, $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('Icare getPeserta connection error', [
                'noka' => $noka,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS Icare (peserta): '.$e->getMessage(),
                    'code' => 503,
                ],
                'response' => null,
            ], 503);
        }
    }

    public function validateIcare(Request $request)
    {
        $param = (string) ($request->input('param') ?? '');
        $noRawat = (string) ($request->input('no_rawat') ?? '');
        $kdDokterRs = (string) ($request->input('kodedokter') ?? '');

        if ($kdDokterRs === '') {
            if ($noRawat !== '') {
                try {
                    $kd = DB::table('reg_periksa')->where('no_rawat', $noRawat)->value('kd_dokter');
                    $kdDokterRs = (string) ($kd ?? '');
                } catch (\Throwable $e) {
                }
            }
            if ($kdDokterRs === '' && $param !== '') {
                try {
                    $noRkm = DB::table('pasien')->where('no_peserta', $param)->value('no_rkm_medis');
                    if ($noRkm) {
                        $row = DB::table('reg_periksa')
                            ->where('no_rkm_medis', $noRkm)
                            ->orderByDesc('tgl_registrasi')
                            ->orderByDesc('jam_reg')
                            ->select(['kd_dokter'])
                            ->first();
                        $kdDokterRs = (string) ($row?->kd_dokter ?? '');
                    }
                } catch (\Throwable $e) {
                }
            }
        }

        $kdDokterPcare = '';
        if ($kdDokterRs !== '') {
            try {
                $map = DB::table('maping_dokter_pcare')->where('kd_dokter', $kdDokterRs)->value('kd_dokter_pcare');
                $kdDokterPcare = (string) ($map ?? '');
            } catch (\Throwable $e) {
            }
        }

        $body = [
            'param' => $param,
            'kodedokter' => $kdDokterPcare !== '' ? $kdDokterPcare : $kdDokterRs,
        ];

        try {
            $result = $this->icareRequest('POST', 'validate', [], $body);
            $response = $result['response'];
            $raw = $response->body();
            $processed = $this->maybeDecryptAndDecompressIcare($raw, $result['timestamp_used']);

            return response()->json([
                'ok' => $response->successful(),
                'status' => $response->status(),
                'endpoint' => $result['url'],
                'headers_used' => $result['headers_used'],
                'data' => $processed,
                'raw' => $response->json() ?? $raw,
            ], $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('Icare validate error', [
                'param' => $param,
                'no_rawat' => $noRawat ?: null,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'ok' => false,
                'status' => 503,
                'endpoint' => 'validate',
                'error' => 'Icare connection error: '.$e->getMessage(),
            ], 503);
        }
    }
}
