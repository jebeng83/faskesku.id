<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CssdBarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('cssd_barang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('cssd_barang')->insert([
            0 => [
                'no_inventaris' => 'I000000001',
                'jenis_barang' => 'Heacting Set',
            ],
            1 => [
                'no_inventaris' => 'MED/09/06/2022/01',
                'jenis_barang' => 'Heacting Set',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
