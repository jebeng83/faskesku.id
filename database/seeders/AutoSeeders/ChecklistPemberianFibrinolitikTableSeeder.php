<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChecklistPemberianFibrinolitikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('checklist_pemberian_fibrinolitik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('checklist_pemberian_fibrinolitik')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tanggal' => '2025-06-28 09:47:22',
            'nip' => '123124',
            'kontra_indikasi1' => 'Tidak',
            'keterangan_kontra_indikasi1' => '',
            'kontra_indikasi2' => 'Tidak',
            'keterangan_kontra_indikasi2' => '',
            'kontra_indikasi3' => 'Tidak',
            'keterangan_kontra_indikasi3' => '',
            'kontra_indikasi4' => 'Tidak',
            'keterangan_kontra_indikasi4' => '',
            'kontra_indikasi5' => 'Tidak',
            'keterangan_kontra_indikasi5' => '',
            'kontra_indikasi6' => 'Tidak',
            'keterangan_kontra_indikasi6' => '',
            'kontra_indikasi7' => 'Tidak',
            'keterangan_kontra_indikasi7' => '',
            'kontra_indikasi8' => 'Tidak',
            'keterangan_kontra_indikasi8' => '',
            'kontra_indikasi9' => 'Tidak',
            'keterangan_kontra_indikasi9' => '',
            'kontra_indikasi10' => 'Tidak',
            'keterangan_kontra_indikasi10' => '',
            'risiko_tinggi1' => 'Tidak',
            'keterangan_risiko_tinggi1' => '',
            'risiko_tinggi2' => 'Tidak',
            'keterangan_risiko_tinggi2' => '',
            'risiko_tinggi3' => 'Tidak',
            'keterangan_risiko_tinggi3' => '',
            'risiko_tinggi4' => 'Tidak',
            'keterangan_risiko_tinggi4' => '',
            'risiko_tinggi5' => 'Tidak',
            'keterangan_risiko_tinggi5' => '',
            'kesimpulan' => '-',
            'persyaratan_ekg_pre_streptase' => '-',
            'persyaratan_ekg_post_streptase' => '-',
            'cek_troponin' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}