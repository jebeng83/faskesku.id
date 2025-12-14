<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganKategoriPhbsPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_kategori_phbs_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_kategori_phbs_penerima_dankes')->insert([
            0 => [
                'kode' => '001',
                'keterangan' => 'Hijau',
            ],
            1 => [
                'kode' => '002',
                'keterangan' => 'Kuning',
            ],
            2 => [
                'kode' => '003',
                'keterangan' => 'Merah',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
