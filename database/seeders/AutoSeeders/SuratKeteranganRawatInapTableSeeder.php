<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratKeteranganRawatInapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_keterangan_rawat_inap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_keterangan_rawat_inap')->insert([
            0 => [
                'no_surat' => 'SKR20250819001',
                'no_rawat' => '2025/08/19/000002',
                'tanggalawal' => '2025-08-19',
                'tanggalakhir' => '2025-08-19',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
