<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganTernakPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_ternak_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_ternak_penerima_dankes')->insert([
            0 => [
                'kode' => '001',
                'keterangan' => 'Unggas',
            ],
            1 => [
                'kode' => '002',
                'keterangan' => 'Burung',
            ],
            2 => [
                'kode' => '003',
                'keterangan' => 'Kambing',
            ],
            3 => [
                'kode' => '004',
                'keterangan' => 'Sapi',
            ],
            4 => [
                'kode' => '005',
                'keterangan' => 'Kerbau',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
