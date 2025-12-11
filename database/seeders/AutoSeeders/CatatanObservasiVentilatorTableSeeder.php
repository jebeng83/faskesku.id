<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanObservasiVentilatorTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_ventilator')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_ventilator')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tgl_perawatan' => '2025-04-28',
            'jam_rawat' => '14:01:17',
            'mode' => 'Nasal IMV',
            'vt' => '12',
            'pakar' => '1212',
            'rr' => '12',
            'reefps' => '2',
            'ee' => '2',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tgl_perawatan' => '2025-08-11',
            'jam_rawat' => '16:00:11',
            'mode' => 'CPAP',
            'vt' => '-',
            'pakar' => '-',
            'rr' => '-',
            'reefps' => '-',
            'ee' => '-',
            'nip' => '12/09/1988/001',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tgl_perawatan' => '2025-06-23',
            'jam_rawat' => '13:50:37',
            'mode' => 'CPAP',
            'vt' => '9',
            'pakar' => '-',
            'rr' => '-',
            'reefps' => '-',
            'ee' => '-',
            'nip' => '123124',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:44:43',
            'mode' => 'Nasal IMV',
            'vt' => '1',
            'pakar' => '2',
            'rr' => '3',
            'reefps' => '4',
            'ee' => '5',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}