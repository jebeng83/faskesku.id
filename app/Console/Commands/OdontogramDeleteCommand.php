<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Odontogram\Odontogram;

class OdontogramDeleteCommand extends Command
{
    protected $signature = 'debug:odontogram-delete {rm : No Rekam Medis} {tanggal : Tanggal (YYYY-MM-DD)} {elemen : Elemen gigi (FDI)}';

    protected $description = 'Hapus satu entri odontogram berdasarkan pasien, tanggal, dan elemen gigi';

    public function handle(): int
    {
        $rm = (string) $this->argument('rm');
        $tanggal = (string) $this->argument('tanggal');
        $elemen = (int) $this->argument('elemen');

        $deleted = Odontogram::where('no_rkm_medis', $rm)
            ->whereDate('tanggal', $tanggal)
            ->where('elemen_gigi', $elemen)
            ->delete();

        if ($deleted === 0) {
            $this->error('Data tidak ditemukan');
            return self::FAILURE;
        }

        $this->info('Berhasil menghapus entri odontogram');
        return self::SUCCESS;
    }
}
