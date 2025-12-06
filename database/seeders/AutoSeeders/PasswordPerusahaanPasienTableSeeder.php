<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PasswordPerusahaanPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('password_perusahaan_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('password_perusahaan_pasien')->insert(array (
          0 => 
          array (
            'kode_perusahaan' => 'I0002',
            'password' => '¬9%®9&:‰µt%?Ž¬[',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}