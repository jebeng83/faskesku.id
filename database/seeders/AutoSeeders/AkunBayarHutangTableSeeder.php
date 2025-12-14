<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AkunBayarHutangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('akun_bayar_hutang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('akun_bayar_hutang')->insert([
            0 => [
                'nama_bayar' => 'BAYAR CASH',
                'kd_rek' => '111020',
            ],
            1 => [
                'nama_bayar' => 'BAYAR LEWAT BANK MANDIRI',
                'kd_rek' => '112010',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
