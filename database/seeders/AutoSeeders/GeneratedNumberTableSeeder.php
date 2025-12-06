<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GeneratedNumberTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('generated_numbers')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('generated_numbers')->insert(array (
          0 => 
          array (
            'id' => 1,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000001',
            'sequence_number' => 1,
            'created_at' => '2025-09-25 23:39:12',
            'updated_at' => '2025-09-25 23:39:12',
          ),
          1 => 
          array (
            'id' => 2,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000002',
            'sequence_number' => 2,
            'created_at' => '2025-09-25 23:39:12',
            'updated_at' => '2025-09-25 23:39:12',
          ),
          2 => 
          array (
            'id' => 3,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000003',
            'sequence_number' => 3,
            'created_at' => '2025-09-25 23:39:12',
            'updated_at' => '2025-09-25 23:39:12',
          ),
          3 => 
          array (
            'id' => 4,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000004',
            'sequence_number' => 4,
            'created_at' => '2025-09-25 23:39:12',
            'updated_at' => '2025-09-25 23:39:12',
          ),
          4 => 
          array (
            'id' => 5,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000005',
            'sequence_number' => 5,
            'created_at' => '2025-09-25 23:39:13',
            'updated_at' => '2025-09-25 23:39:13',
          ),
          5 => 
          array (
            'id' => 6,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000006',
            'sequence_number' => 6,
            'created_at' => '2025-09-25 23:39:21',
            'updated_at' => '2025-09-25 23:39:21',
          ),
          6 => 
          array (
            'id' => 7,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000007',
            'sequence_number' => 7,
            'created_at' => '2025-09-25 23:39:21',
            'updated_at' => '2025-09-25 23:39:21',
          ),
          7 => 
          array (
            'id' => 8,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000008',
            'sequence_number' => 8,
            'created_at' => '2025-09-25 23:39:21',
            'updated_at' => '2025-09-25 23:39:21',
          ),
          8 => 
          array (
            'id' => 9,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000009',
            'sequence_number' => 9,
            'created_at' => '2025-09-25 23:39:21',
            'updated_at' => '2025-09-25 23:39:21',
          ),
          9 => 
          array (
            'id' => 10,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000010',
            'sequence_number' => 10,
            'created_at' => '2025-09-25 23:39:22',
            'updated_at' => '2025-09-25 23:39:22',
          ),
          10 => 
          array (
            'id' => 11,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000011',
            'sequence_number' => 11,
            'created_at' => '2025-09-25 23:41:39',
            'updated_at' => '2025-09-25 23:41:39',
          ),
          11 => 
          array (
            'id' => 12,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000012',
            'sequence_number' => 12,
            'created_at' => '2025-09-25 23:41:39',
            'updated_at' => '2025-09-25 23:41:39',
          ),
          12 => 
          array (
            'id' => 13,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000013',
            'sequence_number' => 13,
            'created_at' => '2025-09-25 23:41:39',
            'updated_at' => '2025-09-25 23:41:39',
          ),
          13 => 
          array (
            'id' => 14,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000014',
            'sequence_number' => 14,
            'created_at' => '2025-09-25 23:41:39',
            'updated_at' => '2025-09-25 23:41:39',
          ),
          14 => 
          array (
            'id' => 15,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000015',
            'sequence_number' => 15,
            'created_at' => '2025-09-25 23:41:40',
            'updated_at' => '2025-09-25 23:41:40',
          ),
          15 => 
          array (
            'id' => 16,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000016',
            'sequence_number' => 16,
            'created_at' => '2025-09-25 23:42:27',
            'updated_at' => '2025-09-25 23:42:27',
          ),
          16 => 
          array (
            'id' => 17,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000017',
            'sequence_number' => 17,
            'created_at' => '2025-09-25 23:42:27',
            'updated_at' => '2025-09-25 23:42:27',
          ),
          17 => 
          array (
            'id' => 18,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000018',
            'sequence_number' => 18,
            'created_at' => '2025-09-25 23:42:27',
            'updated_at' => '2025-09-25 23:42:27',
          ),
          18 => 
          array (
            'id' => 19,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000019',
            'sequence_number' => 19,
            'created_at' => '2025-09-25 23:42:27',
            'updated_at' => '2025-09-25 23:42:27',
          ),
          19 => 
          array (
            'id' => 20,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000020',
            'sequence_number' => 20,
            'created_at' => '2025-09-25 23:42:27',
            'updated_at' => '2025-09-25 23:42:27',
          ),
          20 => 
          array (
            'id' => 21,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000001',
            'sequence_number' => 1,
            'created_at' => '2025-09-25 23:44:13',
            'updated_at' => '2025-09-25 23:44:13',
          ),
          21 => 
          array (
            'id' => 22,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000002',
            'sequence_number' => 2,
            'created_at' => '2025-09-25 23:44:16',
            'updated_at' => '2025-09-25 23:44:16',
          ),
          22 => 
          array (
            'id' => 23,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000003',
            'sequence_number' => 3,
            'created_at' => '2025-09-25 23:44:57',
            'updated_at' => '2025-09-25 23:44:57',
          ),
          23 => 
          array (
            'id' => 24,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000004',
            'sequence_number' => 4,
            'created_at' => '2025-09-25 23:45:00',
            'updated_at' => '2025-09-25 23:45:00',
          ),
          24 => 
          array (
            'id' => 25,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000005',
            'sequence_number' => 5,
            'created_at' => '2025-09-25 23:45:02',
            'updated_at' => '2025-09-25 23:45:02',
          ),
          25 => 
          array (
            'id' => 26,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000006',
            'sequence_number' => 6,
            'created_at' => '2025-09-25 23:45:09',
            'updated_at' => '2025-09-25 23:45:09',
          ),
          26 => 
          array (
            'id' => 27,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000007',
            'sequence_number' => 7,
            'created_at' => '2025-09-25 23:45:11',
            'updated_at' => '2025-09-25 23:45:11',
          ),
          27 => 
          array (
            'id' => 28,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000008',
            'sequence_number' => 8,
            'created_at' => '2025-09-25 23:47:41',
            'updated_at' => '2025-09-25 23:47:41',
          ),
          28 => 
          array (
            'id' => 29,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000021',
            'sequence_number' => 21,
            'created_at' => '2025-09-25 23:50:46',
            'updated_at' => '2025-09-25 23:50:46',
          ),
          29 => 
          array (
            'id' => 30,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000022',
            'sequence_number' => 22,
            'created_at' => '2025-09-25 23:50:47',
            'updated_at' => '2025-09-25 23:50:47',
          ),
          30 => 
          array (
            'id' => 31,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000023',
            'sequence_number' => 23,
            'created_at' => '2025-09-25 23:50:47',
            'updated_at' => '2025-09-25 23:50:47',
          ),
          31 => 
          array (
            'id' => 32,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000024',
            'sequence_number' => 24,
            'created_at' => '2025-09-25 23:50:47',
            'updated_at' => '2025-09-25 23:50:47',
          ),
          32 => 
          array (
            'id' => 33,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-25',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/25/000025',
            'sequence_number' => 25,
            'created_at' => '2025-09-25 23:50:47',
            'updated_at' => '2025-09-25 23:50:47',
          ),
          33 => 
          array (
            'id' => 34,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000009',
            'sequence_number' => 9,
            'created_at' => '2025-09-26 00:02:36',
            'updated_at' => '2025-09-26 00:02:36',
          ),
          34 => 
          array (
            'id' => 35,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000010',
            'sequence_number' => 10,
            'created_at' => '2025-09-26 00:02:36',
            'updated_at' => '2025-09-26 00:02:36',
          ),
          35 => 
          array (
            'id' => 36,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000011',
            'sequence_number' => 11,
            'created_at' => '2025-09-26 00:02:36',
            'updated_at' => '2025-09-26 00:02:36',
          ),
          36 => 
          array (
            'id' => 37,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000012',
            'sequence_number' => 12,
            'created_at' => '2025-09-26 00:02:36',
            'updated_at' => '2025-09-26 00:02:36',
          ),
          37 => 
          array (
            'id' => 38,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000013',
            'sequence_number' => 13,
            'created_at' => '2025-09-26 00:02:36',
            'updated_at' => '2025-09-26 00:02:36',
          ),
          38 => 
          array (
            'id' => 39,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000014',
            'sequence_number' => 14,
            'created_at' => '2025-09-26 00:10:53',
            'updated_at' => '2025-09-26 00:10:53',
          ),
          39 => 
          array (
            'id' => 40,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000015',
            'sequence_number' => 15,
            'created_at' => '2025-09-26 00:10:54',
            'updated_at' => '2025-09-26 00:10:54',
          ),
          40 => 
          array (
            'id' => 41,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000016',
            'sequence_number' => 16,
            'created_at' => '2025-09-26 00:10:54',
            'updated_at' => '2025-09-26 00:10:54',
          ),
          41 => 
          array (
            'id' => 42,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000017',
            'sequence_number' => 17,
            'created_at' => '2025-09-26 00:10:54',
            'updated_at' => '2025-09-26 00:10:54',
          ),
          42 => 
          array (
            'id' => 43,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000018',
            'sequence_number' => 18,
            'created_at' => '2025-09-26 00:10:54',
            'updated_at' => '2025-09-26 00:10:54',
          ),
          43 => 
          array (
            'id' => 44,
            'type' => 'no_rawat',
            'tanggal' => '2025-09-26',
            'kd_dokter' => NULL,
            'kd_poli' => NULL,
            'generated_number' => '2025/09/26/000019',
            'sequence_number' => 19,
            'created_at' => '2025-09-26 00:15:39',
            'updated_at' => '2025-09-26 00:15:39',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}