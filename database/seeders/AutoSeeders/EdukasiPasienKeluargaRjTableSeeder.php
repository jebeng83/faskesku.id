<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class EdukasiPasienKeluargaRjTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('edukasi_pasien_keluarga_rj')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();

        Schema::enableForeignKeyConstraints();
    }
}
