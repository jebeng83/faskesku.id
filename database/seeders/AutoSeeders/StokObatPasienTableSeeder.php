<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class StokObatPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('stok_obat_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('stok_obat_pasien')->insert([
            0 => [
                'tanggal' => '2025-06-18',
                'jam' => '13:56:24',
                'no_rawat' => '2025/06/18/000001',
                'kode_brng' => 'B000000791',
                'jumlah' => 10.0,
                'kd_bangsal' => 'AP',
                'no_batch' => '',
                'no_faktur' => '',
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
                'tanggal' => '2025-06-23',
                'jam' => '13:52:31',
                'no_rawat' => '2025/06/20/000002',
                'kode_brng' => 'B000000305',
                'jumlah' => 10.0,
                'kd_bangsal' => 'AP',
                'no_batch' => '',
                'no_faktur' => '',
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
