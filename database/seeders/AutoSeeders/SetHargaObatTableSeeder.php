<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetHargaObatTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_harga_obat')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_harga_obat')->insert([
            0 => [
                'setharga' => 'Umum',
                'hargadasar' => 'Harga Diskon',
                'ppn' => 'No',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
