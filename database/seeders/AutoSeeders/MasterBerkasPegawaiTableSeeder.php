<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterBerkasPegawaiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_berkas_pegawai')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_berkas_pegawai')->insert(array (
          0 => 
          array (
            'kode' => 'MBP0001',
            'kategori' => 'Tenaga klinis Dokter Umum',
            'nama_berkas' => 'FOTOCOPY KTP',
            'no_urut' => 1,
          ),
          1 => 
          array (
            'kode' => 'MBP0002',
            'kategori' => 'Tenaga klinis Dokter Umum',
            'nama_berkas' => 'IJAZAH KEDOKTERAN UMUM',
            'no_urut' => 2,
          ),
          2 => 
          array (
            'kode' => 'MBP0003',
            'kategori' => 'Tenaga klinis Dokter Umum',
            'nama_berkas' => 'STR DOKTER',
            'no_urut' => 3,
          ),
          3 => 
          array (
            'kode' => 'MBP0004',
            'kategori' => 'Tenaga klinis Dokter Umum',
            'nama_berkas' => 'SIP DOKTER',
            'no_urut' => 4,
          ),
          4 => 
          array (
            'kode' => 'MBP0005',
            'kategori' => 'Tenaga klinis Dokter Spesialis',
            'nama_berkas' => 'FOTOCOPY KTP',
            'no_urut' => 1,
          ),
          5 => 
          array (
            'kode' => 'MBP0006',
            'kategori' => 'Tenaga klinis Dokter Spesialis',
            'nama_berkas' => 'SIP DOKTER SPESIALIS',
            'no_urut' => 2,
          ),
          6 => 
          array (
            'kode' => 'MBP0007',
            'kategori' => 'Tenaga klinis Dokter Spesialis',
            'nama_berkas' => 'IJAZAH DOKTER SPESIALIS',
            'no_urut' => 3,
          ),
          7 => 
          array (
            'kode' => 'MBP0008',
            'kategori' => 'Tenaga klinis Dokter Umum',
            'nama_berkas' => 'KARTU KELUARGA',
            'no_urut' => 5,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}