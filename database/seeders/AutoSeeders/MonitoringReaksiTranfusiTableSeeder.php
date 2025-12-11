<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MonitoringReaksiTranfusiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('monitoring_reaksi_tranfusi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('monitoring_reaksi_tranfusi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:51:38',
            'produk_darah' => '1',
            'no_kantong' => '2',
            'lokasi_insersi' => '3',
            'td' => '4',
            'hr' => '5',
            'rr' => '6',
            'suhu' => '7',
            'jenis_reaksi_alergi' => '7',
            'keterangan' => '8',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'tgl_perawatan' => '2025-06-30',
            'jam_rawat' => '11:45:02',
            'produk_darah' => '-',
            'no_kantong' => '-',
            'lokasi_insersi' => '-',
            'td' => '-',
            'hr' => '-',
            'rr' => '-',
            'suhu' => '-',
            'jenis_reaksi_alergi' => '-',
            'keterangan' => '-',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}