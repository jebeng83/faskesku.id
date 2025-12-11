<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetNotumTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_nota')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_nota')->insert(array (
          0 => 
          array (
            'notaralan' => '100%',
            'kwitansiralan' => '100%',
            'nota1ranap' => '100%',
            'nota2ranap' => '100%',
            'kwitansiranap' => '100%',
            'notaapotek' => '60%',
            'notalabrad' => '100%',
            'notatoko' => '100%',
            'cetaknotasimpanralan' => 'Yes',
            'cetaknotasimpanranap' => 'Yes',
            'rinciandokterralan' => 'No',
            'rinciandokterranap' => 'No',
            'centangdokterralan' => 'Yes',
            'centangdokterranap' => 'Yes',
            'tampilkan_administrasi_di_billingranap' => 'Yes',
            'rincianoperasi' => 'Yes',
            'tampilkan_ppnobat_ralan' => 'Yes',
            'tampilkan_ppnobat_ranap' => 'Yes',
            'tampilkan_tombol_nota_ralan' => 'Yes',
            'tampilkan_tombol_nota_ranap' => 'Yes',
            'verifikasi_penjualan_di_kasir' => 'Yes',
            'verifikasi_penyerahan_darah_di_kasir' => 'No',
            'cetaknotasimpanpenjualan' => 'Yes',
            'tampilkan_tombol_nota_penjualan' => 'No',
            'centangobatralan' => 'Yes',
            'centangobatranap' => 'Yes',
            'cetaknotasimpantoko' => 'Yes',
            'tampilkan_tombol_nota_toko' => 'No',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}