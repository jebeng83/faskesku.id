<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class UpdateSettingFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'setting:update-files 
                            {nama_instansi : Nama instansi yang akan di-update}
                            {--wallpaper= : Path ke file wallpaper}
                            {--logo= : Path ke file logo}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update wallpaper dan logo untuk setting aplikasi dari file lokal';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $namaInstansi = $this->argument('nama_instansi');
        $wallpaperPath = $this->option('wallpaper');
        $logoPath = $this->option('logo');

        if (! $wallpaperPath && ! $logoPath) {
            $this->error('Harus menyediakan minimal satu file (--wallpaper atau --logo)');

            return Command::FAILURE;
        }

        if (! Schema::hasTable('setting')) {
            $this->error('Tabel `setting` tidak ditemukan');

            return Command::FAILURE;
        }

        // Cek apakah record ada
        $record = DB::table('setting')->where('nama_instansi', $namaInstansi)->first();
        if (! $record) {
            $this->error("Record dengan nama_instansi '{$namaInstansi}' tidak ditemukan");

            return Command::FAILURE;
        }

        $payload = [];

        // Handle wallpaper
        if ($wallpaperPath) {
            // Normalize path (hapus double slash)
            $wallpaperPath = str_replace('//', '/', $wallpaperPath);

            if (! file_exists($wallpaperPath)) {
                $this->error("File wallpaper tidak ditemukan: {$wallpaperPath}");

                return Command::FAILURE;
            }

            $wallpaperContent = file_get_contents($wallpaperPath);
            if ($wallpaperContent === false) {
                $this->error("Gagal membaca file wallpaper: {$wallpaperPath}");

                return Command::FAILURE;
            }

            $payload['wallpaper'] = $wallpaperContent;
            $this->info('Wallpaper loaded: '.number_format(strlen($wallpaperContent)).' bytes');
        }

        // Handle logo
        if ($logoPath) {
            // Normalize path (hapus double slash)
            $logoPath = str_replace('//', '/', $logoPath);

            if (! file_exists($logoPath)) {
                $this->error("File logo tidak ditemukan: {$logoPath}");

                return Command::FAILURE;
            }

            $logoContent = file_get_contents($logoPath);
            if ($logoContent === false) {
                $this->error("Gagal membaca file logo: {$logoPath}");

                return Command::FAILURE;
            }

            $payload['logo'] = $logoContent;
            $this->info('Logo loaded: '.number_format(strlen($logoContent)).' bytes');
        }

        // Sanitize payload (skip blob fields)
        $payload = $this->sanitizePayload($payload);

        // Map kolom opsional sesuai ketersediaan di DB
        $payload = $this->mapLegacyPayload($payload);

        try {
            $updated = DB::table('setting')
                ->where('nama_instansi', $namaInstansi)
                ->update($payload);

            if ($updated > 0) {
                $updatedFiles = [];
                if (isset($payload['wallpaper'])) {
                    $updatedFiles[] = 'wallpaper';
                }
                if (isset($payload['logo'])) {
                    $updatedFiles[] = 'logo';
                }

                $this->info('✓ Berhasil update '.implode(' dan ', $updatedFiles)." untuk '{$namaInstansi}'");

                Log::info('UpdateSettingFiles: Files updated via command', [
                    'nama_instansi' => $namaInstansi,
                    'updated_files' => $updatedFiles,
                ]);

                return Command::SUCCESS;
            } else {
                $this->warn('Tidak ada data yang di-update');

                return Command::FAILURE;
            }
        } catch (\Throwable $e) {
            $this->error('Error: '.$e->getMessage());
            Log::error('UpdateSettingFiles failed', [
                'nama_instansi' => $namaInstansi,
                'message' => $e->getMessage(),
            ]);

            return Command::FAILURE;
        }
    }

    /**
     * Sanitize payload - skip blob fields
     */
    protected function sanitizePayload(array $payload): array
    {
        // Untuk command ini, kita hanya update blob, jadi tidak perlu sanitize string
        return $payload;
    }

    /**
     * Map payload untuk kolom opsional legacy
     */
    protected function mapLegacyPayload(array $payload): array
    {
        // Hapus kolom yang tidak tersedia di tabel
        $availableColumns = [
            'nama_instansi', 'alamat_instansi', 'kabupaten', 'propinsi',
            'kontak', 'email', 'aktifkan', 'kode_ppk',
            'kode_ppkinkhealth', 'kode_ppkinhealth', 'kode_ppkkemenkes',
            'wallpaper', 'logo',
        ];

        foreach ($payload as $key => $value) {
            if (! in_array($key, $availableColumns, true)) {
                unset($payload[$key]);
            } elseif (! Schema::hasColumn('setting', $key)) {
                unset($payload[$key]);
            }
        }

        return $payload;
    }
}
