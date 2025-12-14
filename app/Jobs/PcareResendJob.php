<?php

namespace App\Jobs;

use App\Traits\BpjsTraits;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class PcareResendJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, BpjsTraits;

    public $tries = 3;

    public function backoff()
    {
        return [60, 300, 900];
    }

    protected string $noRawat;

    public function __construct(string $noRawat)
    {
        $this->noRawat = $noRawat;
    }

    public function handle(): void
    {
        $lock = Cache::lock('pcare_resend_'.$this->noRawat, 60);
        if (! $lock->get()) {
            return;
        }

        try {
            $reg = DB::table('reg_periksa')->where('no_rawat', $this->noRawat)->first();
            if (! $reg) {
                return;
            }
            $pasien = DB::table('pasien')->where('no_rkm_medis', $reg->no_rkm_medis)->first();
            if (! $pasien) {
                return;
            }
            $noKartu = preg_replace('/[^0-9]/', '', (string) ($pasien->no_peserta ?? ''));
            if ($noKartu === '' || ! preg_match('/^\d{13}$/', $noKartu)) {
                return;
            }
            $kdPoliRs = (string) ($reg->kd_poli ?? '');
            $mapPoli = $kdPoliRs !== '' ? DB::table('maping_poliklinik_pcare')->where('kd_poli_rs', $kdPoliRs)->value('kd_poli_pcare') : null;
            $kdPoli = $mapPoli ?: $kdPoliRs ?: '021';
            $tglYmd = (string) ($reg->tgl_registrasi ?? date('Y-m-d'));
            $dt = new \DateTime($tglYmd);
            $tglDaftar = $dt->format('d-m-Y');

            $cfg = $this->pcareConfig();
            $payload = [
                'kdProviderPeserta' => $cfg['kode_ppk'] ?? env('BPJS_PCARE_KODE_PPK'),
                'tglDaftar' => $tglDaftar,
                'noKartu' => $noKartu,
                'kdPoli' => $kdPoli,
                'keluhan' => 'Konsultasi Kesehatan',
                'kunjSakit' => false,
                'sistole' => '0',
                'diastole' => '0',
                'beratBadan' => '0',
                'tinggiBadan' => '0',
                'respRate' => '0',
                'lingkarPerut' => '0',
                'heartRate' => '0',
                'rujukBalik' => '0',
                'kdTkp' => '10',
            ];

            $timestampUsed = $this->generateTimestamp();
            $processed = null;
            $response = null;
            try {
                $result = $this->pcareRequest('POST', 'pendaftaran', [], $payload, ['Content-Type' => 'text/plain'], $timestampUsed);
                $response = $result['response'];
                $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
            } catch (\Throwable $reqEx) {
                try {
                    $cfg = $this->pcareConfig();
                    $headers = array_merge($this->buildPcareHeaders($timestampUsed), ['Content-Type' => 'text/plain']);
                    $url = rtrim((string) ($cfg['base_url'] ?? ''), '/').'/pendaftaran';
                    $json = json_encode($payload);
                    $response = Http::withHeaders($headers)->withBody($json ?: '{}', 'text/plain')->post($url);
                    $processed = $this->maybeDecryptAndDecompress($response->body(), $timestampUsed);
                    Log::channel('bpjs')->error('Resend fallback captured response', [
                        'no_rawat' => $this->noRawat,
                        'http_status' => $response->status(),
                    ]);
                } catch (\Throwable $inner) {
                    Log::channel('bpjs')->error('Resend fallback failed', [
                        'no_rawat' => $this->noRawat,
                        'error' => $inner->getMessage(),
                    ]);
                }
            }

            $noKunjungan = null;
            if (is_array($processed)) {
                if (isset($processed['response']['noKunjungan'])) {
                    $noKunjungan = (string) $processed['response']['noKunjungan'];
                } elseif (isset($processed['noKunjungan'])) {
                    $noKunjungan = (string) $processed['noKunjungan'];
                }
            }
            $status = ($response && $response->status() === 201) ? 'Terkirim' : 'Gagal';

            try {
                $encodedProcessed = is_array($processed) ? json_encode($processed) : (string) $processed;
                if ($encodedProcessed !== null) {
                    Cache::put('pcare_resend_raw_'.$this->noRawat, $encodedProcessed, 600);
                    try {
                        Storage::disk('local')->put('pcare_resend/'.$this->noRawat.'.json', $encodedProcessed);
                    } catch (\Throwable $fe) {
                    }
                }
            } catch (\Throwable $e) {
            }

            if (Schema::hasTable('pcare_kunjungan_umum')) {
                DB::table('pcare_kunjungan_umum')->updateOrInsert(
                    ['no_rawat' => $this->noRawat],
                    [
                        'noKunjungan' => $noKunjungan,
                        'tglDaftar' => date('Y-m-d', strtotime($tglYmd)),
                        'no_rkm_medis' => $reg->no_rkm_medis ?? null,
                        'noKartu' => $noKartu,
                        'kdPoli' => $kdPoli,
                        'status' => $status,
                    ]
                );
            }

            $update = [];
            if (Schema::hasColumn('reg_periksa', 'status_pcare')) {
                $update['status_pcare'] = strtolower($status) === 'terkirim' ? 'sent' : 'failed';
            }
            if (Schema::hasColumn('reg_periksa', 'response_pcare')) {
                $update['response_pcare'] = is_array($processed) ? json_encode($processed) : (string) $processed;
            }
            if (! empty($update)) {
                DB::table('reg_periksa')->where('no_rawat', $this->noRawat)->update($update);
            }
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('Resend job error', ['no_rawat' => $this->noRawat, 'error' => $e->getMessage()]);
        } finally {
            try {
                $lock->release();
            } catch (\Throwable $e) {
            }
        }
    }
}
