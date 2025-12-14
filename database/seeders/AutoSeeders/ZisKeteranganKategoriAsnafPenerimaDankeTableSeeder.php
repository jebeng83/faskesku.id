<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganKategoriAsnafPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_kategori_asnaf_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_kategori_asnaf_penerima_dankes')->insert([
            0 => [
                'kode' => '001',
                'keterangan' => 'Fakir',
            ],
            1 => [
                'kode' => '002',
                'keterangan' => 'Miskin',
            ],
            2 => [
                'kode' => '003',
                'keterangan' => 'Amil',
            ],
            3 => [
                'kode' => '004',
                'keterangan' => 'Mualaf',
            ],
            4 => [
                'kode' => '005',
                'keterangan' => 'Riqob',
            ],
            5 => [
                'kode' => '006',
                'keterangan' => 'Ghorimin',
            ],
            6 => [
                'kode' => '007',
                'keterangan' => 'Fisabilillah',
            ],
            7 => [
                'kode' => '008',
                'keterangan' => 'Ibnu Sabil / Musafir',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
