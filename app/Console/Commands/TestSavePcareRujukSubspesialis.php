<?php

namespace App\Console\Commands;

use App\Http\Controllers\Pcare\PcareController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TestSavePcareRujukSubspesialis extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:pcare-rujuk-subspesialis 
                            {no_rawat : Nomor rawat untuk testing}
                            {--no-kunjungan= : Nomor kunjungan dari BPJS (opsional)}
                            {--payload-json= : JSON payload untuk testing (opsional)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test menyimpan data rujukan subspesialis PCare ke tabel pcare_rujuk_subspesialis';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $noRawat = $this->argument('no_rawat');
        $noKunjungan = $this->option('no-kunjungan');
        $payloadJson = $this->option('payload-json');

        $this->info("Testing savePcareRujukSubspesialis untuk no_rawat: {$noRawat}");

        // Cek apakah tabel ada
        if (! Schema::hasTable('pcare_rujuk_subspesialis')) {
            $this->error('Tabel pcare_rujuk_subspesialis tidak ditemukan!');

            return Command::FAILURE;
        }

        // Cek apakah reg_periksa ada
        $reg = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
        if (! $reg) {
            $this->error("Data reg_periksa tidak ditemukan untuk no_rawat: {$noRawat}");

            return Command::FAILURE;
        }

        $this->info("✓ Data reg_periksa ditemukan: {$reg->no_rkm_medis}");

        // Buat payload contoh jika tidak diberikan
        if ($payloadJson) {
            $payload = json_decode($payloadJson, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->error('Invalid JSON payload: '.json_last_error_msg());

                return Command::FAILURE;
            }
        } else {
            // Buat payload contoh berdasarkan data yang ada
            $pasien = DB::table('pasien')->where('no_rkm_medis', $reg->no_rkm_medis)->first();
            $poli = $reg->kd_poli ? DB::table('poliklinik')->where('kd_poli', $reg->kd_poli)->first() : null;
            $dokter = $reg->kd_dokter ? DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->first() : null;

            // Ambil diagnosa pertama
            $diagnosa1 = DB::table('diagnosa_pasien')
                ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                ->where('diagnosa_pasien.no_rawat', $noRawat)
                ->where('diagnosa_pasien.prioritas', '1')
                ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                ->first();

            // Buat payload contoh dengan rujukan
            $payload = [
                'no_rawat' => $noRawat,
                'noKartu' => $pasien->no_peserta ?? '0001441909697',
                'kdPoli' => $reg->kd_poli ?? '001',
                'keluhan' => 'Pasien mengeluh sakit kepala',
                'kdSadar' => '01',
                'kdStatusPulang' => '4', // Rujuk Vertikal
                'kdDokter' => $reg->kd_dokter ?? null,
                'kdDiag1' => $diagnosa1->kd_penyakit ?? null,
                'tglDaftar' => $reg->tgl_registrasi ?? date('Y-m-d'),
                'tglPulang' => date('Y-m-d'),
                'rujukLanjut' => [
                    'kdppk' => '11251616', // Contoh kode PPK
                    'tglEstRujuk' => date('d-m-Y', strtotime('+7 days')),
                    'subSpesialis' => [
                        'kdSubSpesialis1' => '65', // Contoh subspesialis MATA
                        'kdSarana' => '1', // Rawat Jalan
                    ],
                ],
                'kdTacc' => -1,
                'alergiMakan' => '00',
                'alergiUdara' => '00',
                'alergiObat' => '00',
                'kdPrognosa' => '01',
            ];

            $this->info('✓ Payload contoh dibuat');
            $this->line('Payload: '.json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        }

        // Jika noKunjungan tidak diberikan, buat contoh
        if (! $noKunjungan) {
            $noKunjungan = '112516161125Y001193'; // Contoh noKunjungan
            $this->warn("Menggunakan noKunjungan contoh: {$noKunjungan}");
        }

        // Panggil fungsi savePcareRujukSubspesialis
        try {
            $controller = new PcareController;
            $reflection = new \ReflectionClass($controller);
            $method = $reflection->getMethod('savePcareRujukSubspesialis');
            $method->setAccessible(true);

            $this->info("\nMemanggil savePcareRujukSubspesialis...");

            // Enable error reporting untuk menangkap semua error
            $oldErrorReporting = error_reporting(E_ALL);
            $oldDisplayErrors = ini_get('display_errors');
            ini_set('display_errors', '1');

            try {
                $method->invoke($controller, $noRawat, $payload, $noKunjungan);
                $this->info('✓ Fungsi savePcareRujukSubspesialis dipanggil tanpa error');
            } catch (\Throwable $e) {
                $this->error('Error saat memanggil fungsi: '.$e->getMessage());
                $this->error('File: '.$e->getFile().':'.$e->getLine());
                throw $e;
            } finally {
                error_reporting($oldErrorReporting);
                ini_set('display_errors', $oldDisplayErrors);
            }

            // Tunggu sebentar untuk memastikan query selesai
            sleep(1);

            // Cek hasil di database
            $saved = DB::table('pcare_rujuk_subspesialis')
                ->where('no_rawat', $noRawat)
                ->first();

            if ($saved) {
                $this->info("\n✓ Data berhasil disimpan ke tabel pcare_rujuk_subspesialis:");
                $this->table(
                    ['Field', 'Value'],
                    [
                        ['no_rawat', $saved->no_rawat ?? '-'],
                        ['noKunjungan', $saved->noKunjungan ?? '-'],
                        ['nm_pasien', $saved->nm_pasien ?? '-'],
                        ['noKartu', $saved->noKartu ?? '-'],
                        ['kdPPK', $saved->kdPPK ?? '-'],
                        ['nmPPK', $saved->nmPPK ?? '-'],
                        ['kdSubSpesialis', $saved->kdSubSpesialis ?? '-'],
                        ['nmSubSpesialis', $saved->nmSubSpesialis ?? '-'],
                        ['kdSarana', $saved->kdSarana ?? '-'],
                        ['nmSarana', $saved->nmSarana ?? '-'],
                        ['tglEstRujuk', $saved->tglEstRujuk ?? '-'],
                        ['kdDiag1', $saved->kdDiag1 ?? '-'],
                        ['nmDiag1', $saved->nmDiag1 ?? '-'],
                    ]
                );
            } else {
                $this->warn("\n⚠ Data tidak ditemukan di tabel setelah penyimpanan.");
                $this->line('Mencoba cek log untuk error detail...');

                // Cek log terakhir
                $logFile = storage_path('logs/laravel-'.date('Y-m-d').'.log');
                if (file_exists($logFile)) {
                    $logContent = file_get_contents($logFile);
                    $lines = explode("\n", $logContent);
                    $recentLines = array_slice($lines, -10);
                    $errorLines = array_filter($recentLines, function ($line) {
                        return stripos($line, 'error') !== false ||
                               stripos($line, 'pcare_rujuk_subspesialis') !== false ||
                               stripos($line, 'Exception') !== false;
                    });

                    if (! empty($errorLines)) {
                        $this->warn('Error terakhir di log:');
                        foreach ($errorLines as $line) {
                            $this->line($line);
                        }
                    }
                }

                // Cek struktur tabel dan kolom yang tersedia
                $this->line("\nMencoba cek struktur tabel...");
                try {
                    $columns = Schema::getColumnListing('pcare_rujuk_subspesialis');
                    $this->info('Kolom yang tersedia di tabel: '.implode(', ', array_slice($columns, 0, 10)).(count($columns) > 10 ? '...' : ''));

                    // Cek apakah ada masalah dengan kolom yang digunakan
                    $this->line("\nMencoba insert langsung untuk debugging...");
                    $testData = [
                        'no_rawat' => $noRawat,
                        'noKunjungan' => $noKunjungan,
                        'nm_pasien' => 'TEST',
                    ];
                    DB::table('pcare_rujuk_subspesialis')->insert($testData);
                    $this->info('✓ Insert langsung berhasil, kemungkinan masalah di safeUpsert');
                    // Hapus data test
                    DB::table('pcare_rujuk_subspesialis')->where('no_rawat', $noRawat)->delete();

                    // Coba updateOrInsert langsung
                    $this->line("\nMencoba updateOrInsert langsung...");
                    $updateData = [
                        'no_rawat' => $noRawat,
                        'noKunjungan' => $noKunjungan,
                        'nm_pasien' => 'TEST UPDATE',
                        'noKartu' => '0001441909697',
                    ];
                    DB::table('pcare_rujuk_subspesialis')->updateOrInsert(
                        ['no_rawat' => $noRawat],
                        $updateData
                    );
                    $check = DB::table('pcare_rujuk_subspesialis')->where('no_rawat', $noRawat)->first();
                    if ($check) {
                        $this->info('✓ updateOrInsert langsung berhasil!');
                        $this->line("Data tersimpan: noKunjungan={$check->noKunjungan}, nm_pasien={$check->nm_pasien}");
                        // Hapus data test
                        DB::table('pcare_rujuk_subspesialis')->where('no_rawat', $noRawat)->delete();
                    }
                } catch (\Exception $e) {
                    $this->error('✗ Error: '.$e->getMessage());
                    $this->error('File: '.$e->getFile().':'.$e->getLine());
                }
            }

            return Command::SUCCESS;
        } catch (\Throwable $e) {
            $this->error('Error: '.$e->getMessage());
            $this->error('Trace: '.$e->getTraceAsString());

            return Command::FAILURE;
        }
    }
}
