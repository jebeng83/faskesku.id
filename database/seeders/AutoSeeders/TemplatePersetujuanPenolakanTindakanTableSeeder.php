<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplatePersetujuanPenolakanTindakanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_persetujuan_penolakan_tindakan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_persetujuan_penolakan_tindakan')->insert(array (
          0 => 
          array (
            'kode_template' => '01',
            'diagnosa' => '1',
            'tindakan' => '2 a sa s as a s as a sa s as a s as a sa s a sa s as as a s as a sa s as a s as a s as a sa s as a s as a sasasasa sasasasas asasasas sasasas asas a sa sa s as a s a sasasa sas  as as a sa s as a s as',
            'indikasi_tindakan' => '3',
            'tata_cara' => '4',
            'tujuan' => '5',
            'risiko' => '6',
            'komplikasi' => '7',
            'prognosis' => '8',
            'alternatif_dan_risikonya' => '9',
            'lain_lain' => '10',
            'biaya' => 10000000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}