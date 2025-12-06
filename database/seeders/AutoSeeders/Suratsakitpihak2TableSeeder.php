<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Suratsakitpihak2TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('suratsakitpihak2')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('suratsakitpihak2')->insert(array (
          0 => 
          array (
            'no_surat' => '12121212',
            'no_rawat' => '2025/08/25/000001',
            'tanggalawal' => '2025-08-25',
            'tanggalakhir' => '2025-08-25',
            'lamasakit' => '1 (Satu)',
            'nama2' => '121212',
            'tgl_lahir' => '2025-08-25',
            'umur' => '0 Th 0 Bl 0 Hr',
            'jk' => 'Laki-laki',
            'alamat' => 'TES, KEDUNGWARU, PREMBUN, KABUPATEN KEBUMEN',
            'hubungan' => 'Suami',
            'pekerjaan' => 'Karyawan Swasta',
            'instansi' => '21212',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}