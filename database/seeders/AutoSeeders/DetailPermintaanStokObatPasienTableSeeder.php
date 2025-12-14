<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPermintaanStokObatPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_permintaan_stok_obat_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_permintaan_stok_obat_pasien')->insert([
            0 => [
                'no_permintaan' => 'SP202506180001',
                'kode_brng' => 'B000000791',
                'jml' => 10.0,
                'aturan_pakai' => '2',
                'jam00' => 'false',
                'jam01' => 'false',
                'jam02' => 'true',
                'jam03' => 'false',
                'jam04' => 'false',
                'jam05' => 'false',
                'jam06' => 'false',
                'jam07' => 'false',
                'jam08' => 'true',
                'jam09' => 'false',
                'jam10' => 'false',
                'jam11' => 'false',
                'jam12' => 'false',
                'jam13' => 'false',
                'jam14' => 'false',
                'jam15' => 'true',
                'jam16' => 'false',
                'jam17' => 'false',
                'jam18' => 'false',
                'jam19' => 'false',
                'jam20' => 'false',
                'jam21' => 'true',
                'jam22' => 'false',
                'jam23' => 'false',
            ],
            1 => [
                'no_permintaan' => 'SP202506230001',
                'kode_brng' => 'B000000305',
                'jml' => 10.0,
                'aturan_pakai' => '2',
                'jam00' => 'true',
                'jam01' => 'false',
                'jam02' => 'false',
                'jam03' => 'false',
                'jam04' => 'false',
                'jam05' => 'false',
                'jam06' => 'true',
                'jam07' => 'false',
                'jam08' => 'false',
                'jam09' => 'false',
                'jam10' => 'false',
                'jam11' => 'false',
                'jam12' => 'true',
                'jam13' => 'false',
                'jam14' => 'false',
                'jam15' => 'false',
                'jam16' => 'false',
                'jam17' => 'false',
                'jam18' => 'true',
                'jam19' => 'false',
                'jam20' => 'false',
                'jam21' => 'false',
                'jam22' => 'false',
                'jam23' => 'false',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
