<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class NotaJalanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('nota_jalan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('nota_jalan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'no_nota' => '2025/06/20/RJ0002',
            'tanggal' => '2025-06-20',
            'jam' => '09:24:37',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/28/000001',
            'no_nota' => '2025/04/28/RJ0001',
            'tanggal' => '2025-04-28',
            'jam' => '09:20:54',
          ),
          2 => 
          array (
            'no_rawat' => '2025/04/28/000003',
            'no_nota' => '2025/04/28/RJ0004',
            'tanggal' => '2025-04-28',
            'jam' => '09:44:03',
          ),
          3 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'no_nota' => '2025/05/26/RJ0003',
            'tanggal' => '2025-05-26',
            'jam' => '10:53:22',
          ),
          4 => 
          array (
            'no_rawat' => '2025/05/26/000002',
            'no_nota' => '2025/05/26/RJ0004',
            'tanggal' => '2025-05-26',
            'jam' => '11:20:29',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/03/000001',
            'no_nota' => '2025/06/03/RJ0002',
            'tanggal' => '2025-06-03',
            'jam' => '09:05:42',
          ),
          6 => 
          array (
            'no_rawat' => '2025/06/03/000002',
            'no_nota' => '2025/06/03/RJ0001',
            'tanggal' => '2025-06-03',
            'jam' => '08:57:56',
          ),
          7 => 
          array (
            'no_rawat' => '2025/06/20/000001',
            'no_nota' => '2025/06/20/RJ0001',
            'tanggal' => '2025-06-20',
            'jam' => '09:13:37',
          ),
          8 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'no_nota' => '2025/06/25/RJ0001',
            'tanggal' => '2025-06-25',
            'jam' => '09:03:27',
          ),
          9 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'no_nota' => '2025/06/30/RJ0001',
            'tanggal' => '2025-06-30',
            'jam' => '10:05:01',
          ),
          10 => 
          array (
            'no_rawat' => '2025/07/23/000001',
            'no_nota' => '2025/07/23/RJ0001',
            'tanggal' => '2025-07-23',
            'jam' => '14:44:30',
          ),
          11 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'no_nota' => '2025/07/29/RJ0001',
            'tanggal' => '2025-07-29',
            'jam' => '09:51:28',
          ),
          12 => 
          array (
            'no_rawat' => '2025/08/11/000001',
            'no_nota' => '2025/08/11/RJ0001',
            'tanggal' => '2025-08-11',
            'jam' => '14:36:58',
          ),
          13 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'no_nota' => '2025/08/19/RJ0001',
            'tanggal' => '2025-08-19',
            'jam' => '11:26:28',
          ),
          14 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'no_nota' => '2025/08/21/RJ0001',
            'tanggal' => '2025-08-21',
            'jam' => '14:57:16',
          ),
          15 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'no_nota' => '2025/08/25/RJ0001',
            'tanggal' => '2025-08-25',
            'jam' => '14:15:41',
          ),
          16 => 
          array (
            'no_rawat' => '2025/11/24/000001',
            'no_nota' => '2025/11/24/RJ/000',
            'tanggal' => '2025-11-24',
            'jam' => '21:23:38',
          ),
          17 => 
          array (
            'no_rawat' => '2025/11/25/000001',
            'no_nota' => '2025/11/30/RJ/000',
            'tanggal' => '2025-11-30',
            'jam' => '22:11:12',
          ),
          18 => 
          array (
            'no_rawat' => '2025/11/30/000002',
            'no_nota' => '2025/12/01/RJ/000',
            'tanggal' => '2025-12-01',
            'jam' => '01:04:26',
          ),
          19 => 
          array (
            'no_rawat' => '2025/12/01/000003',
            'no_nota' => '2025/12/01/RJ0001',
            'tanggal' => '2025-12-01',
            'jam' => '12:47:24',
          ),
          20 => 
          array (
            'no_rawat' => '2025/12/01/000004',
            'no_nota' => '2025/12/01/RJ0002',
            'tanggal' => '2025-12-01',
            'jam' => '22:21:07',
          ),
          21 => 
          array (
            'no_rawat' => '2025/12/01/000005',
            'no_nota' => '2025/12/01/RJ0003',
            'tanggal' => '2025-12-01',
            'jam' => '22:49:42',
          ),
          22 => 
          array (
            'no_rawat' => '2025/12/01/000006',
            'no_nota' => '2025/12/01/RJ0004',
            'tanggal' => '2025-12-01',
            'jam' => '23:25:02',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}