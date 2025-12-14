<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrsdetailbeliTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsdetailbeli')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsdetailbeli')->insert([
            0 => [
                'no_faktur' => 'PI20250428001',
                'kode_brng' => 'B00008',
                'kode_sat' => '-',
                'jumlah' => 10.0,
                'harga' => 55500.0,
                'subtotal' => 555000.0,
                'dis' => 0.0,
                'besardis' => 0.0,
                'total' => 555000.0,
            ],
            1 => [
                'no_faktur' => 'PI20250428001',
                'kode_brng' => 'B00005',
                'kode_sat' => 'Item',
                'jumlah' => 10.0,
                'harga' => 11100.0,
                'subtotal' => 111000.0,
                'dis' => 0.0,
                'besardis' => 0.0,
                'total' => 111000.0,
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
