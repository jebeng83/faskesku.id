<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarRawatJlDrTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_rawat_jl_dr')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_rawat_jl_dr')->insert(array (
          0 => 
          array (
            'no_bayar' => 'JMD20250428001',
            'no_rawat' => '2025/04/27/000001',
            'kd_jenis_prw' => 'C038',
            'tgl_perawatan' => '2025-04-27',
            'jam_rawat' => '08:36:58',
            'tarif_tindakandr' => 100000.0,
          ),
          1 => 
          array (
            'no_bayar' => 'JMD20250428001',
            'no_rawat' => '2025/04/27/000001',
            'kd_jenis_prw' => 'C039',
            'tgl_perawatan' => '2025-04-27',
            'jam_rawat' => '08:36:58',
            'tarif_tindakandr' => 50000.0,
          ),
          2 => 
          array (
            'no_bayar' => 'JMD20250603001',
            'no_rawat' => '2025/05/26/000001',
            'kd_jenis_prw' => 'C370',
            'tgl_perawatan' => '2025-05-26',
            'jam_rawat' => '10:28:19',
            'tarif_tindakandr' => 75000.0,
          ),
          3 => 
          array (
            'no_bayar' => 'JMD20250603001',
            'no_rawat' => '2025/05/26/000001',
            'kd_jenis_prw' => 'C515',
            'tgl_perawatan' => '2025-05-26',
            'jam_rawat' => '10:28:19',
            'tarif_tindakandr' => 125000.0,
          ),
          4 => 
          array (
            'no_bayar' => 'JMD20250603001',
            'no_rawat' => '2025/05/26/000001',
            'kd_jenis_prw' => 'RJ00864',
            'tgl_perawatan' => '2025-05-26',
            'jam_rawat' => '10:28:19',
            'tarif_tindakandr' => 60000.0,
          ),
          5 => 
          array (
            'no_bayar' => 'JMD20250603001',
            'no_rawat' => '2025/06/03/000001',
            'kd_jenis_prw' => 'IGD.004',
            'tgl_perawatan' => '2025-06-03',
            'jam_rawat' => '09:05:16',
            'tarif_tindakandr' => 32000.0,
          ),
          6 => 
          array (
            'no_bayar' => 'JMD20250603001',
            'no_rawat' => '2025/06/03/000003',
            'kd_jenis_prw' => 'C102',
            'tgl_perawatan' => '2025-06-03',
            'jam_rawat' => '09:34:05',
            'tarif_tindakandr' => 50000.0,
          ),
          7 => 
          array (
            'no_bayar' => 'JMD20250705001',
            'no_rawat' => '2025/06/03/000002',
            'kd_jenis_prw' => 'RJ00861',
            'tgl_perawatan' => '2025-06-03',
            'jam_rawat' => '08:46:51',
            'tarif_tindakandr' => 150000.0,
          ),
          8 => 
          array (
            'no_bayar' => 'JMD20250705001',
            'no_rawat' => '2025/06/03/000003',
            'kd_jenis_prw' => 'C001',
            'tgl_perawatan' => '2025-06-03',
            'jam_rawat' => '09:34:05',
            'tarif_tindakandr' => 325000.0,
          ),
          9 => 
          array (
            'no_bayar' => 'JMD20250705001',
            'no_rawat' => '2025/06/04/000001',
            'kd_jenis_prw' => 'JP1324565',
            'tgl_perawatan' => '2025-06-04',
            'jam_rawat' => '20:37:27',
            'tarif_tindakandr' => 75000.0,
          ),
          10 => 
          array (
            'no_bayar' => 'JMD20250705001',
            'no_rawat' => '2025/06/11/000001',
            'kd_jenis_prw' => 'RJ00861',
            'tgl_perawatan' => '2025-06-11',
            'jam_rawat' => '19:32:54',
            'tarif_tindakandr' => 150000.0,
          ),
          11 => 
          array (
            'no_bayar' => 'JMD20250705001',
            'no_rawat' => '2025/06/20/000001',
            'kd_jenis_prw' => 'JP000153',
            'tgl_perawatan' => '2025-06-20',
            'jam_rawat' => '09:13:50',
            'tarif_tindakandr' => 75000.0,
          ),
          12 => 
          array (
            'no_bayar' => 'JMD20250825001',
            'no_rawat' => '2025/06/11/000001',
            'kd_jenis_prw' => 'RJ00861',
            'tgl_perawatan' => '2025-06-11',
            'jam_rawat' => '19:12:00',
            'tarif_tindakandr' => 150000.0,
          ),
          13 => 
          array (
            'no_bayar' => 'JMD20250825001',
            'no_rawat' => '2025/06/20/000002',
            'kd_jenis_prw' => 'J000812',
            'tgl_perawatan' => '2025-06-20',
            'jam_rawat' => '14:01:48',
            'tarif_tindakandr' => 100000.0,
          ),
          14 => 
          array (
            'no_bayar' => 'JMD20250825001',
            'no_rawat' => '2025/06/20/000002',
            'kd_jenis_prw' => 'RJ00861',
            'tgl_perawatan' => '2025-06-20',
            'jam_rawat' => '09:55:26',
            'tarif_tindakandr' => 150000.0,
          ),
          15 => 
          array (
            'no_bayar' => 'JMD20250825001',
            'no_rawat' => '2025/06/23/000001',
            'kd_jenis_prw' => 'J000812',
            'tgl_perawatan' => '2025-06-23',
            'jam_rawat' => '10:57:19',
            'tarif_tindakandr' => 100000.0,
          ),
          16 => 
          array (
            'no_bayar' => 'JMD20250825001',
            'no_rawat' => '2025/06/25/000001',
            'kd_jenis_prw' => 'J000812',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '11:10:55',
            'tarif_tindakandr' => 100000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}