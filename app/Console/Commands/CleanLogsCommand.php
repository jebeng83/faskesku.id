<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CleanLogsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'logs:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Menghapus log lama dan menyisakan 5 log terakhir, lalu mengosongkan laravel.log';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $logsPath = storage_path('logs');

        if (! File::exists($logsPath)) {
            $this->error('Direktori logs tidak ditemukan.');

            return Command::FAILURE;
        }

        // Ambil semua file log kecuali .gitignore
        $logFiles = collect(File::files($logsPath))
            ->filter(function ($file) {
                return $file->getExtension() === 'log' ||
                       str_starts_with($file->getFilename(), 'laravel');
            })
            ->sortByDesc(function ($file) {
                return $file->getMTime();
            })
            ->values();

        $totalFiles = $logFiles->count();

        if ($totalFiles <= 5) {
            $this->info("Hanya ada {$totalFiles} file log. Tidak ada yang perlu dihapus.");
        } else {
            // Hapus semua kecuali 5 terakhir
            $filesToDelete = $logFiles->slice(5);
            $deletedCount = 0;

            foreach ($filesToDelete as $file) {
                try {
                    File::delete($file->getPathname());
                    $deletedCount++;
                    $this->line("Menghapus: {$file->getFilename()}");
                } catch (\Exception $e) {
                    $this->warn("Gagal menghapus {$file->getFilename()}: {$e->getMessage()}");
                }
            }

            $this->info("Berhasil menghapus {$deletedCount} file log lama.");
        }

        // Kosongkan laravel.log
        $laravelLogPath = storage_path('logs/laravel.log');
        if (File::exists($laravelLogPath)) {
            try {
                File::put($laravelLogPath, '');
                $this->info('laravel.log telah dikosongkan.');
            } catch (\Exception $e) {
                $this->error("Gagal mengosongkan laravel.log: {$e->getMessage()}");

                return Command::FAILURE;
            }
        } else {
            $this->warn('laravel.log tidak ditemukan.');
        }

        $this->info('Pembersihan log selesai.');

        return Command::SUCCESS;
    }
}
