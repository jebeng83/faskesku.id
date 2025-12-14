<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratKeteranganSehatTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_keterangan_sehat')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_keterangan_sehat')->insert([
            0 => [
                'no_surat' => 'SKD20250825001',
                'no_rawat' => '2025/08/25/000001',
                'tanggalsurat' => '2025-08-25',
                'berat' => '121',
                'tinggi' => '1',
                'tensi' => '1',
                'suhu' => '1',
                'butawarna' => 'Tidak',
                'keperluan' => '1',
                'kesimpulan' => 'Sehat',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
