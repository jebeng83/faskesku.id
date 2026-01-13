<?php

namespace App\Console\Commands;

use App\Traits\BpjsTraits;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ParsePcareKunjunganLog extends Command
{
    use BpjsTraits;

    protected $signature = 'pcare:parse-kunjungan-log {--file=} {--endpoint=kunjungan/v1} {--search-back=100}';

    protected $description = 'Parse log PCare kunjungan dan update noKunjungan ke pcare_kunjungan_umum';

    public function handle(): int
    {
        $fileOpt = (string) $this->option('file');
        $endpoint = (string) $this->option('endpoint');
        $searchBack = (int) $this->option('search-back');
        $file = $fileOpt !== '' ? $fileOpt : storage_path('logs/bpjs-'.date('Y-m-d').'.log');
        if (! file_exists($file)) {
            $this->error('Log file tidak ditemukan: '.$file);

            return 1;
        }

        $lines = @file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (! is_array($lines) || empty($lines)) {
            $this->error('Log kosong atau gagal dibaca');

            return 1;
        }

        $reqJson = null;
        $respJson = null;
        $reqIndex = -1;
        for ($i = count($lines) - 1; $i >= 0; $i--) {
            $line = (string) $lines[$i];
            if (strpos($line, 'PCare request') !== false && strpos($line, $endpoint) !== false) {
                $pos = strpos($line, '{');
                $json = $pos !== false ? substr($line, $pos) : '';
                $tmp = $json !== '' ? json_decode($json, true) : null;
                if (is_array($tmp)) {
                    $reqJson = $tmp;
                    $reqIndex = $i;
                }
                break;
            }
        }

        if (! is_array($reqJson)) {
            $this->error('Tidak menemukan log request untuk '.$endpoint);

            return 1;
        }

        for ($j = $reqIndex + 1; $j < count($lines) && $j < $reqIndex + $searchBack; $j++) {
            $line = (string) $lines[$j];
            if (strpos($line, 'PCare response') !== false && strpos($line, $endpoint) !== false) {
                $pos = strpos($line, '{');
                $json = $pos !== false ? substr($line, $pos) : '';
                $tmp = $json !== '' ? json_decode($json, true) : null;
                if (is_array($tmp)) {
                    $respJson = $tmp;
                }
                break;
            }
        }

        if (! is_array($respJson)) {
            $this->error('Tidak menemukan log response untuk '.$endpoint);

            return 1;
        }

        $payloadStr = (string) ($reqJson['body_preview'] ?? '');
        $payload = $payloadStr !== '' ? json_decode($payloadStr, true) : [];
        $noRawat = is_array($payload) ? (string) ($payload['no_rawat'] ?? '') : '';

        $bodyExcerpt = (string) ($respJson['body_excerpt'] ?? '');
        $timestamp = (string) ($respJson['timestamp_used'] ?? '');
        if ($bodyExcerpt === '' || $timestamp === '') {
            $this->error('Body atau timestamp tidak tersedia pada log response');

            return 1;
        }

        $processed = $this->maybeDecryptAndDecompress($bodyExcerpt, $timestamp);

        $noKunjungan = $this->findNoKunjungan($processed);
        if ($noKunjungan === null) {
            $noKunjungan = $this->findNoKunjunganFromMessage($processed);
        }
        if ($noKunjungan === null && is_array($respJson) && isset($respJson['headers_excerpt'])) {
            $hx = $respJson['headers_excerpt'];
            if (is_array($hx)) {
                $loc = '';
                if (! empty($hx['Location']) && is_string($hx['Location'])) {
                    $loc = (string) $hx['Location'];
                } elseif (! empty($hx['location']) && is_string($hx['location'])) {
                    $loc = (string) $hx['location'];
                }
                if ($loc !== '') {
                    $cand = $this->findNoKunjunganFromMessage(['metaData' => ['message' => $loc]]);
                    if ($cand === null) {
                        $cand = $this->parseFromString($loc);
                    }
                    if ($cand !== null) {
                        $noKunjungan = $cand;
                    }
                }
            }
        }

        $this->line('no_rawat: '.($noRawat !== '' ? $noRawat : '(tidak ada)'));
        $this->line('noKunjungan: '.($noKunjungan !== null ? $noKunjungan : '(tidak ditemukan)'));

        if ($noRawat !== '' && $noKunjungan !== null && Schema::hasTable('pcare_kunjungan_umum')) {
            $exists = DB::table('pcare_kunjungan_umum')->where('no_rawat', $noRawat)->exists();
            if ($exists) {
                DB::table('pcare_kunjungan_umum')->where('no_rawat', $noRawat)->update(['noKunjungan' => $noKunjungan]);
                $row = DB::table('pcare_kunjungan_umum')->where('no_rawat', $noRawat)->first();
                $stored = $row && isset($row->noKunjungan) ? (string) $row->noKunjungan : '';
                $this->info('Update tersimpan: '.$stored);
            } else {
                $this->warn('Baris pcare_kunjungan_umum tidak ditemukan untuk no_rawat '.$noRawat);
            }
        } else {
            $this->warn('Skip update DB');
            if ($noRawat !== '' && Schema::hasTable('pcare_kunjungan_umum')) {
                $row = DB::table('pcare_kunjungan_umum')->where('no_rawat', $noRawat)->first();
                $stored = $row && isset($row->noKunjungan) ? (string) $row->noKunjungan : '';
                $this->line('noKunjungan di DB: '.($stored !== '' ? $stored : '(null)'));
            }
        }

        if (($noKunjungan === null || $noKunjungan === '') && $noRawat !== '') {
            if (Schema::hasTable('reg_periksa') && Schema::hasColumn('reg_periksa', 'response_pcare')) {
                $reg = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
                $resp = $reg && isset($reg->response_pcare) ? (string) $reg->response_pcare : '';
                if ($resp !== '') {
                    $decoded = json_decode($resp, true);
                    $fromReg = $this->findNoKunjungan($decoded);
                    if ($fromReg !== null && Schema::hasTable('pcare_kunjungan_umum')) {
                        $exists = DB::table('pcare_kunjungan_umum')->where('no_rawat', $noRawat)->exists();
                        if ($exists) {
                            DB::table('pcare_kunjungan_umum')->where('no_rawat', $noRawat)->update(['noKunjungan' => $fromReg]);
                            $this->info('Update dari reg_periksa: '.$fromReg);
                        } else {
                            $this->line('Temuan dari reg_periksa: '.$fromReg);
                        }
                    }
                }
            }
        }

        return 0;
    }

    protected function findNoKunjungan($data): ?string
    {
        if (is_array($data)) {
            foreach ($data as $k => $v) {
                $kk = is_string($k) ? strtolower($k) : '';
                if ($kk === 'nokunjungan' && is_string($v) && $v !== '') {
                    return (string) $v;
                }
                $c = $this->findNoKunjungan($v);
                if ($c !== null) {
                    return $c;
                }
            }
        }

        return null;
    }

    protected function findNoKunjunganFromMessage($data): ?string
    {
        $msg = null;
        if (is_array($data) && isset($data['metaData']) && is_array($data['metaData']) && isset($data['metaData']['message']) && is_string($data['metaData']['message'])) {
            $msg = (string) $data['metaData']['message'];
        }
        if ($msg === null && is_array($data) && isset($data['response']) && is_array($data['response']) && isset($data['response']['metaData']) && is_array($data['response']['metaData']) && isset($data['response']['metaData']['message']) && is_string($data['response']['metaData']['message'])) {
            $msg = (string) $data['response']['metaData']['message'];
        }
        if (is_string($msg) && $msg !== '') {
            if (preg_match('/\b([0-9]{10,}Y[0-9]{4,})\b/', $msg, $m)) {
                return (string) ($m[1] ?? '');
            }
        }

        return null;
    }

    protected function parseFromString(string $s): ?string
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
            return $this->findNoKunjungan($j);
        }

        return null;
    }
}
