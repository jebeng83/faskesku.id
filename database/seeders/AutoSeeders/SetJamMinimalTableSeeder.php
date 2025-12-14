<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetJamMinimalTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_jam_minimal')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_jam_minimal')->insert([
            0 => [
                'lamajam' => 12,
                'hariawal' => 'No',
                'feeperujuk' => 10000.0,
                'diagnosaakhir' => 'Yes',
                'bayi' => 0,
                'aktifkan_hapus_data_salah' => 'No',
                'kamar_inap_kasir_ralan' => 'Yes',
                'ubah_status_kamar' => 'Yes',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
