<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarJmDokterTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_jm_dokter')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_jm_dokter')->insert(array (
          0 => 
          array (
            'no_bayar' => 'JMD20250224001',
            'tanggal' => '2025-02-24',
            'kd_dokter' => 'D0000004',
            'besar_bayar' => 750000.0,
            'nama_bayar' => 'BAYAR CASH',
            'keterangan' => '-',
            'rawatjalan' => 750000.0,
            'rawatinap' => 0.0,
            'labrawatjalan' => 0.0,
            'labrawatinap' => 0.0,
            'radrawatjalan' => 0.0,
            'radrawatinap' => 0.0,
            'operasiralan' => 0.0,
            'operasiranap' => 0.0,
          ),
          1 => 
          array (
            'no_bayar' => 'JMD20250414001',
            'tanggal' => '2025-04-14',
            'kd_dokter' => 'D0000004',
            'besar_bayar' => 1185000.0,
            'nama_bayar' => 'BAYAR CASH',
            'keterangan' => '-',
            'rawatjalan' => 1185000.0,
            'rawatinap' => 0.0,
            'labrawatjalan' => 0.0,
            'labrawatinap' => 0.0,
            'radrawatjalan' => 0.0,
            'radrawatinap' => 0.0,
            'operasiralan' => 0.0,
            'operasiranap' => 0.0,
          ),
          2 => 
          array (
            'no_bayar' => 'JMD20250428001',
            'tanggal' => '2025-04-28',
            'kd_dokter' => 'D0000004',
            'besar_bayar' => 370000.0,
            'nama_bayar' => 'BAYAR CASH',
            'keterangan' => '-',
            'rawatjalan' => 370000.0,
            'rawatinap' => 0.0,
            'labrawatjalan' => 0.0,
            'labrawatinap' => 0.0,
            'radrawatjalan' => 0.0,
            'radrawatinap' => 0.0,
            'operasiralan' => 0.0,
            'operasiranap' => 0.0,
          ),
          3 => 
          array (
            'no_bayar' => 'JMD20250506001',
            'tanggal' => '2025-05-06',
            'kd_dokter' => 'D0000004',
            'besar_bayar' => 1894250.0,
            'nama_bayar' => 'BAYAR CASH',
            'keterangan' => '-',
            'rawatjalan' => 0.0,
            'rawatinap' => 0.0,
            'labrawatjalan' => 4250.0,
            'labrawatinap' => 0.0,
            'radrawatjalan' => 0.0,
            'radrawatinap' => 0.0,
            'operasiralan' => 0.0,
            'operasiranap' => 1890000.0,
          ),
          4 => 
          array (
            'no_bayar' => 'JMD20250603001',
            'tanggal' => '2025-06-03',
            'kd_dokter' => 'D0000004',
            'besar_bayar' => 4052000.0,
            'nama_bayar' => 'BAYAR CASH',
            'keterangan' => '-',
            'rawatjalan' => 342000.0,
            'rawatinap' => 0.0,
            'labrawatjalan' => 0.0,
            'labrawatinap' => 0.0,
            'radrawatjalan' => 0.0,
            'radrawatinap' => 0.0,
            'operasiralan' => 3710000.0,
            'operasiranap' => 0.0,
          ),
          5 => 
          array (
            'no_bayar' => 'JMD20250705001',
            'tanggal' => '2025-07-05',
            'kd_dokter' => 'D0000004',
            'besar_bayar' => 775000.0,
            'nama_bayar' => 'BAYAR CASH',
            'keterangan' => '121212',
            'rawatjalan' => 775000.0,
            'rawatinap' => 0.0,
            'labrawatjalan' => 0.0,
            'labrawatinap' => 0.0,
            'radrawatjalan' => 0.0,
            'radrawatinap' => 0.0,
            'operasiralan' => 0.0,
            'operasiranap' => 0.0,
          ),
          6 => 
          array (
            'no_bayar' => 'JMD20250825001',
            'tanggal' => '2025-08-25',
            'kd_dokter' => 'D0000004',
            'besar_bayar' => 600000.0,
            'nama_bayar' => 'BAYAR CASH',
            'keterangan' => '-',
            'rawatjalan' => 600000.0,
            'rawatinap' => 0.0,
            'labrawatjalan' => 0.0,
            'labrawatinap' => 0.0,
            'radrawatjalan' => 0.0,
            'radrawatinap' => 0.0,
            'operasiralan' => 0.0,
            'operasiranap' => 0.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}