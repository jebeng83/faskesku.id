<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KecamatanMinimalSeeder extends Seeder
{
    public function run(): void
    {
        if (! Schema::hasTable('kecamatan')) {
            return;
        }

        DB::table('kecamatan')->updateOrInsert(
            ['kd_kec' => 1],
            ['nm_kec' => '-']
        );
    }
}

