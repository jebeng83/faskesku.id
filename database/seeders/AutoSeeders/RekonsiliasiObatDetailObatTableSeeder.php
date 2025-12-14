<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RekonsiliasiObatDetailObatTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rekonsiliasi_obat_detail_obat')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rekonsiliasi_obat_detail_obat')->insert([
            0 => [
                'no_rekonsiliasi' => 'RO202508050001',
                'nama_obat' => 'TES',
                'dosis_obat' => '1',
                'frekuensi' => '1',
                'cara_pemberian' => '1',
                'waktu_pemberian_terakhir' => '1',
                'tindak_lanjut' => 'Stop',
                'perubahan_aturan_pakai' => '1',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
