<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanKeseimbanganCairanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_keseimbangan_cairan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_keseimbangan_cairan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tgl_perawatan' => '2025-05-06',
            'jam_rawat' => '17:34:26',
            'infus' => '1',
            'tranfusi' => '1',
            'minum' => '1',
            'urine' => '1',
            'drain' => '1',
            'ngt' => '1',
            'iwl' => '1',
            'keseimbangan' => '1',
            'keterangan' => '2',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:45:18',
            'infus' => '1',
            'tranfusi' => '2',
            'minum' => '3',
            'urine' => '4',
            'drain' => '5',
            'ngt' => '6',
            'iwl' => '7',
            'keseimbangan' => '12',
            'keterangan' => '-',
            'nip' => '123124',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tgl_perawatan' => '2025-06-30',
            'jam_rawat' => '09:00:42',
            'infus' => '10',
            'tranfusi' => '10',
            'minum' => '10',
            'urine' => '10',
            'drain' => '10',
            'ngt' => '10',
            'iwl' => '10',
            'keseimbangan' => '0',
            'keterangan' => '-',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}