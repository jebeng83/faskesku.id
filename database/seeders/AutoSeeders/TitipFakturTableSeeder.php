<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TitipFakturTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('titip_faktur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('titip_faktur')->insert(array (
          0 => 
          array (
            'no_tagihan' => 'TH20240911001',
            'tanggal' => '2024-09-11',
            'nip' => '123124',
            'keterangan' => 'TES',
            'status' => 'Ditagihkan',
          ),
          1 => 
          array (
            'no_tagihan' => 'TH20240930001',
            'tanggal' => '2024-09-30',
            'nip' => '123124',
            'keterangan' => '1245T55435',
            'status' => 'Dibayar',
          ),
          2 => 
          array (
            'no_tagihan' => 'TH20241103001',
            'tanggal' => '2024-11-03',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Dibayar',
          ),
          3 => 
          array (
            'no_tagihan' => 'TH20241210001',
            'tanggal' => '2024-12-10',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Ditagihkan',
          ),
          4 => 
          array (
            'no_tagihan' => 'TH20250107001',
            'tanggal' => '2025-01-07',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Dibayar',
          ),
          5 => 
          array (
            'no_tagihan' => 'TH20250121001',
            'tanggal' => '2025-01-21',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Ditagihkan',
          ),
          6 => 
          array (
            'no_tagihan' => 'TH20250130001',
            'tanggal' => '2025-01-30',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Ditagihkan',
          ),
          7 => 
          array (
            'no_tagihan' => 'TH20250211003',
            'tanggal' => '2025-02-11',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Ditagihkan',
          ),
          8 => 
          array (
            'no_tagihan' => 'TH20250414001',
            'tanggal' => '2025-04-14',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Dibayar',
          ),
          9 => 
          array (
            'no_tagihan' => 'TH20250603001',
            'tanggal' => '2025-06-03',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Dibayar',
          ),
          10 => 
          array (
            'no_tagihan' => 'TH20250620001',
            'tanggal' => '2025-06-20',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Ditagihkan',
          ),
          11 => 
          array (
            'no_tagihan' => 'TH20250708001',
            'tanggal' => '2025-07-08',
            'nip' => '123124',
            'keterangan' => '--',
            'status' => 'Ditagihkan',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}