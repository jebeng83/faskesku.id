<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAlamatPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_alamat_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_alamat_pasien')->insert(array (
          0 => 
          array (
            'kelurahan' => 'true',
            'kecamatan' => 'true',
            'kabupaten' => 'true',
            'propinsi' => 'true',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}