<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkunRanap2TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_ranap2')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_ranap2')->insert(array (
          0 => 
          array (
            'Persediaan_Obat_Kamar_Operasi_Ranap' => '115030',
            'Harian_Ranap' => '410117',
            'Uang_Muka_Ranap' => '410120',
            'Piutang_Pasien_Ranap' => '117002',
            'Sisa_Uang_Muka_Ranap' => '111010',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}