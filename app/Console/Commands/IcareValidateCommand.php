<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Traits\BpjsTraits;

class IcareValidateCommand extends Command
{
    use BpjsTraits;

    protected $signature = 'debug:icare-validate {nokartu}';
    protected $description = 'Uji panggilan Icare API validate dan tampilkan hasil decode';

    public function handle(): int
    {
        $nokartu = (string) $this->argument('nokartu');
        if ($nokartu === '') {
            $this->error('Nomor kartu BPJS wajib diisi');
            return static::FAILURE;
        }

        $endpoint = 'api/pcare/validate';
        $payload = ['param' => $nokartu];
        try {
            $result = $this->icareRequest('POST', $endpoint, [], $payload);
            $response = $result['response'];
            $raw = $response->body();
            $decoded = $this->maybeDecryptAndDecompressIcare($raw, $result['timestamp_used']);

            $output = [
                'ok' => $response->successful(),
                'status' => $response->status(),
                'endpoint' => $result['url'],
                'headers_used' => $result['headers_used'],
                'data' => $decoded,
                'raw' => (function () use ($response, $raw) {
                    $j = null; try { $j = $response->json(); } catch (\Throwable $e) {}
                    return $j ?? $raw;
                })(),
            ];

            $this->line(json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            return static::SUCCESS;
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('Icare CLI error', [
                'endpoint' => $endpoint,
                'nokartu' => $nokartu,
                'error' => $e->getMessage(),
            ]);

            $this->error('Gagal koneksi Icare: '.$e->getMessage());
            return static::FAILURE;
        }
    }
}

