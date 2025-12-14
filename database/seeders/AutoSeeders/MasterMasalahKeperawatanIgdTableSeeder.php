<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterMasalahKeperawatanIgdTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_igd')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_igd')->insert([
            0 => [
                'kode_masalah' => '001',
                'nama_masalah' => 'Bersihkan Jalan Nafas Tidak Efektif',
            ],
            1 => [
                'kode_masalah' => '002',
                'nama_masalah' => 'Pola Nafas Tidak Efektif',
            ],
            2 => [
                'kode_masalah' => '003',
                'nama_masalah' => 'Gangguan Pertukaran Gas',
            ],
            3 => [
                'kode_masalah' => '004',
                'nama_masalah' => 'Gangguan Perfusi Jaringan Serbral/Perifer',
            ],
            4 => [
                'kode_masalah' => '005',
                'nama_masalah' => 'Nyeri',
            ],
            5 => [
                'kode_masalah' => '006',
                'nama_masalah' => 'Gangguan Hemodinamik',
            ],
            6 => [
                'kode_masalah' => '007',
                'nama_masalah' => 'Resiko Penyebaran Toksik/Resiko Infeksi',
            ],
            7 => [
                'kode_masalah' => '008',
                'nama_masalah' => 'Penurunan Curah Jantung',
            ],
            8 => [
                'kode_masalah' => '009',
                'nama_masalah' => 'Intoleransi Aktifitas',
            ],
            9 => [
                'kode_masalah' => '010',
                'nama_masalah' => 'Gangguan Ketidakstabilan Kadar Glukosa Darah',
            ],
            10 => [
                'kode_masalah' => '011',
                'nama_masalah' => 'Gangguan Keseimbangan Cairan Dan Elektrolit',
            ],
            11 => [
                'kode_masalah' => '012',
                'nama_masalah' => 'Peningkatan Suhu Tubuh',
            ],
            12 => [
                'kode_masalah' => '013',
                'nama_masalah' => 'Resiko Cidera/jatuh',
            ],
            13 => [
                'kode_masalah' => '014',
                'nama_masalah' => 'Lain-lain',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
