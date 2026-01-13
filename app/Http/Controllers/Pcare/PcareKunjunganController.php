<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use App\Traits\BpjsTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Controller Kunjungan PCare (Add/Update) berdasarkan Katalog BPJS.
 * Referensi implementasi: public/PcareKunjunganController.php
 *
 * Fitur:
 * - Ambil data kunjungan dari DB (reg_periksa + pasien + poli + dokter)
 * - Bentuk payload sesuai Katalog BPJS PCare untuk endpoint POST /kunjungan
 * - Kirim data ke PCare menggunakan header & signature yang benar (BpjsTraits)
 * - Parsing respon (decrypt/decompress bila perlu) dan update status ke DB
 */
class PcareKunjunganController extends Controller
{
    use BpjsTraits;

    /**
     * Tampilkan halaman daftar/entry kunjungan (opsional jika view tersedia).
     */
    public function index()
    {
        return view('Pcare.kunjungan.index');
    }

    /**
     * Kirim Kunjungan PCare dari payload UI.
     * Endpoint: POST /api/pcare/kunjungan
     * Menerima body JSON sesuai katalog PCare, lalu diteruskan ke BPJS dengan Content-Type: text/plain.
     * Mengembalikan response yang sudah di-decrypt/decompress jika diperlukan.
     */
    public function store(Request $request)
    {
        // Ambil payload mentah dari frontend
        $payload = $request->all();

        // Normalisasi kdTacc: Sesuai Ref_TACC BPJS, nilai valid adalah -1, 1, 2, 3, 4
        // UI kadang mengirim 0 (dari konversi -1) atau -1 untuk "Tanpa TACC"
        // API BPJS menerima -1 untuk "Tanpa TACC", bukan 0
        try {
            if (array_key_exists('kdTacc', $payload)) {
                $v = $payload['kdTacc'];
                // Konversi 0, -1, '-1', '', null menjadi -1 (Tanpa TACC)
                if ($v === 0 || $v === -1 || $v === '0' || $v === '-1' || $v === '' || $v === null) {
                    $payload['kdTacc'] = -1;
                    $payload['alasanTacc'] = null;
                }
            }
        } catch (\Throwable $e) {
            // abaikan jika normalisasi gagal
        }

        // Jika tglDaftar dari UI berformat YYYY-MM-DD, konversi ke dd-mm-YYYY sesuai katalog
        try {
            if (! empty($payload['tglDaftar']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) $payload['tglDaftar'])) {
                $dt = new \DateTime($payload['tglDaftar']);
                $payload['tglDaftar'] = $dt->format('d-m-Y');
            }
        } catch (\Throwable $e) {
        }

