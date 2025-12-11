<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SipPegawaiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('sip_pegawai')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('sip_pegawai')->insert(array (
          0 => 
          array (
            'nik' => '156798',
            'jnj_jabatan' => 'Apt',
            'no_sip' => '12131/ dwdwdwdwd/12. 32/ 2025/dsdsdsds',
            'masa_berlaku' => '2028-10-12',
            'status' => '1',
          ),
          1 => 
          array (
            'nik' => '19830112',
            'jnj_jabatan' => 'APJB',
            'no_sip' => '123456789234355',
            'masa_berlaku' => '2025-12-24',
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}