<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetTarifTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_tarif')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_tarif')->insert([
            0 => [
                'poli_ralan' => 'No',
                'cara_bayar_ralan' => 'No',
                'ruang_ranap' => 'No',
                'cara_bayar_ranap' => 'No',
                'cara_bayar_lab' => 'No',
                'cara_bayar_radiologi' => 'No',
                'cara_bayar_operasi' => 'No',
                'kelas_ranap' => 'No',
                'kelas_lab' => 'No',
                'kelas_radiologi' => 'No',
                'kelas_operasi' => 'No',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
