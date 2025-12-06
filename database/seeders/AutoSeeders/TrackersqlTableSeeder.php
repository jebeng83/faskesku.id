<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TrackersqlTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('trackersql')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('trackersql')->insert(array (
          0 => 
          array (
            'tanggal' => '2025-08-14 15:38:32',
            'sqle' => '127.0.0.1 insert into tracker values(\'Admin Utama\',current_date(),current_time())',
            'usere' => 'Admin Utama',
          ),
          1 => 
          array (
            'tanggal' => '2025-08-14 15:38:58',
            'sqle' => '127.0.0.1 insert into pemeriksaan_ranap values(|2025/06/18/000001|2025-08-14|15:38:57|3||||||||Compos Mentis|1|2||4|5|6|7|D0000003)',
            'usere' => 'Admin Utama',
          ),
          2 => 
          array (
            'tanggal' => '2025-08-14 15:39:23',
            'sqle' => '127.0.0.1 update pemeriksaan_ranap set no_rawat=\'2025/06/18/000001\',suhu_tubuh=\'3\',tensi=\'\',keluhan=\'tes\',pemeriksaan=\'2\',spo2=\'\',nadi=\'\',respirasi=\'\',tinggi=\'\',berat=\'\',gcs=\'\',kesadaran=\'Compos Mentis\',alergi=\'\',tgl_perawatan=\'2025-08-14\',jam_rawat=\'15:39:22\',rtl=\'5\',penilaian=\'4\',instruksi=\'6\',evaluasi=\'7\',nip=\'D0000003\' where no_rawat=\'2025/06/18/000001\' and tgl_perawatan=\'2025-08-14\' and jam_rawat=\'15:38:57\'',
            'usere' => 'Admin Utama',
          ),
          3 => 
          array (
            'tanggal' => '2025-08-14 15:42:06',
            'sqle' => '127.0.0.1 insert into tracker values(\'Admin Utama\',current_date(),current_time())',
            'usere' => 'Admin Utama',
          ),
          4 => 
          array (
            'tanggal' => '2025-08-14 15:42:52',
            'sqle' => '127.0.0.1 insert into tracker values(\'123124\',current_date(),current_time())',
            'usere' => '123124',
          ),
          5 => 
          array (
            'tanggal' => '2025-08-14 15:43:08',
            'sqle' => '127.0.0.1 insert into pemeriksaan_ranap values(|2025/06/18/000001|2025-08-14|15:43:07|||||||||Compos Mentis|sasas|sasas|asas|sasas|sasas|sasa|asas|123124)',
            'usere' => '123124',
          ),
          6 => 
          array (
            'tanggal' => '2025-08-14 15:43:17',
            'sqle' => '127.0.0.1 insert into tracker values(\'Admin Utama\',current_date(),current_time())',
            'usere' => 'Admin Utama',
          ),
          7 => 
          array (
            'tanggal' => '2025-08-14 15:43:27',
            'sqle' => '127.0.0.1 insert into tracker values(\'D0000004\',current_date(),current_time())',
            'usere' => 'D0000004',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}