<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PengajuanBiayaDisetujuiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_biaya_disetujui')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_biaya_disetujui')->insert([
            0 => [
                'no_pengajuan' => 'PK20250428001',
                'jumlah' => 5.0,
                'harga' => 2000000.0,
                'total' => 10000000.0,
            ],
            1 => [
                'no_pengajuan' => 'PK20250603001',
                'jumlah' => 2.0,
                'harga' => 2600000.0,
                'total' => 5200000.0,
            ],
            2 => [
                'no_pengajuan' => 'PK20250813001',
                'jumlah' => 6.0,
                'harga' => 5000000.0,
                'total' => 30000000.0,
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