        // Sanitasi rujukan: hapus key rujukLanjut bila null/empty untuk menghindari JValue error di server PCare
        try {
            if (array_key_exists('rujukLanjut', $payload)) {
                $rl = $payload['rujukLanjut'];
                if ($rl === null || $rl === '' || (is_array($rl) && empty($rl))) {
                    unset($payload['rujukLanjut']);
                } elseif (is_array($rl)) {
                    // Buang field null di dalam rujukLanjut (khusus, subSpesialis kosong, dsb.)
                    if (array_key_exists('khusus', $rl) && ($rl['khusus'] === null || $rl['khusus'] === '')) {
                        unset($rl['khusus']);
                    }
                    if (array_key_exists('subSpesialis', $rl) && (is_null($rl['subSpesialis']) || (is_array($rl['subSpesialis']) && empty($rl['subSpesialis'])))) {
                        unset($rl['subSpesialis']);
                    }
                    // Normalisasi tanggal estimasi rujuk bila ada: dd-mm-YYYY
                    if (! empty($rl['tglEstRujuk']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) $rl['tglEstRujuk'])) {
                        $dtR = new \DateTime($rl['tglEstRujuk']);
                        $rl['tglEstRujuk'] = $dtR->format('d-m-Y');
                    }
                    // Jika setelah pembersihan kosong, hapus rujukLanjut
                    if (empty($rl)) {
                        unset($payload['rujukLanjut']);
                    } else {
                        $payload['rujukLanjut'] = $rl;
                    }
                }
            }
        } catch (\Throwable $e) {
        }

        $start = microtime(true);
        $ct = (string) config('bpjs.pcare.kunjungan_content_type', 'text/plain');
        $result = $this->pcareRequest('POST', 'kunjungan/v1', [], $payload, [
            'Content-Type' => $ct,
        ]);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
        if ($response->status() >= 400) {
            $meta = is_array($processed) ? ($processed['metaData'] ?? $processed['metadata'] ?? null) : null;
            $msg = is_array($meta) ? (string) ($meta['message'] ?? '') : '';
            if ($msg !== '' && stripos($msg, 'JValue') !== false) {
                $alt = strtolower($ct) === 'text/plain' ? 'application/json' : 'text/plain';
                try {
                    $result = $this->pcareRequest('POST', 'kunjungan/v1', [], $payload, [
                        'Content-Type' => $alt,
                    ]);
                    $response = $result['response'];
                    $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
                } catch (\Throwable $e) {
                }
            }
        }
        $durationMs = (int) round((microtime(true) - $start) * 1000);

        // Upsert status ke DB bila tersedia nomor rawat dalam payload
        try {
            $noRawat = trim((string) ($payload['no_rawat'] ?? ''));
            if ($noRawat !== '') {
                $status = ($response->status() >= 200 && $response->status() < 300) ? 'Terkirim' : 'Gagal';

                // Log response untuk debugging
                Log::info('Parsing noKunjungan dari response BPJS', [
                    'no_rawat' => $noRawat,
                    'response_status' => $response->status(),
                    'processed_type' => gettype($processed),
                    'processed_is_array' => is_array($processed),
                ]);

                $noKunjungan = $this->parseNoKunjunganFromResponse(is_array($processed) ? $processed : []);

                if ($noKunjungan) {
                    Log::info('noKunjungan berhasil di-parse dari response', [
                        'no_rawat' => $noRawat,
                        'noKunjungan' => $noKunjungan,
                    ]);
                } else {
                    Log::warning('noKunjungan tidak ditemukan di response awal, mencoba fallback', [
                        'no_rawat' => $noRawat,
                    ]);
                }

                if ($noKunjungan === null) {
                    if (is_string($processed) && $processed !== '') {
                        $noKunjungan = $this->parseNoKunjunganFromString($processed);
                        if ($noKunjungan === null) {
                            try {
                                $decodedProcessed = json_decode($processed, true);
                                if (is_array($decodedProcessed)) {
                                    $noKunjungan = $this->parseNoKunjunganFromResponse($decodedProcessed);
                                }
                            } catch (\Throwable $e) {
                            }
                        }
                    }
                    if ($noKunjungan === null) {
                        $rawBody = $response->body();
                        if (is_string($rawBody) && $rawBody !== '') {
                            $noKunjungan = $this->parseNoKunjunganFromString($rawBody);
                            if ($noKunjungan === null) {
                                try {
                                    $decoded = json_decode($rawBody, true);
                                    if (is_array($decoded)) {
                                        $noKunjungan = $this->parseNoKunjunganFromResponse($decoded);
                                    }
                                } catch (\Throwable $e) {
                                }
                            }
                        }
                    }
                    if ($noKunjungan === null) {
                        $loc = (string) ($response->header('Location') ?? $response->header('location') ?? '');
                        if ($loc !== '') {
                            $candidate = $this->parseNoKunjunganFromString($loc);
                            if ($candidate !== null) {
                                $noKunjungan = $candidate;
                            }
                        }
                    }
                }

                // Simpan status dan respon mentah ke reg_periksa (penyesuaian kolom bila ada)
                try {
                    $updateData = [];
                    if (\Illuminate\Support\Facades\Schema::hasColumn('reg_periksa', 'status_pcare')) {
                        $updateData['status_pcare'] = $status;
                    }
                    if (\Illuminate\Support\Facades\Schema::hasColumn('reg_periksa', 'response_pcare')) {
                        $updateData['response_pcare'] = is_array($processed) ? json_encode($processed) : (string) $processed;
                    }
                    if (\Illuminate\Support\Facades\Schema::hasColumn('reg_periksa', 'updated_at')) {
                        $updateData['updated_at'] = now();
                    }
                    if (! empty($updateData)) {
                        DB::table('reg_periksa')->where('no_rawat', $noRawat)->update($updateData);
                    }
                } catch (\Throwable $e) {
                    Log::warning('Gagal update status_pcare di reg_periksa', ['no_rawat' => $noRawat, 'error' => $e->getMessage()]);
                }

                try {
                    if (\Illuminate\Support\Facades\Schema::hasTable('pcare_kunjungan_umum')) {
                        $reg = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
                        $pasien = $reg ? DB::table('pasien')->where('no_rkm_medis', $reg->no_rkm_medis)->first() : null;
                        $poli = $reg && $reg->kd_poli ? DB::table('poliklinik')->where('kd_poli', $reg->kd_poli)->first() : null;
                        $dokter = $reg && $reg->kd_dokter ? DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->first() : null;

                        $pemeriksaan = DB::table('pemeriksaan_ralan')
                            ->where('no_rawat', $noRawat)
                            ->orderBy('tgl_perawatan', 'desc')
                            ->orderBy('jam_rawat', 'desc')
                            ->first();

                        $terapiObatData = DB::table('resep_obat')
                            ->join('resep_dokter', 'resep_obat.no_resep', '=', 'resep_dokter.no_resep')
                            ->join('databarang', 'resep_dokter.kode_brng', '=', 'databarang.kode_brng')
                            ->where('resep_obat.no_rawat', $noRawat)
                            ->select('databarang.nama_brng', 'resep_dokter.jml', 'resep_dokter.aturan_pakai')
                            ->get();
                        $terapiObatString = 'Tidak Ada';
                        if ($terapiObatData->isNotEmpty()) {
                            $arr = [];
                            foreach ($terapiObatData as $obat) {
                                $arr[] = $obat->nama_brng.' '.$obat->jml.' ['.$obat->aturan_pakai.']';
                            }
                            $terapiObatString = implode(', ', $arr);
                        }

                        $sistole = null;
                        $diastole = null;
                        if ($pemeriksaan && ! empty($pemeriksaan->tensi) && strpos($pemeriksaan->tensi, '/') !== false) {
                            $parts = explode('/', $pemeriksaan->tensi);
                            $sistole = trim($parts[0]) ?: null;
                            $diastole = isset($parts[1]) ? trim($parts[1]) : null;
                        }
                        $sistole = $sistole ?? (isset($payload['sistole']) ? (string) $payload['sistole'] : null);
                        $diastole = $diastole ?? (isset($payload['diastole']) ? (string) $payload['diastole'] : null);

                        $tglDaftarYmd = null;
                        if (! empty($payload['tglDaftar'])) {
                            $s = (string) $payload['tglDaftar'];
                            if (preg_match('/^\d{2}-\d{2}-\d{4}$/', $s)) {
                                $dt = \DateTime::createFromFormat('d-m-Y', $s);
                                $tglDaftarYmd = $dt ? $dt->format('Y-m-d') : null;
                            } elseif (preg_match('/^\d{4}-\d{2}-\d{2}$/', $s)) {
                                $tglDaftarYmd = $s;
                            }
                        }
                        $tglPulangYmd = null;
                        if (! empty($payload['tglPulang'])) {
                            $s = (string) $payload['tglPulang'];
                            if (preg_match('/^\d{2}-\d{2}-\d{4}$/', $s)) {
                                $dt = \DateTime::createFromFormat('d-m-Y', $s);
                                $tglPulangYmd = $dt ? $dt->format('Y-m-d') : null;
                            } elseif (preg_match('/^\d{4}-\d{2}-\d{2}$/', $s)) {
                                $tglPulangYmd = $s;
                            }
                        }

                        $nmPoli = $poli->nm_poli ?? ($payload['nmPoli'] ?? null);
                        $nmDokter = $dokter->nm_dokter ?? ($payload['nmDokter'] ?? null);

                        $diagnosa1 = DB::table('diagnosa_pasien')
                            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                            ->where('diagnosa_pasien.no_rawat', $noRawat)
                            ->where('diagnosa_pasien.prioritas', '1')
                            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                            ->first();
                        $diagnosa2 = DB::table('diagnosa_pasien')
                            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                            ->where('diagnosa_pasien.no_rawat', $noRawat)
                            ->where('diagnosa_pasien.prioritas', '2')
                            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                            ->first();
                        $diagnosa3 = DB::table('diagnosa_pasien')
                            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                            ->where('diagnosa_pasien.no_rawat', $noRawat)
                            ->where('diagnosa_pasien.prioritas', '3')
                            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                            ->first();

                        $nmSadar = null;
                        if (! empty($payload['kdSadar']) && \Illuminate\Support\Facades\Schema::hasTable('master_kesadaran')) {
                            $kesadaran = DB::table('master_kesadaran')->where('kd_kesadaran', $payload['kdSadar'])->first();
                            $nmSadar = $kesadaran->nm_kesadaran ?? null;
                        }
                        if ($nmSadar === null || $nmSadar === '') {
                            $nmSadar = isset($payload['nmSadar']) ? (string) $payload['nmSadar'] : $nmSadar;
                        }
                        if (($nmSadar === null || $nmSadar === '') && (($payload['kdSadar'] ?? '') === '01')) {
                            $nmSadar = 'Compos mentis';
                        }
                        $nmStatusPulang = null;
                        if (! empty($payload['kdStatusPulang']) && \Illuminate\Support\Facades\Schema::hasTable('status_pulang')) {
                            $sp = DB::table('status_pulang')->where('kd_status_pulang', $payload['kdStatusPulang'])->first();
                            $nmStatusPulang = $sp->nm_status_pulang ?? null;
                        }
                        if ($nmStatusPulang === null || $nmStatusPulang === '') {
                            $nmStatusPulang = isset($payload['nmStatusPulang']) ? (string) $payload['nmStatusPulang'] : $nmStatusPulang;
                        }

                        $kdAlergiMakanan = (string) ($payload['alergiMakan'] ?? '00');
                        $kdAlergiUdara = (string) ($payload['alergiUdara'] ?? '00');
                        $kdAlergiObat = (string) ($payload['alergiObat'] ?? '00');
                        $nmAlergiMakanan = 'Tidak Ada';
                        $nmAlergiUdara = 'Tidak Ada';
                        $nmAlergiObat = 'Tidak Ada';
                        if (\Illuminate\Support\Facades\Schema::hasTable('master_alergi')) {
                            if ($kdAlergiMakanan !== '00') {
                                $am = DB::table('master_alergi')->where('kd_alergi', $kdAlergiMakanan)->first();
                                $nmAlergiMakanan = $am->nm_alergi ?? $nmAlergiMakanan;
                            }
                            if ($kdAlergiUdara !== '00') {
                                $au = DB::table('master_alergi')->where('kd_alergi', $kdAlergiUdara)->first();
                                $nmAlergiUdara = $au->nm_alergi ?? $nmAlergiUdara;
                            }
                            if ($kdAlergiObat !== '00') {
                                $ao = DB::table('master_alergi')->where('kd_alergi', $kdAlergiObat)->first();
                                $nmAlergiObat = $ao->nm_alergi ?? $nmAlergiObat;
                            }
                        } else {
                            $nmAlergiMakanan = isset($payload['nmAlergiMakanan']) ? (string) $payload['nmAlergiMakanan'] : $nmAlergiMakanan;
                            $nmAlergiUdara = isset($payload['nmAlergiUdara']) ? (string) $payload['nmAlergiUdara'] : $nmAlergiUdara;
                            $nmAlergiObat = isset($payload['nmAlergiObat']) ? (string) $payload['nmAlergiObat'] : $nmAlergiObat;
                        }
                        $kdPrognosa = (string) ($payload['kdPrognosa'] ?? '02');
                        $nmPrognosa = null;
                        if ($kdPrognosa !== '' && \Illuminate\Support\Facades\Schema::hasTable('master_prognosa')) {
                            $pr = DB::table('master_prognosa')->where('kd_prognosa', $kdPrognosa)->first();
                            $nmPrognosa = $pr->nm_prognosa ?? null;
                        }
                        if ($nmPrognosa === null || $nmPrognosa === '') {
                            $nmPrognosa = isset($payload['nmPrognosa']) ? (string) $payload['nmPrognosa'] : $nmPrognosa;
                        }
                        if ($nmPrognosa === null || $nmPrognosa === '') {
                            $nmPrognosa = 'Bonam (Baik)';
                        }

                        $lingkarPerut = isset($payload['lingkarPerut']) ? (string) $payload['lingkarPerut'] : ($pemeriksaan->lingkar_perut ?? '');
                        if ($lingkarPerut === null) {
                            $lingkarPerut = '';
                        }
                        $terapiNonObat = $payload['terapiNonObat'] ?? ($pemeriksaan->instruksi ?? 'Edukasi Kesehatan');
                        if ($terapiNonObat === '') {
                            $terapiNonObat = 'Edukasi Kesehatan';
                        }
                        $bmhp = $payload['bmhp'] ?? 'Tidak Ada';
                        if ($bmhp === '') {
                            $bmhp = 'Tidak Ada';
                        }

                        // Cek apakah record sudah ada dan memiliki noKunjungan
                        $existing = DB::table('pcare_kunjungan_umum')->where('no_rawat', $noRawat)->first();
                        $existingNoKunjungan = $existing && ! empty($existing->noKunjungan) ? (string) $existing->noKunjungan : null;

                        // Gunakan noKunjungan yang sudah ada jika parsing gagal
                        $finalNoKunjungan = $noKunjungan ?? $existingNoKunjungan;

                        // Log untuk debugging
                        if (! $noKunjungan && $existingNoKunjungan) {
                            Log::info('Menggunakan noKunjungan yang sudah ada dari database', [
                                'no_rawat' => $noRawat,
                                'noKunjungan' => $existingNoKunjungan,
                            ]);
                        }

                        if (! $finalNoKunjungan) {
                            // Coba ambil dari response yang sudah di-decode
                            $finalNoKunjungan = $this->fillNoKunjunganFromDbIfMissing($noRawat);
                        }

                        $data = [
                            'no_rawat' => $noRawat,
                            'tglDaftar' => $tglDaftarYmd ?? (isset($reg->tgl_registrasi) ? date('Y-m-d', strtotime($reg->tgl_registrasi)) : null),
                            'no_rkm_medis' => $reg->no_rkm_medis ?? null,
                            'nm_pasien' => $pasien->nm_pasien ?? null,
                            'noKartu' => $payload['noKartu'] ?? null,
                            'kdPoli' => $payload['kdPoli'] ?? ($reg->kd_poli ?? null),
                            'nmPoli' => $nmPoli,
                            'keluhan' => $payload['keluhan'] ?? ($pemeriksaan->keluhan ?? null),
                            'kdSadar' => $payload['kdSadar'] ?? null,
                            'nmSadar' => $nmSadar,
                            'sistole' => $sistole,
                            'diastole' => $diastole,
                            'beratBadan' => isset($payload['beratBadan']) ? (string) $payload['beratBadan'] : ($pemeriksaan->berat ?? null),
                            'tinggiBadan' => isset($payload['tinggiBadan']) ? (string) $payload['tinggiBadan'] : ($pemeriksaan->tinggi ?? null),
                            'respRate' => isset($payload['respRate']) ? (string) $payload['respRate'] : ($pemeriksaan->respirasi ?? null),
                            'heartRate' => isset($payload['heartRate']) ? (string) $payload['heartRate'] : ($pemeriksaan->nadi ?? null),
                            'lingkarPerut' => $lingkarPerut,
                            'terapi' => $payload['terapiObat'] ?? $terapiObatString,
                            'kdStatusPulang' => $payload['kdStatusPulang'] ?? null,
                            'nmStatusPulang' => $nmStatusPulang,
                            'tglPulang' => $tglPulangYmd ?? null,
                            'kdDokter' => $payload['kdDokter'] ?? null,
                            'nmDokter' => $nmDokter,
                            'kdDiag1' => $payload['kdDiag1'] ?? ($diagnosa1->kd_penyakit ?? null),
                            'nmDiag1' => $diagnosa1->nm_penyakit ?? null,
                            'kdDiag2' => $payload['kdDiag2'] ?? ($diagnosa2->kd_penyakit ?? null),
                            'nmDiag2' => $diagnosa2->nm_penyakit ?? null,
                            'kdDiag3' => $payload['kdDiag3'] ?? ($diagnosa3->kd_penyakit ?? null),
                            'nmDiag3' => $diagnosa3->nm_penyakit ?? null,
                            'status' => $status,
                            'KdAlergiMakanan' => $kdAlergiMakanan,
                            'NmAlergiMakanan' => $nmAlergiMakanan,
                            'KdAlergiUdara' => $kdAlergiUdara,
                            'NmAlergiUdara' => $nmAlergiUdara,
                            'KdAlergiObat' => $kdAlergiObat,
                            'NmAlergiObat' => $nmAlergiObat,
                            'KdPrognosa' => $kdPrognosa,
                            'NmPrognosa' => $nmPrognosa,
                            'terapi_non_obat' => $terapiNonObat,
                            'bmhp' => $bmhp,
                        ];

                        // Hanya update noKunjungan jika nilainya tidak null
                        if ($finalNoKunjungan !== null && $finalNoKunjungan !== '') {
                            $data['noKunjungan'] = $finalNoKunjungan;
                        }

                        DB::table('pcare_kunjungan_umum')->updateOrInsert(['no_rawat' => $noRawat], $data);
                    }
                } catch (\Throwable $e) {
                    Log::error('Gagal upsert pcare_kunjungan_umum', ['no_rawat' => $noRawat, 'error' => $e->getMessage()]);
                }
            }
        } catch (\Throwable $e) {
            Log::error('Gagal menyimpan data kunjungan ke DB', ['error' => $e->getMessage()]);
        }

        try {
            $noRawatLog = trim((string) ($payload['no_rawat'] ?? ''));
            if (\Illuminate\Support\Facades\Schema::hasTable('pcare_bpjs_log') && $noRawatLog !== '') {
                $meta = is_array($processed) ? ($processed['metaData'] ?? ($processed['metadata'] ?? [])) : [];
                $metaCode = is_array($meta) ? (int) ($meta['code'] ?? 0) : null;
                $metaMessage = is_array($meta) ? (string) ($meta['message'] ?? '') : null;
                $statusLabel = $response->status() >= 200 && $response->status() < 300 ? 'success' : 'failed';
                $reqPayload = $payload;
                if (isset($reqPayload['noKartu'])) {
                    $card = (string) $reqPayload['noKartu'];
                    $reqPayload['noKartu_masked'] = substr($card, 0, 6).str_repeat('*', max(strlen($card) - 10, 0)).substr($card, -4);
                    unset($reqPayload['noKartu']);
                }
                try {
                    \Illuminate\Support\Facades\DB::table('pcare_bpjs_log')->insert([
                        'no_rawat' => $noRawatLog,
                        'endpoint' => 'kunjungan',
                        'status' => $statusLabel,
                        'http_status' => $response->status(),
                        'meta_code' => $metaCode,
                        'meta_message' => $metaMessage,
                        'duration_ms' => $durationMs,
                        'request_payload' => json_encode($reqPayload),
                        'response_body_raw' => $response->body(),
                        'response_body_json' => is_array($processed) ? json_encode($processed) : null,
                        'triggered_by' => optional(\Illuminate\Support\Facades\Auth::user())->nik ?? (string) optional(\Illuminate\Support\Facades\Auth::user())->id ?? null,
                        'correlation_id' => $request->header('X-BPJS-LOG-ID') ?: null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    // Setelah pcare_bpjs_log disimpan, coba ambil noKunjungan jika masih belum ada
                    if ($noRawatLog !== '' && \Illuminate\Support\Facades\Schema::hasTable('pcare_kunjungan_umum')) {
                        $existingRecord = DB::table('pcare_kunjungan_umum')->where('no_rawat', $noRawatLog)->first();
                        if ($existingRecord && (empty($existingRecord->noKunjungan) || $existingRecord->noKunjungan === null)) {
                            $foundNoKunjungan = $this->fillNoKunjunganFromDbIfMissing($noRawatLog);
                            if ($foundNoKunjungan) {
                                DB::table('pcare_kunjungan_umum')
                                    ->where('no_rawat', $noRawatLog)
                                    ->update(['noKunjungan' => $foundNoKunjungan]);

                                Log::info('noKunjungan berhasil diambil dari pcare_bpjs_log setelah insert', [
                                    'no_rawat' => $noRawatLog,
                                    'noKunjungan' => $foundNoKunjungan,
                                ]);
                            } else {
                                Log::warning('noKunjungan tidak ditemukan setelah semua usaha parsing', [
                                    'no_rawat' => $noRawatLog,
                                    'response_status' => $response->status(),
                                    'processed_type' => gettype($processed),
                                    'processed_preview' => is_array($processed) ? json_encode(array_slice($processed, 0, 3, true)) : substr((string) $processed, 0, 500),
                                ]);
                            }
                        }
                    }
                } catch (\Throwable $e) {
                    Log::error('Gagal insert pcare_bpjs_log atau fillNoKunjunganFromDbIfMissing', [
                        'no_rawat' => $noRawatLog,
                        'error' => $e->getMessage(),
                    ]);
                }
            }
        } catch (\Throwable $e) {
        }

        try {
            $noRawatRujuk = trim((string) ($payload['no_rawat'] ?? ''));
            $rujuk = isset($payload['rujukLanjut']) && is_array($payload['rujukLanjut']) ? $payload['rujukLanjut'] : null;
            if ($noRawatRujuk !== '' && $rujuk && \Illuminate\Support\Facades\Schema::hasTable('pcare_rujuk_subspesialis')) {
                $reg = DB::table('reg_periksa')->where('no_rawat', $noRawatRujuk)->first();
                $pasien = $reg ? DB::table('pasien')->where('no_rkm_medis', $reg->no_rkm_medis)->first() : null;
                $poli = $reg && $reg->kd_poli ? DB::table('poliklinik')->where('kd_poli', $reg->kd_poli)->first() : null;
                $dokter = $reg && $reg->kd_dokter ? DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->first() : null;

                $pemeriksaan = DB::table('pemeriksaan_ralan')
                    ->where('no_rawat', $noRawatRujuk)
                    ->orderBy('tgl_perawatan', 'desc')
                    ->orderBy('jam_rawat', 'desc')
                    ->first();

                $terapiObatData = DB::table('resep_obat')
                    ->join('resep_dokter', 'resep_obat.no_resep', '=', 'resep_dokter.no_resep')
                    ->join('databarang', 'resep_dokter.kode_brng', '=', 'databarang.kode_brng')
                    ->where('resep_obat.no_rawat', $noRawatRujuk)
                    ->select('databarang.nama_brng', 'resep_dokter.jml', 'resep_dokter.aturan_pakai')
                    ->get();
                $terapiObatStringR = 'Tidak Ada';
                if ($terapiObatData->isNotEmpty()) {
                    $arrR = [];
                    foreach ($terapiObatData as $obat) {
                        $arrR[] = $obat->nama_brng.' '.$obat->jml.' ['.$obat->aturan_pakai.']';
                    }
                    $terapiObatStringR = implode(', ', $arrR);
                }

                $sistoleR = null;
                $diastoleR = null;
                if ($pemeriksaan && ! empty($pemeriksaan->tensi) && strpos($pemeriksaan->tensi, '/') !== false) {
                    $partsR = explode('/', $pemeriksaan->tensi);
                    $sistoleR = trim($partsR[0]) ?: null;
                    $diastoleR = isset($partsR[1]) ? trim($partsR[1]) : null;
                }
                $sistoleR = $sistoleR ?? (isset($payload['sistole']) ? (string) $payload['sistole'] : null);
                $diastoleR = $diastoleR ?? (isset($payload['diastole']) ? (string) $payload['diastole'] : null);

                $tglDaftarYmdR = null;
                if (! empty($payload['tglDaftar'])) {
                    $s = (string) $payload['tglDaftar'];
                    if (preg_match('/^\d{2}-\d{2}-\d{4}$/', $s)) {
                        $dt = \DateTime::createFromFormat('d-m-Y', $s);
                        $tglDaftarYmdR = $dt ? $dt->format('Y-m-d') : null;
                    } elseif (preg_match('/^\d{4}-\d{2}-\d{2}$/', $s)) {
                        $tglDaftarYmdR = $s;
                    }
                }
                $tglPulangYmdR = null;
                if (! empty($payload['tglPulang'])) {
                    $s = (string) $payload['tglPulang'];
                    if (preg_match('/^\d{2}-\d{2}-\d{4}$/', $s)) {
                        $dt = \DateTime::createFromFormat('d-m-Y', $s);
                        $tglPulangYmdR = $dt ? $dt->format('Y-m-d') : null;
                    } elseif (preg_match('/^\d{4}-\d{2}-\d{2}$/', $s)) {
                        $tglPulangYmdR = $s;
                    }
                }

                $subSp = is_array($rujuk['subSpesialis'] ?? null) ? $rujuk['subSpesialis'] : [];
                $tglEstRujukYmd = null;
                if (! empty($rujuk['tglEstRujuk'])) {
                    $s = (string) $rujuk['tglEstRujuk'];
                    if (preg_match('/^\d{2}-\d{2}-\d{4}$/', $s)) {
                        $dt = \DateTime::createFromFormat('d-m-Y', $s);
                        $tglEstRujukYmd = $dt ? $dt->format('Y-m-d') : null;
                    } elseif (preg_match('/^\d{4}-\d{2}-\d{2}$/', $s)) {
                        $tglEstRujukYmd = $s;
                    }
                }

                $nmPoliR = $poli->nm_poli ?? ($payload['nmPoli'] ?? null);
                $nmDokterR = $dokter->nm_dokter ?? ($payload['nmDokter'] ?? null);

                $diagnosa1R = DB::table('diagnosa_pasien')
                    ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                    ->where('diagnosa_pasien.no_rawat', $noRawatRujuk)
                    ->where('diagnosa_pasien.prioritas', '1')
                    ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                    ->first();
                $diagnosa2R = DB::table('diagnosa_pasien')
                    ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                    ->where('diagnosa_pasien.no_rawat', $noRawatRujuk)
                    ->where('diagnosa_pasien.prioritas', '2')
                    ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                    ->first();
                $diagnosa3R = DB::table('diagnosa_pasien')
                    ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                    ->where('diagnosa_pasien.no_rawat', $noRawatRujuk)
                    ->where('diagnosa_pasien.prioritas', '3')
                    ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                    ->first();

                $nmSadarR = null;
                if (! empty($payload['kdSadar']) && \Illuminate\Support\Facades\Schema::hasTable('master_kesadaran')) {
                    $kesadaran = DB::table('master_kesadaran')->where('kd_kesadaran', $payload['kdSadar'])->first();
                    $nmSadarR = $kesadaran->nm_kesadaran ?? null;
                }
                if ($nmSadarR === null || $nmSadarR === '') {
                    $nmSadarR = isset($payload['nmSadar']) ? (string) $payload['nmSadar'] : $nmSadarR;
                }
                if (($nmSadarR === null || $nmSadarR === '') && (($payload['kdSadar'] ?? '') === '01')) {
                    $nmSadarR = 'Compos mentis';
                }
                $nmStatusPulangR = null;
                if (! empty($payload['kdStatusPulang']) && \Illuminate\Support\Facades\Schema::hasTable('status_pulang')) {
                    $sp = DB::table('status_pulang')->where('kd_status_pulang', $payload['kdStatusPulang'])->first();
                    $nmStatusPulangR = $sp->nm_status_pulang ?? null;
                }
                if ($nmStatusPulangR === null || $nmStatusPulangR === '') {
                    $nmStatusPulangR = isset($payload['nmStatusPulang']) ? (string) $payload['nmStatusPulang'] : $nmStatusPulangR;
                }

                $nmSubSpesialisR = isset($payload['nmSubSpesialis']) ? $payload['nmSubSpesialis'] : null;
                $nmSaranaR = null;
                if (isset($subSp['kdSarana'])) {
                    $nmSaranaR = $subSp['kdSarana'] === '1' ? 'Rawat Jalan' : ($subSp['kdSarana'] === '2' ? 'Rawat Inap' : null);
                }
                $nmPPKR = isset($payload['nmPPK']) && trim((string) $payload['nmPPK']) !== '' ? trim((string) $payload['nmPPK']) : '';

                $nmTACCR = null;
                if (isset($payload['kdTacc'])) {
                    $map = ['-1' => 'Tanpa TACC', '1' => 'Time', '2' => 'Age', '3' => 'Complication', '4' => 'Comorbidity'];
                    $kd = (string) $payload['kdTacc'];
                    $nmTACCR = $map[$kd] ?? null;
                }

                $dataR = [
                    'no_rawat' => $noRawatRujuk,
                    'noKunjungan' => $noKunjungan,
                    'tglDaftar' => $tglDaftarYmdR ?? (isset($reg->tgl_registrasi) ? date('Y-m-d', strtotime($reg->tgl_registrasi)) : null),
                    'no_rkm_medis' => $reg->no_rkm_medis ?? null,
                    'nm_pasien' => $pasien->nm_pasien ?? null,
                    'noKartu' => $payload['noKartu'] ?? null,
                    'kdPoli' => $payload['kdPoli'] ?? ($reg->kd_poli ?? null),
                    'nmPoli' => $nmPoliR,
                    'keluhan' => $payload['keluhan'] ?? ($pemeriksaan->keluhan ?? null),
                    'kdSadar' => $payload['kdSadar'] ?? null,
                    'nmSadar' => $nmSadarR,
                    'sistole' => $sistoleR,
                    'diastole' => $diastoleR,
                    'beratBadan' => isset($payload['beratBadan']) ? (string) $payload['beratBadan'] : ($pemeriksaan->berat ?? null),
                    'tinggiBadan' => isset($payload['tinggiBadan']) ? (string) $payload['tinggiBadan'] : ($pemeriksaan->tinggi ?? null),
                    'respRate' => isset($payload['respRate']) ? (string) $payload['respRate'] : ($pemeriksaan->respirasi ?? null),
                    'heartRate' => isset($payload['heartRate']) ? (string) $payload['heartRate'] : ($pemeriksaan->nadi ?? null),
                    'lingkarPerut' => isset($payload['lingkarPerut']) ? (string) $payload['lingkarPerut'] : ($pemeriksaan->lingkar_perut ?? ''),
                    'terapi' => $terapiObatStringR,
                    'kdStatusPulang' => $payload['kdStatusPulang'] ?? null,
                    'nmStatusPulang' => $nmStatusPulangR,
                    'tglPulang' => $tglPulangYmdR ?? null,
                    'kdDokter' => $payload['kdDokter'] ?? null,
                    'nmDokter' => $nmDokterR,
                    'kdDiag1' => $payload['kdDiag1'] ?? ($diagnosa1R->kd_penyakit ?? null),
                    'nmDiag1' => $diagnosa1R->nm_penyakit ?? null,
                    'kdDiag2' => $payload['kdDiag2'] ?? ($diagnosa2R->kd_penyakit ?? null),
                    'nmDiag2' => $diagnosa2R->nm_penyakit ?? null,
                    'kdDiag3' => $payload['kdDiag3'] ?? ($diagnosa3R->kd_penyakit ?? null),
                    'nmDiag3' => $diagnosa3R->nm_penyakit ?? null,
                    'tglEstRujuk' => $tglEstRujukYmd,
                    'kdPPK' => $rujuk['kdppk'] ?? null,
                    'nmPPK' => $nmPPKR,
                    'kdSubSpesialis' => $subSp['kdSubSpesialis1'] ?? ($subSp['kdSubSpesialis'] ?? null),
                    'nmSubSpesialis' => $nmSubSpesialisR,
                    'kdSarana' => $subSp['kdSarana'] ?? null,
                    'nmSarana' => $nmSaranaR,
                    'kdTACC' => isset($payload['kdTacc']) ? (string) $payload['kdTacc'] : null,
                    'nmTACC' => $nmTACCR,
                    'alasanTACC' => $payload['alasanTacc'] ?? null,
                    'KdAlergiMakanan' => $kdAlergiMakanan,
                    'NmAlergiMakanan' => $nmAlergiMakanan,
                    'KdAlergiUdara' => $kdAlergiUdara,
                    'NmAlergiUdara' => $nmAlergiUdara,
                    'KdAlergiObat' => $kdAlergiObat,
                    'NmAlergiObat' => $nmAlergiObat,
                    'KdPrognosa' => $kdPrognosa,
                    'NmPrognosa' => $nmPrognosa,
                    'terapi_non_obat' => $terapiNonObat,
                    'bmhp' => $bmhp,
                ];

                DB::table('pcare_rujuk_subspesialis')->updateOrInsert(['no_rawat' => $noRawatRujuk], $dataR);
            }
        } catch (\Throwable $e) {
        }

        // Kembalikan hasil sesuai HTTP status asli dari PCare
        if (is_array($processed)) {
            return response()->json($processed, $response->status());
        }

        // Fallback: bila processed bukan array (decrypt gagal atau bukan wrapper JSON)
        return response($processed, $response->status())
            ->header('Content-Type', 'application/json');
    }

    public function update(Request $request)
    {
        $payload = $request->all();

        try {
            if (array_key_exists('kdTacc', $payload)) {
                $v = $payload['kdTacc'];
                if ($v === 0 || $v === -1 || $v === '0' || $v === '-1' || $v === '' || $v === null) {
                    $payload['kdTacc'] = -1;
                    $payload['alasanTacc'] = null;
                }
            }
        } catch (\Throwable $e) {
        }

        try {
            if (! empty($payload['tglDaftar']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) $payload['tglDaftar'])) {
                $dt = new \DateTime($payload['tglDaftar']);
                $payload['tglDaftar'] = $dt->format('d-m-Y');
            }
        } catch (\Throwable $e) {
        }
        try {
            if (! empty($payload['tglPulang']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) $payload['tglPulang'])) {
                $dt = new \DateTime($payload['tglPulang']);
                $payload['tglPulang'] = $dt->format('d-m-Y');
            }
        } catch (\Throwable $e) {
        }

        // Normalisasi rujukLanjut: sesuai katalog BPJS Edit Kunjungan
        // Jika rujukLanjut tidak ada atau kosong, hapus dari payload
        // Jika ada, pastikan struktur sesuai katalog (tglEstRujuk, kdppk, subSpesialis/null, khusus/null)
        try {
            if (array_key_exists('rujukLanjut', $payload)) {
                $rl = $payload['rujukLanjut'];

                // Jika null, string kosong, atau array kosong, hapus rujukLanjut
                if ($rl === null || $rl === '' || (is_array($rl) && empty($rl))) {
                    unset($payload['rujukLanjut']);
                } elseif (is_array($rl)) {
                    // Hapus field khusus jika null atau kosong
                    if (array_key_exists('khusus', $rl) && ($rl['khusus'] === null || $rl['khusus'] === '' || (is_array($rl['khusus']) && empty($rl['khusus'])))) {
                        unset($rl['khusus']);
                    }

                    // Hapus subSpesialis jika null atau kosong (sesuai katalog BPJS)
                    if (array_key_exists('subSpesialis', $rl)) {
                        if (is_null($rl['subSpesialis']) || $rl['subSpesialis'] === '') {
                            unset($rl['subSpesialis']);
                        } elseif (is_array($rl['subSpesialis'])) {
                            // Jika subSpesialis adalah array, cek apakah kosong atau semua nilai null
                            $hasValue = false;
                            foreach ($rl['subSpesialis'] as $key => $value) {
                                if ($value !== null && $value !== '') {
                                    $hasValue = true;
                                    break;
                                }
                            }
                            if (! $hasValue) {
                                unset($rl['subSpesialis']);
                            }
                        }
                    }

                    // Normalisasi format tanggal tglEstRujuk: YYYY-MM-DD -> dd-mm-YYYY
                    if (! empty($rl['tglEstRujuk']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) $rl['tglEstRujuk'])) {
                        try {
                            $dtR = new \DateTime($rl['tglEstRujuk']);
                            $rl['tglEstRujuk'] = $dtR->format('d-m-Y');
                        } catch (\Throwable $e) {
                            // Jika parsing gagal, biarkan as is
                        }
                    }

                    // Pastikan kdppk ada dan tidak kosong (wajib untuk rujukLanjut)
                    if (empty($rl['kdppk']) || $rl['kdppk'] === null || $rl['kdppk'] === '') {
                        // Jika kdppk kosong, hapus seluruh rujukLanjut
                        unset($payload['rujukLanjut']);
                    } elseif (empty($rl)) {
                        // Jika setelah pembersihan array kosong, hapus rujukLanjut
                        unset($payload['rujukLanjut']);
                    } else {
                        // Set rujukLanjut yang sudah dinormalisasi
                        $payload['rujukLanjut'] = $rl;
                    }
                }
            }
        } catch (\Throwable $e) {
            // Jika terjadi error, log dan biarkan payload tetap dikirim (backend akan validasi)
            Log::warning('Error normalisasi rujukLanjut', [
                'error' => $e->getMessage(),
                'payload_rujukLanjut' => $payload['rujukLanjut'] ?? null,
            ]);
        }

        // Hapus field yang tidak diperlukan untuk Edit Kunjungan sesuai katalog BPJS
        // Edit Kunjungan tidak memerlukan tglDaftar dan kdPoli, hanya Create yang memerlukan
        unset($payload['tglDaftar']);
        unset($payload['kdPoli']); // Tidak diperlukan untuk Edit sesuai katalog
        unset($payload['no_rawat']); // Field internal, tidak dikirim ke BPJS

        // Pastikan field wajib ada sesuai katalog BPJS Edit Kunjungan
        if (empty($payload['noKunjungan'])) {
            return response()->json([
                'metaData' => [
                    'message' => 'noKunjungan wajib diisi untuk Edit Kunjungan',
                    'code' => 400,
                ],
            ], 400);
        }

        // Pastikan format data sesuai katalog BPJS
        // sistole, diastole, beratBadan, tinggiBadan, respRate, heartRate, lingkarPerut harus integer atau float
        $numericFields = ['sistole', 'diastole', 'beratBadan', 'tinggiBadan', 'respRate', 'heartRate', 'lingkarPerut'];
        foreach ($numericFields as $field) {
            if (isset($payload[$field])) {
                // Konversi ke integer untuk sistole, diastole, respRate, heartRate
                if (in_array($field, ['sistole', 'diastole', 'respRate', 'heartRate'])) {
                    $payload[$field] = (int) $payload[$field];
                } else {
                    // Untuk beratBadan, tinggiBadan, lingkarPerut bisa float
                    $payload[$field] = is_numeric($payload[$field]) ? (float) $payload[$field] : 0;
                }
            }
        }

        // Pastikan kdTacc adalah integer sesuai katalog (-1, 1, 2, 3, 4)
        if (isset($payload['kdTacc'])) {
            $payload['kdTacc'] = (int) $payload['kdTacc'];
        }

        // Log payload lengkap untuk debugging (dengan masking noKartu)
        $payloadForLog = $payload;
        $noKartuOriginal = $payloadForLog['noKartu'] ?? null;
        if (isset($payloadForLog['noKartu'])) {
            $card = (string) $payloadForLog['noKartu'];
            $payloadForLog['noKartu'] = substr($card, 0, 6).str_repeat('*', max(strlen($card) - 10, 0)).substr($card, -4);
        }

        Log::channel('bpjs')->info('Edit Kunjungan - Payload yang akan dikirim ke BPJS', [
            'noKunjungan' => $payload['noKunjungan'] ?? null,
            'noKartu_masked' => $payloadForLog['noKartu'] ?? null,
            'payload_full' => $payloadForLog, // Payload lengkap dengan masking
            'field_count' => count($payload),
            'has_tglDaftar' => isset($payload['tglDaftar']), // Seharusnya false
            'has_kdPoli' => isset($payload['kdPoli']), // Seharusnya false
            'has_no_rawat' => isset($payload['no_rawat']), // Seharusnya false
        ]);

        $start = microtime(true);
        $ct = (string) config('bpjs.pcare.kunjungan_content_type', 'text/plain');

        try {
            $result = $this->pcareRequest('PUT', 'kunjungan/v1', [], $payload, [
                'Content-Type' => $ct,
            ]);
        } catch (\Illuminate\Http\Client\RequestException $e) {
            // Tangani error dari BPJS API (misalnya 412 PRECONDITION_FAILED)
            $response = $e->response;
            $processed = $this->maybeDecryptAndDecompress($response->body(), time());

            // Kembalikan response error dari BPJS dengan status code yang sesuai
            if (is_array($processed)) {
                return response()->json($processed, $response->status());
            }

            return response()->json([
                'metaData' => [
                    'message' => $e->getMessage(),
                    'code' => $response->status(),
                ],
            ], $response->status());
        }

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
        if ($response->status() >= 400) {
            $meta = is_array($processed) ? ($processed['metaData'] ?? $processed['metadata'] ?? null) : null;
            $msg = is_array($meta) ? (string) ($meta['message'] ?? '') : '';
            if ($msg !== '' && stripos($msg, 'JValue') !== false) {
                $alt = strtolower($ct) === 'text/plain' ? 'application/json' : 'text/plain';
                try {
                    $result = $this->pcareRequest('PUT', 'kunjungan/v1', [], $payload, [
                        'Content-Type' => $alt,
                    ]);
                    $response = $result['response'];
                    $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
                } catch (\Throwable $e) {
                    // Jika retry juga gagal, kembalikan error
                    if ($e instanceof \Illuminate\Http\Client\RequestException && $e->response) {
                        $retryProcessed = $this->maybeDecryptAndDecompress($e->response->body(), time());
                        if (is_array($retryProcessed)) {
                            return response()->json($retryProcessed, $e->response->status());
                        }
                    }

                    return response()->json([
                        'metaData' => [
                            'message' => $e->getMessage(),
                            'code' => 500,
                        ],
                    ], 500);
                }
            }
        }
        $durationMs = (int) round((microtime(true) - $start) * 1000);

        try {
            $noRawat = trim((string) ($payload['no_rawat'] ?? ''));
            $noKunjunganPayload = trim((string) ($payload['noKunjungan'] ?? ''));
            $noKunjungan = $noKunjunganPayload !== '' ? $noKunjunganPayload : $this->parseNoKunjunganFromResponse(is_array($processed) ? $processed : []);
            if ($noRawat === '') {
                if ($noKunjungan !== '' && \Illuminate\Support\Facades\Schema::hasTable('pcare_kunjungan_umum')) {
                    try {
                        $row = DB::table('pcare_kunjungan_umum')->where('noKunjungan', $noKunjungan)->first();
                        if ($row && isset($row->no_rawat)) {
                            $noRawat = (string) $row->no_rawat;
                        }
                    } catch (\Throwable $e) {
                    }
                }
            }
            if ($noRawat !== '') {
                $status = ($response->status() >= 200 && $response->status() < 300) ? 'Diperbarui' : 'Gagal';
                try {
                    $updateReg = [];
                    if (\Illuminate\Support\Facades\Schema::hasColumn('reg_periksa', 'status_pcare')) {
                        $updateReg['status_pcare'] = $status;
                    }
                    if (\Illuminate\Support\Facades\Schema::hasColumn('reg_periksa', 'response_pcare')) {
                        $updateReg['response_pcare'] = is_array($processed) ? json_encode($processed) : (string) $processed;
                    }
                    if (\Illuminate\Support\Facades\Schema::hasColumn('reg_periksa', 'updated_at')) {
                        $updateReg['updated_at'] = now();
                    }
                    if (! empty($updateReg)) {
                        DB::table('reg_periksa')->where('no_rawat', $noRawat)->update($updateReg);
                    }
                } catch (\Throwable $e) {
                }

                try {
                    if (\Illuminate\Support\Facades\Schema::hasTable('pcare_kunjungan_umum')) {
                        $data = [];
                        $assign = function ($key) use (&$data, $payload) {
                            if (array_key_exists($key, $payload)) {
                                $data[$key] = $payload[$key];
                            }
                        };
                        $assign('noKunjungan');
                        $assign('noKartu');
                        $assign('kdPoli');
                        $assign('keluhan');
                        $assign('kdSadar');
                        $assign('sistole');
                        $assign('diastole');
                        $assign('beratBadan');
                        $assign('tinggiBadan');
                        $assign('respRate');
                        $assign('heartRate');
                        $assign('lingkarPerut');
                        $assign('kdStatusPulang');
                        $assign('tglPulang');
                        $assign('kdDokter');
                        $assign('kdDiag1');
                        $assign('kdDiag2');
                        $assign('kdDiag3');
                        $assign('terapiObat');
                        $assign('terapiNonObat');
                        $assign('bmhp');
                        if (! empty($data)) {
                            $data['status'] = $status;
                            DB::table('pcare_kunjungan_umum')->where('no_rawat', $noRawat)->update($data);
                        }
                    }
                } catch (\Throwable $e) {
                }

                try {
                    $rujuk = isset($payload['rujukLanjut']) && is_array($payload['rujukLanjut']) ? $payload['rujukLanjut'] : null;
                    if ($rujuk && \Illuminate\Support\Facades\Schema::hasTable('pcare_rujuk_subspesialis')) {
                        $reg = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
                        $pasien = $reg ? DB::table('pasien')->where('no_rkm_medis', $reg->no_rkm_medis)->first() : null;
                        $poli = $reg && $reg->kd_poli ? DB::table('poliklinik')->where('kd_poli', $reg->kd_poli)->first() : null;
                        $dokter = $reg && $reg->kd_dokter ? DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->first() : null;
                        $pemeriksaan = DB::table('pemeriksaan_ralan')
                            ->where('no_rawat', $noRawat)
                            ->orderBy('tgl_perawatan', 'desc')
                            ->orderBy('jam_rawat', 'desc')
                            ->first();
                        $terapiObatData = DB::table('resep_obat')
                            ->join('resep_dokter', 'resep_obat.no_resep', '=', 'resep_dokter.no_resep')
                            ->join('databarang', 'resep_dokter.kode_brng', '=', 'databarang.kode_brng')
                            ->where('resep_obat.no_rawat', $noRawat)
                            ->select('databarang.nama_brng', 'resep_dokter.jml', 'resep_dokter.aturan_pakai')
                            ->get();
                        $terapiObatString = 'Tidak Ada';
                        if ($terapiObatData->isNotEmpty()) {
                            $arr = [];
                            foreach ($terapiObatData as $obat) {
                                $arr[] = $obat->nama_brng.' '.$obat->jml.' ['.$obat->aturan_pakai.']';
                            }
                            $terapiObatString = implode(', ', $arr);
                        }
                        $subSp = is_array($rujuk['subSpesialis'] ?? null) ? $rujuk['subSpesialis'] : [];
                        $tglEstRujukYmd = null;
                        if (! empty($rujuk['tglEstRujuk'])) {
                            $s = (string) $rujuk['tglEstRujuk'];
                            if (preg_match('/^\d{2}-\d{2}-\d{4}$/', $s)) {
                                $dt = \DateTime::createFromFormat('d-m-Y', $s);
                                $tglEstRujukYmd = $dt ? $dt->format('Y-m-d') : null;
                            } elseif (preg_match('/^\d{4}-\d{2}-\d{2}$/', $s)) {
                                $tglEstRujukYmd = $s;
                            }
                        }
                        $nmPoli = $poli->nm_poli ?? ($payload['nmPoli'] ?? null);
                        $nmDokter = $dokter->nm_dokter ?? ($payload['nmDokter'] ?? null);
                        $diagnosa1 = DB::table('diagnosa_pasien')
                            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                            ->where('diagnosa_pasien.no_rawat', $noRawat)
                            ->where('diagnosa_pasien.prioritas', '1')
                            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                            ->first();
                        $diagnosa2 = DB::table('diagnosa_pasien')
                            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                            ->where('diagnosa_pasien.no_rawat', $noRawat)
                            ->where('diagnosa_pasien.prioritas', '2')
                            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                            ->first();
                        $diagnosa3 = DB::table('diagnosa_pasien')
                            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                            ->where('diagnosa_pasien.no_rawat', $noRawat)
                            ->where('diagnosa_pasien.prioritas', '3')
                            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                            ->first();
                        $nmSubSpesialis = isset($payload['nmSubSpesialis']) ? $payload['nmSubSpesialis'] : null;
                        $nmSarana = null;
                        if (isset($subSp['kdSarana'])) {
                            $nmSarana = $subSp['kdSarana'] === '1' ? 'Rawat Jalan' : ($subSp['kdSarana'] === '2' ? 'Rawat Inap' : null);
                        }
                        $nmPPK = isset($payload['nmPPK']) && trim((string) $payload['nmPPK']) !== '' ? trim((string) $payload['nmPPK']) : '';
                        $nmTACC = null;
                        if (isset($payload['kdTacc'])) {
                            $map = ['-1' => 'Tanpa TACC', '1' => 'Time', '2' => 'Age', '3' => 'Complication', '4' => 'Comorbidity'];
                            $kd = (string) $payload['kdTacc'];
                            $nmTACC = $map[$kd] ?? null;
                        }
                        $dataR = [
                            'no_rawat' => $noRawat,
                            'noKunjungan' => $noKunjungan ?: null,
                            'tglDaftar' => isset($payload['tglDaftar']) && preg_match('/^\d{2}-\d{2}-\d{4}$/', (string) $payload['tglDaftar']) ? (\DateTime::createFromFormat('d-m-Y', (string) $payload['tglDaftar'])->format('Y-m-d')) : ($reg && $reg->tgl_registrasi ? date('Y-m-d', strtotime($reg->tgl_registrasi)) : null),
                            'no_rkm_medis' => $reg->no_rkm_medis ?? null,
                            'nm_pasien' => $pasien->nm_pasien ?? null,
                            'noKartu' => $payload['noKartu'] ?? null,
                            'kdPoli' => $payload['kdPoli'] ?? ($reg->kd_poli ?? null),
                            'nmPoli' => $nmPoli,
                            'keluhan' => $payload['keluhan'] ?? ($pemeriksaan->keluhan ?? null),
                            'kdSadar' => $payload['kdSadar'] ?? null,
                            'nmSadar' => isset($payload['nmSadar']) ? (string) $payload['nmSadar'] : null,
                            'sistole' => isset($payload['sistole']) ? (string) $payload['sistole'] : null,
                            'diastole' => isset($payload['diastole']) ? (string) $payload['diastole'] : null,
                            'beratBadan' => isset($payload['beratBadan']) ? (string) $payload['beratBadan'] : ($pemeriksaan->berat ?? null),
                            'tinggiBadan' => isset($payload['tinggiBadan']) ? (string) $payload['tinggiBadan'] : ($pemeriksaan->tinggi ?? null),
                            'respRate' => isset($payload['respRate']) ? (string) $payload['respRate'] : ($pemeriksaan->respirasi ?? null),
                            'heartRate' => isset($payload['heartRate']) ? (string) $payload['heartRate'] : ($pemeriksaan->nadi ?? null),
                            'lingkarPerut' => isset($payload['lingkarPerut']) ? (string) $payload['lingkarPerut'] : ($pemeriksaan->lingkar_perut ?? ''),
                            'terapi' => $payload['terapiObat'] ?? $terapiObatString,
                            'kdStatusPulang' => $payload['kdStatusPulang'] ?? null,
                            'tglPulang' => isset($payload['tglPulang']) && preg_match('/^\d{2}-\d{2}-\d{4}$/', (string) $payload['tglPulang']) ? (\DateTime::createFromFormat('d-m-Y', (string) $payload['tglPulang'])->format('Y-m-d')) : null,
                            'kdDokter' => $payload['kdDokter'] ?? null,
                            'nmDokter' => $nmDokter,
                            'kdDiag1' => $payload['kdDiag1'] ?? ($diagnosa1->kd_penyakit ?? null),
                            'nmDiag1' => $diagnosa1->nm_penyakit ?? null,
                            'kdDiag2' => $payload['kdDiag2'] ?? ($diagnosa2->kd_penyakit ?? null),
                            'nmDiag2' => $diagnosa2->nm_penyakit ?? null,
                            'kdDiag3' => $payload['kdDiag3'] ?? ($diagnosa3->kd_penyakit ?? null),
                            'nmDiag3' => $diagnosa3->nm_penyakit ?? null,
                            'tglEstRujuk' => $tglEstRujukYmd,
                            'kdPPK' => $rujuk['kdppk'] ?? null,
                            'nmPPK' => $nmPPK,
                            'kdSubSpesialis' => $subSp['kdSubSpesialis1'] ?? ($subSp['kdSubSpesialis'] ?? null),
                            'nmSubSpesialis' => $nmSubSpesialis,
                            'kdSarana' => $subSp['kdSarana'] ?? null,
                            'nmSarana' => $nmSarana,
                            'kdTACC' => isset($payload['kdTacc']) ? (string) $payload['kdTacc'] : null,
                            'nmTACC' => $nmTACC,
                            'alasanTACC' => $payload['alasanTacc'] ?? null,
                            'terapi_non_obat' => $payload['terapiNonObat'] ?? ($pemeriksaan->instruksi ?? 'Edukasi Kesehatan'),
                            'bmhp' => $payload['bmhp'] ?? 'Tidak Ada',
                        ];
                        DB::table('pcare_rujuk_subspesialis')->updateOrInsert(['no_rawat' => $noRawat], $dataR);
                    }
                } catch (\Throwable $e) {
                }

                try {
                    if (\Illuminate\Support\Facades\Schema::hasTable('pcare_bpjs_log')) {
                        $meta = is_array($processed) ? ($processed['metaData'] ?? ($processed['metadata'] ?? [])) : [];
                        $metaCode = is_array($meta) ? (int) ($meta['code'] ?? 0) : null;
                        $metaMessage = is_array($meta) ? (string) ($meta['message'] ?? '') : null;
                        $statusLabel = $response->status() >= 200 && $response->status() < 300 ? 'success' : 'failed';
                        $reqPayload = $payload;
                        if (isset($reqPayload['noKartu'])) {
                            $card = (string) $reqPayload['noKartu'];
                            $reqPayload['noKartu_masked'] = substr($card, 0, 6).str_repeat('*', max(strlen($card) - 10, 0)).substr($card, -4);
                            unset($reqPayload['noKartu']);
                        }
                        try {
                            \Illuminate\Support\Facades\DB::table('pcare_bpjs_log')->insert([
                                'no_rawat' => $noRawat,
                                'endpoint' => 'kunjungan/v1',
                                'status' => $statusLabel,
                                'http_status' => $response->status(),
                                'meta_code' => $metaCode,
                                'meta_message' => $metaMessage,
                                'duration_ms' => $durationMs,
                                'request_payload' => json_encode($reqPayload),
                                'response_body_raw' => $response->body(),
                                'response_body_json' => is_array($processed) ? json_encode($processed) : null,
                                'triggered_by' => optional(\Illuminate\Support\Facades\Auth::user())->nik ?? (string) optional(\Illuminate\Support\Facades\Auth::user())->id ?? null,
                                'correlation_id' => $request->header('X-BPJS-LOG-ID') ?: null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        } catch (\Throwable $e) {
                        }
                    }
                } catch (\Throwable $e) {
                }
            }
        } catch (\Throwable $e) {
        }

        if (is_array($processed)) {
            return response()->json($processed, $response->status());
        }

        return response($processed, $response->status())
            ->header('Content-Type', 'application/json');
    }

    protected function parseNoKunjunganFromResponse(array $processed): ?string
    {
        if (isset($processed['response'])) {
            $resp = $processed['response'];
            if (is_array($resp)) {
                // Cek jika response adalah array dengan index [0] yang berisi field dan message
                if (isset($resp[0]) && is_array($resp[0])) {
                    if (($resp[0]['field'] ?? '') === 'noKunjungan' && ! empty($resp[0]['message'])) {
                        return (string) $resp[0]['message'];
                    }
                    if (! empty($resp[0]['noKunjungan'])) {
                        return (string) $resp[0]['noKunjungan'];
                    }
                }
                // Cek jika response langsung memiliki field dan message
                if (($resp['field'] ?? '') === 'noKunjungan' && ! empty($resp['message'])) {
                    return (string) $resp['message'];
                }
                // Cek jika response langsung memiliki noKunjungan
                if (! empty($resp['noKunjungan'])) {
                    return (string) $resp['noKunjungan'];
                }
                if (isset($resp['data']) && is_array($resp['data'])) {
                    $d = $resp['data'];
                    if (! empty($d['noKunjungan'])) {
                        return (string) $d['noKunjungan'];
                    }
                    if (isset($d[0]) && is_array($d[0]) && ! empty($d[0]['noKunjungan'])) {
                        return (string) $d[0]['noKunjungan'];
                    }
                    if (isset($d['kunjungan']) && is_array($d['kunjungan']) && ! empty($d['kunjungan']['noKunjungan'])) {
                        return (string) $d['kunjungan']['noKunjungan'];
                    }
                }
                if (! empty($resp['message'])) {
                    $m = (string) $resp['message'];
                    // Format: "112516160126Y001101" atau format serupa dengan pola angkaYangka
                    if (preg_match('/^[0-9]{10,}Y[0-9]{4,}$/', $m)) {
                        return $m;
                    }
                    if (preg_match('/\b([0-9]{10,}Y[0-9]{4,})\b/', $m, $mm)) {
                        return (string) $mm[1];
                    }
                }
            } elseif (is_string($resp) && $resp !== '') {
                $candidate = $this->parseNoKunjunganFromString($resp);
                if ($candidate !== null) {
                    return $candidate;
                }
                try {
                    $decodedResp = json_decode($resp, true);
                    if (is_array($decodedResp)) {
                        $candidate = $this->parseNoKunjunganFromResponse($decodedResp);
                        if ($candidate !== null) {
                            return $candidate;
                        }
                    }
                } catch (\Throwable $e) {
                }
            }
        }
        if (isset($processed['metaData']) && is_array($processed['metaData'])) {
            $m = (string) ($processed['metaData']['message'] ?? '');
            if ($m !== '') {
                // Format: "112516160126Y001101" atau format serupa
                if (preg_match('/^[0-9]{10,}Y[0-9]{4,}$/', $m)) {
                    return $m;
                }
                if (preg_match('/\b([0-9]{10,}Y[0-9]{4,})\b/', $m, $mm)) {
                    return (string) $mm[1];
                }
            }
        }
        if (isset($processed['metadata']) && is_array($processed['metadata'])) {
            $m = (string) ($processed['metadata']['message'] ?? '');
            if ($m !== '') {
                // Format: "112516160126Y001101" atau format serupa
                if (preg_match('/^[0-9]{10,}Y[0-9]{4,}$/', $m)) {
                    return $m;
                }
                if (preg_match('/\b([0-9]{10,}Y[0-9]{4,})\b/', $m, $mm)) {
                    return (string) $mm[1];
                }
            }
        }
        if (! empty($processed['noKunjungan'])) {
            return (string) $processed['noKunjungan'];
        }
        if (isset($processed['data']) && is_array($processed['data'])) {
            $d = $processed['data'];
            if (! empty($d['noKunjungan'])) {
                return (string) $d['noKunjungan'];
            }
            if (isset($d['response']) && is_array($d['response']) && ! empty($d['response']['noKunjungan'])) {
                return (string) $d['response']['noKunjungan'];
            }
        }
        $deep = $this->findNoKunjunganRecursive($processed);
        if ($deep !== null) {
            return $deep;
        }

        return null;
    }

    protected function parseNoKunjunganFromString(string $s): ?string
    {
        if ($s === '') {
            return null;
        }
        if (preg_match('/\b([0-9]{10,}Y[0-9]{4,})\b/', $s, $m)) {
            return (string) $m[1];
        }
        $j = null;
        try {
            $j = json_decode($s, true, 512, JSON_THROW_ON_ERROR);
        } catch (\Throwable $e) {
            $j = null;
        }
        if (is_array($j)) {
            return $this->parseNoKunjunganFromResponse($j);
        }

        return null;
    }

    protected function findNoKunjunganRecursive(array $data): ?string
    {
        foreach ($data as $k => $v) {
            $kk = strtolower((string) $k);
            if ($kk === 'nokunjungan' && is_string($v) && $v !== '') {
                return (string) $v;
            }
            if (is_array($v)) {
                $candidate = $this->findNoKunjunganRecursive($v);
                if ($candidate !== null) {
                    return $candidate;
                }
            }
        }

        return null;
    }

    protected function fillNoKunjunganFromDbIfMissing(string $noRawat): ?string
    {
        $candidate = null;

        // Prioritas 1: Cek dari pcare_bpjs_log (sumber utama karena selalu ada)
        if (\Illuminate\Support\Facades\Schema::hasTable('pcare_bpjs_log')) {
            try {
                $log = \Illuminate\Support\Facades\DB::table('pcare_bpjs_log')
                    ->where('no_rawat', $noRawat)
                    ->where('endpoint', 'kunjungan')
                    ->orderByDesc('created_at')
                    ->first();
                if ($log) {
                    // Coba parse dari response_body_json dulu (sudah di-decode)
                    $json = $log->response_body_json ?? null;
                    if ($json) {
                        if (is_string($json)) {
                            try {
                                $decoded = json_decode($json, true);
                                if (is_array($decoded)) {
                                    $candidate = $this->parseNoKunjunganFromResponse($decoded);
                                }
                            } catch (\Throwable $e) {
                                $candidate = $this->parseNoKunjunganFromString($json);
                            }
                        } elseif (is_array($json)) {
                            $candidate = $this->parseNoKunjunganFromResponse($json);
                        }
                    }

                    // Jika masih belum ketemu, coba dari response_body_raw
                    if ($candidate === null) {
                        $raw = (string) ($log->response_body_raw ?? '');
                        if ($raw !== '') {
                            $candidate = $this->parseNoKunjunganFromString($raw);
                        }
                    }
                }
            } catch (\Throwable $e) {
                Log::warning('Error saat mengambil noKunjungan dari pcare_bpjs_log', [
                    'no_rawat' => $noRawat,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        // Prioritas 2: Cek dari reg_periksa.response_pcare (jika field ada)
        if ($candidate === null) {
            try {
                if (\Illuminate\Support\Facades\Schema::hasColumn('reg_periksa', 'response_pcare')) {
                    $reg = \Illuminate\Support\Facades\DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
                    if ($reg && isset($reg->response_pcare) && is_string($reg->response_pcare) && $reg->response_pcare !== '') {
                        $candidate = $this->parseNoKunjunganFromString($reg->response_pcare);
                    }
                }
            } catch (\Throwable $e) {
            }
        }
        if ($candidate === null && \Illuminate\Support\Facades\Schema::hasTable('pcare_rujuk_subspesialis')) {
            try {
                $r = \Illuminate\Support\Facades\DB::table('pcare_rujuk_subspesialis')->where('no_rawat', $noRawat)->first();
                if ($r && ! empty($r->noKunjungan)) {
                    $candidate = (string) $r->noKunjungan;
                }
            } catch (\Throwable $e) {
            }
        }
        if ($candidate && \Illuminate\Support\Facades\Schema::hasTable('pcare_kunjungan_umum')) {
            try {
                \Illuminate\Support\Facades\DB::table('pcare_kunjungan_umum')
                    ->where('no_rawat', $noRawat)
                    ->update(['noKunjungan' => $candidate]);
            } catch (\Throwable $e) {
            }
        }

        return $candidate;
    }

    /**
     * Tampilkan data kunjungan dari DB berdasarkan nomor rawat.
     */
    public function show(string $noRawat)
    {
        try {
            $kunjungan = $this->getKunjunganData($noRawat);

            if (! $kunjungan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data kunjungan tidak ditemukan',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $kunjungan,
            ]);
        } catch (\Throwable $e) {
            Log::error('Error getting kunjungan data: '.$e->getMessage(), [
                'noRawat' => $noRawat,
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Kirim ulang data kunjungan ke BPJS PCare.
     * Body request menerima 'alasan' (string) untuk pencatatan audit.
     */
    public function kirimUlang(Request $request, string $noRawat)
    {
        try {
            $request->validate([
                'alasan' => 'required|string|max:255',
            ]);

            $kunjungan = $this->getKunjunganData($noRawat);
            if (! $kunjungan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data kunjungan tidak ditemukan',
                ], 404);
            }

            $pcareData = $this->preparePcareKunjunganData($kunjungan);
            $response = $this->sendKunjunganToPcare($pcareData);

            if ($response && $response['success']) {
                $this->updateKunjunganStatus($noRawat, 'sent', $response);

                Log::info('PCare kunjungan kirim ulang berhasil', [
                    'no_rawat' => $noRawat,
                    'noKunjungan' => $response['noKunjungan'] ?? null,
                    'message' => $response['message'] ?? null,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Data kunjungan berhasil dikirim ulang ke BPJS PCare',
                    'noKunjungan' => $response['noKunjungan'] ?? null,
                    'data' => $response,
                ]);
            }

            $errorMessage = $response['message'] ?? 'Gagal mengirim data ke BPJS PCare';

            return response()->json([
                'success' => false,
                'message' => $errorMessage,
                'data' => $response,
            ], 400);
        } catch (\Throwable $e) {
            Log::error('Error kirim ulang kunjungan: '.$e->getMessage(), [
                'noRawat' => $noRawat,
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Kirim ulang batch data kunjungan ke BPJS PCare.
     * Parameter: no_rawat[] (array string), alasan (string)
     */
    public function kirimUlangBatch(Request $request)
    {
        try {
            $request->validate([
                'no_rawat' => 'required|array',
                'no_rawat.*' => 'required|string',
                'alasan' => 'required|string|max:255',
            ]);

            $results = [];
            $successCount = 0;
            $failCount = 0;

            foreach ($request->no_rawat as $noRawat) {
                try {
                    $kunjungan = $this->getKunjunganData($noRawat);
                    if (! $kunjungan) {
                        $results[] = [
                            'no_rawat' => $noRawat,
                            'success' => false,
                            'message' => 'Data tidak ditemukan',
                        ];
                        $failCount++;

                        continue;
                    }

                    $pcareData = $this->preparePcareKunjunganData($kunjungan);
                    $response = $this->sendKunjunganToPcare($pcareData);

                    if ($response && $response['success']) {
                        $this->updateKunjunganStatus($noRawat, 'sent', $response);
                        $results[] = [
                            'no_rawat' => $noRawat,
                            'success' => true,
                            'message' => 'Berhasil dikirim',
                            'noKunjungan' => $response['noKunjungan'] ?? null,
                        ];
                        $successCount++;
                    } else {
                        $results[] = [
                            'no_rawat' => $noRawat,
                            'success' => false,
                            'message' => $response['message'] ?? 'Gagal dikirim ke PCare',
                        ];
                        $failCount++;
                    }
                } catch (\Throwable $e) {
                    $results[] = [
                        'no_rawat' => $noRawat,
                        'success' => false,
                        'message' => 'Error: '.$e->getMessage(),
                    ];
                    $failCount++;
                }
            }

            return response()->json([
                'success' => true,
                'message' => "Batch selesai. Berhasil: {$successCount}, Gagal: {$failCount}",
                'summary' => [
                    'total' => count($request->no_rawat),
                    'success' => $successCount,
                    'failed' => $failCount,
                ],
                'results' => $results,
            ]);
        } catch (\Throwable $e) {
            Log::error('Error kirim ulang batch: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Internal server error: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hapus Data Kunjungan (BPJS PCare Catalog)
     * Endpoint: DELETE /api/pcare/kunjungan/{noKunjungan}
     * Method: DELETE
     * Content-Type: application/json; charset=utf-8
     * Parameter: noKunjungan (di URL path)
     */
    public function destroy(string $noKunjungan)
    {
        $noKunjungan = trim($noKunjungan);

        if ($noKunjungan === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter noKunjungan wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        $start = microtime(true);

        try {
            // Endpoint sesuai katalog BPJS: DELETE /kunjungan/{noKunjungan}
            // Berbeda dengan PUT yang menggunakan /kunjungan/v1, DELETE menggunakan /kunjungan/{noKunjungan}
            $endpoint = 'kunjungan/'.$noKunjungan;
            $result = $this->pcareRequest('DELETE', $endpoint, [], null, [
                'Content-Type' => 'application/json; charset=utf-8',
            ]);
        } catch (\Illuminate\Http\Client\RequestException $e) {
            // Tangani error dari BPJS API
            $response = $e->response;
            $processed = $this->maybeDecryptAndDecompress($response->body(), time());

            $duration = round((microtime(true) - $start) * 1000, 2);

            // Simpan error response ke pcare_bpjs_log
            try {
                $metaCode = null;
                $metaMessage = null;
                $statusLabel = ($response->status() >= 200 && $response->status() < 300) ? 'success' : 'failed';

                if (is_array($processed)) {
                    $metaCode = $processed['metaData']['code'] ?? null;
                    $metaMessage = $processed['metaData']['message'] ?? null;
                }

                // Cari no_rawat dari pcare_kunjungan_umum berdasarkan noKunjungan
                $noRawatLog = null;
                try {
                    $kunjunganRecord = DB::table('pcare_kunjungan_umum')
                        ->where('noKunjungan', $noKunjungan)
                        ->first();
                    if ($kunjunganRecord && $kunjunganRecord->no_rawat) {
                        $noRawatLog = $kunjunganRecord->no_rawat;
                    }
                } catch (\Throwable $e) {
                    // Ignore jika tidak bisa mendapatkan no_rawat
                }

                DB::table('pcare_bpjs_log')->insert([
                    'no_rawat' => $noRawatLog,
                    'endpoint' => 'kunjungan',
                    'status' => $statusLabel,
                    'http_status' => $response->status(),
                    'meta_code' => $metaCode,
                    'meta_message' => $metaMessage,
                    'duration_ms' => $duration,
                    'request_payload' => json_encode(['noKunjungan' => $noKunjungan]),
                    'response_body_raw' => $response->body(),
                    'response_body_json' => is_array($processed) ? json_encode($processed, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null,
                    'triggered_by' => optional(\Illuminate\Support\Facades\Auth::user())->nik ?? (string) optional(\Illuminate\Support\Facades\Auth::user())->id ?? null,
                    'correlation_id' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } catch (\Throwable $logError) {
                Log::warning('Gagal menyimpan log error delete kunjungan ke pcare_bpjs_log', [
                    'noKunjungan' => $noKunjungan,
                    'error' => $logError->getMessage(),
                ]);
            }

            // Kembalikan response error dari BPJS dengan status code yang sesuai
            if (is_array($processed)) {
                return response()->json($processed, $response->status());
            }

            return response()->json([
                'metaData' => [
                    'message' => $e->getMessage(),
                    'code' => $response->status(),
                ],
            ], $response->status());
        } catch (\Throwable $e) {
            Log::error('Error delete kunjungan PCare', [
                'noKunjungan' => $noKunjungan,
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Internal server error: '.$e->getMessage(),
                    'code' => 500,
                ],
            ], 500);
        }

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        $duration = round((microtime(true) - $start) * 1000, 2);

        // Log request ke pcare_bpjs_log
        try {
            $metaCode = null;
            $metaMessage = null;
            $statusLabel = ($response->status() >= 200 && $response->status() < 300) ? 'success' : 'failed';

            if (is_array($processed)) {
                $metaCode = $processed['metaData']['code'] ?? null;
                $metaMessage = $processed['metaData']['message'] ?? null;
            }

            // Cari no_rawat dari pcare_kunjungan_umum berdasarkan noKunjungan
            $noRawatLog = null;
            try {
                $kunjunganRecord = DB::table('pcare_kunjungan_umum')
                    ->where('noKunjungan', $noKunjungan)
                    ->first();
                if ($kunjunganRecord && $kunjunganRecord->no_rawat) {
                    $noRawatLog = $kunjunganRecord->no_rawat;
                }
            } catch (\Throwable $e) {
                // Ignore jika tidak bisa mendapatkan no_rawat
            }

            DB::table('pcare_bpjs_log')->insert([
                'no_rawat' => $noRawatLog,
                'endpoint' => 'kunjungan',
                'status' => $statusLabel,
                'http_status' => $response->status(),
                'meta_code' => $metaCode,
                'meta_message' => $metaMessage,
                'duration_ms' => $duration,
                'request_payload' => json_encode(['noKunjungan' => $noKunjungan]),
                'response_body_raw' => $response->body(),
                'response_body_json' => is_array($processed) ? json_encode($processed, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null,
                'triggered_by' => optional(\Illuminate\Support\Facades\Auth::user())->nik ?? (string) optional(\Illuminate\Support\Facades\Auth::user())->id ?? null,
                'correlation_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (\Throwable $e) {
            Log::warning('Gagal menyimpan log delete kunjungan ke pcare_bpjs_log', [
                'noKunjungan' => $noKunjungan,
                'error' => $e->getMessage(),
            ]);
        }

        // Jika berhasil, update status di pcare_kunjungan_umum jika ada
        if ($response->status() >= 200 && $response->status() < 300) {
            try {
                if (\Illuminate\Support\Facades\Schema::hasTable('pcare_kunjungan_umum')) {
                    DB::table('pcare_kunjungan_umum')
                        ->where('noKunjungan', $noKunjungan)
                        ->update([
                            'status' => 'Dihapus',
                            'updated_at' => now(),
                        ]);
                }
            } catch (\Throwable $e) {
                Log::warning('Gagal update status kunjungan setelah delete', [
                    'noKunjungan' => $noKunjungan,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return response()->json($processed, $response->status());
    }

    /**
     * Ambil noKunjungan dari pcare_bpjs_log berdasarkan nomor rawat.
     * Endpoint: GET /api/pcare/kunjungan/nokunjungan/{no_rawat}
     */
    public function getNoKunjungan(string $noRawat)
    {
        try {
            $noRawat = trim($noRawat);
            if ($noRawat === '') {
                return response()->json([
                    'success' => false,
                    'message' => 'no_rawat tidak boleh kosong',
                    'noKunjungan' => null,
                ], 400);
            }

            // Cek dari pcare_kunjungan_umum dulu
            if (\Illuminate\Support\Facades\Schema::hasTable('pcare_kunjungan_umum')) {
                $kunjungan = DB::table('pcare_kunjungan_umum')
                    ->where('no_rawat', $noRawat)
                    ->whereNotNull('noKunjungan')
                    ->where('noKunjungan', '!=', '')
                    ->first();

                if ($kunjungan && ! empty($kunjungan->noKunjungan)) {
                    return response()->json([
                        'success' => true,
                        'noKunjungan' => (string) $kunjungan->noKunjungan,
                        'source' => 'pcare_kunjungan_umum',
                    ]);
                }
            }

            // Jika tidak ada, ambil dari pcare_bpjs_log
            if (\Illuminate\Support\Facades\Schema::hasTable('pcare_bpjs_log')) {
                $log = DB::table('pcare_bpjs_log')
                    ->where('no_rawat', $noRawat)
                    ->where('endpoint', 'kunjungan')
                    ->orderByDesc('created_at')
                    ->first();

                if ($log) {
                    $noKunjungan = null;

                    // Parse dari response_body_json
                    $json = $log->response_body_json ?? null;
                    if ($json) {
                        if (is_string($json)) {
                            try {
                                $decoded = json_decode($json, true);
                                if (is_array($decoded)) {
                                    $noKunjungan = $this->parseNoKunjunganFromResponse($decoded);
                                }
                            } catch (\Throwable $e) {
                                $noKunjungan = $this->parseNoKunjunganFromString($json);
                            }
                        } elseif (is_array($json)) {
                            $noKunjungan = $this->parseNoKunjunganFromResponse($json);
                        }
                    }

                    // Jika masih belum ketemu, coba dari response_body_raw
                    if ($noKunjungan === null) {
                        $raw = (string) ($log->response_body_raw ?? '');
                        if ($raw !== '') {
                            $noKunjungan = $this->parseNoKunjunganFromString($raw);
                        }
                    }

                    if ($noKunjungan) {
                        // Simpan ke pcare_kunjungan_umum jika belum ada
                        if (\Illuminate\Support\Facades\Schema::hasTable('pcare_kunjungan_umum')) {
                            try {
                                $existing = DB::table('pcare_kunjungan_umum')
                                    ->where('no_rawat', $noRawat)
                                    ->first();

                                if ($existing) {
                                    // Update jika noKunjungan masih null atau kosong
                                    if (empty($existing->noKunjungan) || $existing->noKunjungan === null) {
                                        DB::table('pcare_kunjungan_umum')
                                            ->where('no_rawat', $noRawat)
                                            ->update(['noKunjungan' => $noKunjungan]);
                                    }
                                }
                            } catch (\Throwable $e) {
                                Log::warning('Gagal update noKunjungan ke pcare_kunjungan_umum', [
                                    'no_rawat' => $noRawat,
                                    'noKunjungan' => $noKunjungan,
                                    'error' => $e->getMessage(),
                                ]);
                            }
                        }

                        return response()->json([
                            'success' => true,
                            'noKunjungan' => $noKunjungan,
                            'source' => 'pcare_bpjs_log',
                        ]);
                    }
                }
            }

            return response()->json([
                'success' => false,
                'message' => 'noKunjungan tidak ditemukan',
                'noKunjungan' => null,
            ], 404);
        } catch (\Throwable $e) {
            Log::error('Error mengambil noKunjungan', [
                'no_rawat' => $noRawat,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error: '.$e->getMessage(),
                'noKunjungan' => null,
            ], 500);
        }
    }

    /**
     * Preview payload kunjungan PCare berdasarkan nomor rawat tanpa mengirim ke BPJS.
     * Menggunakan helper preparePcareKunjunganData lalu mengembalikan JSON payload.
     */
    public function preview(string $noRawat)
    {
        try {
            $kunjungan = $this->getKunjunganData($noRawat);
            if (! $kunjungan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data kunjungan tidak ditemukan',
                ], 404);
            }

            $payload = $this->preparePcareKunjunganData($kunjungan);

            return response()->json([
                'success' => true,
                'payload' => $payload,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Ambil data kunjungan dari database.
     */
    private function getKunjunganData(string $noRawat)
    {
        try {
            $kunjungan = DB::table('reg_periksa')
                ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
                ->join('poliklinik', 'reg_periksa.kd_poli', '=', 'poliklinik.kd_poli')
                ->join('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
                ->leftJoin('maping_dokter_pcare', 'dokter.kd_dokter', '=', 'maping_dokter_pcare.kd_dokter')
                ->where('reg_periksa.no_rawat', $noRawat)
                ->select(
                    'reg_periksa.*',
                    'pasien.nm_pasien',
                    'pasien.no_peserta',
                    'pasien.no_ktp',
                    'pasien.tgl_lahir',
                    'pasien.jk',
                    'poliklinik.nm_poli',
                    'dokter.nm_dokter',
                    'maping_dokter_pcare.kd_dokter_pcare'
                )
                ->first();

            return $kunjungan;
        } catch (\Throwable $e) {
            Log::error('Error getting kunjungan from database: '.$e->getMessage());

            return null;
        }
    }

    /**
     * Bentuk data kunjungan sesuai format BPJS PCare (Add Kunjungan Update).
     * Content-Type: text/plain
     */
    private function preparePcareKunjunganData(object $kunjungan): array
    {
        // Ambil data pemeriksaan terbaru
        $pemeriksaanData = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $kunjungan->no_rawat)
            ->orderBy('tgl_perawatan', 'desc')
            ->orderBy('jam_rawat', 'desc')
            ->first();

        // Ambil diagnosa utama
        $diagnosaData = DB::table('diagnosa_pasien')
            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
            ->where('diagnosa_pasien.no_rawat', $kunjungan->no_rawat)
            ->where('diagnosa_pasien.prioritas', '1')
            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
            ->first();

        // Mapping poli ke KD PCare
        $mappingPoli = DB::table('maping_poliklinik_pcare')
            ->where('kd_poli_rs', $kunjungan->kd_poli)
            ->first();

        $kdPoliPcare = $mappingPoli ? $mappingPoli->kd_poli_pcare : null; // null bila tak ada mapping

        // Parse tensi menjadi sistole/diastole
        $sistole = 120;
        $diastole = 80;
        if ($pemeriksaanData && ! empty($pemeriksaanData->tensi) && strpos($pemeriksaanData->tensi, '/') !== false) {
            $tensiParts = explode('/', $pemeriksaanData->tensi);
            $sistole = (int) trim($tensiParts[0]) ?: 120;
            $diastole = (int) trim($tensiParts[1]) ?: 80;
        }

        // Terapi obat (string digabung)
        $terapiObatData = DB::table('resep_obat')
            ->join('resep_dokter', 'resep_obat.no_resep', '=', 'resep_dokter.no_resep')
            ->join('databarang', 'resep_dokter.kode_brng', '=', 'databarang.kode_brng')
            ->where('resep_obat.no_rawat', $kunjungan->no_rawat)
            ->select('databarang.nama_brng', 'resep_dokter.jml', 'resep_dokter.aturan_pakai')
            ->get();

        $terapiObatString = 'Tidak Ada';
        if ($terapiObatData->isNotEmpty()) {
            $terapiObatArray = [];
            foreach ($terapiObatData as $obat) {
                $terapiObatArray[] = $obat->nama_brng.' '.$obat->jml.' ['.$obat->aturan_pakai.']';
            }
            $terapiObatString = implode(', ', $terapiObatArray);
        }

        return [
            // Sesuai contoh katalog: gunakan null untuk field yang tidak ada
            'noKunjungan' => null,
            'noKartu' => (string) ($kunjungan->no_peserta ?? ''),
            'tglDaftar' => date('d-m-Y', strtotime($kunjungan->tgl_registrasi)),
            'kdPoli' => $kdPoliPcare ? (string) $kdPoliPcare : null,
            'keluhan' => (string) ($pemeriksaanData->keluhan ?? 'Tidak Ada'),
            'kdSadar' => '04', // Compos Mentis menurut referensi internal
            'sistole' => (int) $sistole,
            'diastole' => (int) $diastole,
            'beratBadan' => (float) ($pemeriksaanData->berat ?? 50),
            'tinggiBadan' => (float) ($pemeriksaanData->tinggi ?? 170),
            'respRate' => (int) ($pemeriksaanData->respirasi ?? 20),
            'heartRate' => (int) ($pemeriksaanData->nadi ?? 80),
            'lingkarPerut' => (float) ($pemeriksaanData->lingkar_perut ?? 0),
            'kdStatusPulang' => '4', // mengacu contoh katalog (4)
            'tglPulang' => date('d-m-Y'),
            'kdDokter' => (string) ($kunjungan->kd_dokter_pcare ?? ''),
            'kdDiag1' => (string) ($diagnosaData->kd_penyakit ?? 'Z00.0'),
            'kdDiag2' => null,
            'kdDiag3' => null,
            'kdPoliRujukInternal' => null,
            // rujuLanjut dapat diisi dari request bila ada; default null
            'rujukLanjut' => null,
            'kdTacc' => -1, // Sesuai Ref_TACC: -1 = "Tanpa TACC"
            'alasanTacc' => null,
            'anamnesa' => (string) ($pemeriksaanData->keluhan ?? 'Tidak Ada'),
            'alergiMakan' => '00',
            'alergiUdara' => '00',
            'alergiObat' => '00',
            'kdPrognosa' => '01', // sesuai contoh katalog: 01
            'terapiObat' => (string) $terapiObatString,
            'terapiNonObat' => (string) ($pemeriksaanData->instruksi ?? 'Edukasi Kesehatan'),
            'bmhp' => 'Tidak Ada',
            'suhu' => (string) ($pemeriksaanData->suhu_tubuh ?? '36,4'),
        ];
    }

    /**
     * Kirim data kunjungan ke PCare (POST /kunjungan, Content-Type: text/plain) dan proses respon.
     */
    private function sendKunjunganToPcare(array $data): array
    {
        try {
            Log::info('Sending kunjungan to PCare', ['payload_preview' => array_intersect_key($data, array_flip(['noKartu', 'tglDaftar', 'kdPoli', 'kdDokter', 'kdDiag1']))]);

            $result = $this->pcareRequest('POST', 'kunjungan/v1', [], $data, [
                'Content-Type' => 'application/json',
            ]);
            $response = $result['response'];
            $timestamp = $result['timestamp_used'];

            // Dekripsi/dekompresi bila perlu agar field metaData dan response terurai
            $processed = $this->maybeDecryptAndDecompress($response->body(), $timestamp);

            if (is_array($processed) && isset($processed['metaData'])) {
                $metaData = $processed['metaData'];
                // Sukses (HTTP 201) sesuai katalog
                if (($metaData['code'] ?? null) == '201' && isset($processed['response'])) {
                    $resp = $processed['response'];
                    // Respon kadang array berisi object pertama
                    $noKunjungan = null;
                    if (is_array($resp)) {
                        if (isset($resp[0]) && is_array($resp[0]) && isset($resp[0]['noKunjungan'])) {
                            $noKunjungan = $resp[0]['noKunjungan'];
                        } elseif (isset($resp['noKunjungan'])) {
                            $noKunjungan = $resp['noKunjungan'];
                        }
                    }

                    Log::info('PCare Kunjungan berhasil dikirim', [
                        'noKunjungan' => $noKunjungan,
                        'message' => $metaData['message'] ?? null,
                    ]);

                    return [
                        'success' => true,
                        'noKunjungan' => $noKunjungan,
                        'message' => $metaData['message'] ?? null,
                        'raw' => $processed,
                        'status' => $response->status(),
                    ];
                }

                Log::error('PCare Kunjungan error', [
                    'code' => $metaData['code'] ?? null,
                    'message' => $metaData['message'] ?? null,
                    'raw' => $processed,
                ]);

                return [
                    'success' => false,
                    'code' => $metaData['code'] ?? null,
                    'message' => $metaData['message'] ?? 'Unknown error',
                    'raw' => $processed,
                    'status' => $response->status(),
                ];
            }

            Log::error('PCare response invalid', ['body_excerpt' => substr($response->body() ?? '', 0, 500)]);

            return [
                'success' => false,
                'message' => 'Response invalid atau tidak sesuai format PCare',
                'status' => $response->status(),
            ];
        } catch (\Throwable $e) {
            Log::error('Error sending to PCare: '.$e->getMessage());

            return [
                'success' => false,
                'message' => 'Error: '.$e->getMessage(),
            ];
        }
    }

    /**
     * Update status kunjungan di tabel reg_periksa (sesuaikan skema bila berbeda).
     */
    private function updateKunjunganStatus(string $noRawat, string $status, ?array $response = null): void
    {
        try {
            DB::table('reg_periksa')
                ->where('no_rawat', $noRawat)
                ->update([
                    'status_pcare' => $status,
                    'response_pcare' => json_encode($response),
                    'updated_at' => now(),
                ]);
        } catch (\Throwable $e) {
            Log::error('Error updating kunjungan status: '.$e->getMessage());
        }
    }
}
