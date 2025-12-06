<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class LaporanOperasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('laporan_operasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('laporan_operasi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-04-28 14:56:32',
            'diagnosa_preop' => '',
            'diagnosa_postop' => '',
            'jaringan_dieksekusi' => '',
            'selesaioperasi' => '2025-04-28 14:56:32',
            'permintaan_pa' => 'Ya',
            'laporan_operasi' => 'asasasasa
        sa
        sa
        sas',
          ),
          1 => 
          array (
            'no_rawat' => '2025/05/26/000003',
            'tanggal' => '2025-05-26 11:50:56',
            'diagnosa_preop' => '',
            'diagnosa_postop' => '',
            'jaringan_dieksekusi' => '',
            'selesaioperasi' => '2025-05-26 11:50:56',
            'permintaan_pa' => 'Ya',
            'laporan_operasi' => '0i
        
        
        k
        ',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/19/000001',
            'tanggal' => '2025-06-19 10:09:41',
            'diagnosa_preop' => '-',
            'diagnosa_postop' => '-',
            'jaringan_dieksekusi' => '-',
            'selesaioperasi' => '2025-06-19 10:09:41',
            'permintaan_pa' => 'Ya',
            'laporan_operasi' => 'tes',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tanggal' => '2025-08-11 15:50:28',
            'diagnosa_preop' => '',
            'diagnosa_postop' => '',
            'jaringan_dieksekusi' => '',
            'selesaioperasi' => '2025-08-11 15:50:28',
            'permintaan_pa' => 'Ya',
            'laporan_operasi' => 'sasasas
        
        s
        as
        a
        sa
        s
        sas
        
        
        sa
        sas
        ',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'tanggal' => '2025-07-04 10:07:22',
            'diagnosa_preop' => '1212',
            'diagnosa_postop' => '21212',
            'jaringan_dieksekusi' => '21212',
            'selesaioperasi' => '2025-07-04 10:07:22',
            'permintaan_pa' => 'Ya',
            'laporan_operasi' => '121
        2
        
        1
        21
        2
        
        
        212',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'tanggal' => '2025-07-05 09:55:41',
            'diagnosa_preop' => '1212',
            'diagnosa_postop' => '1212',
            'jaringan_dieksekusi' => '1212',
            'selesaioperasi' => '2025-07-05 09:55:41',
            'permintaan_pa' => 'Ya',
            'laporan_operasi' => '212
        2
        12
        12
        1
        2',
          ),
          6 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'tanggal' => '2025-08-19 11:20:41',
            'diagnosa_preop' => '-',
            'diagnosa_postop' => '-',
            'jaringan_dieksekusi' => '-',
            'selesaioperasi' => '2025-08-19 11:20:41',
            'permintaan_pa' => 'Ya',
            'laporan_operasi' => '-
        HH',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}