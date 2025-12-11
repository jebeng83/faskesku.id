<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkun2TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akun2')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akun2')->insert(array (
          0 => 
          array (
            'Penerimaan_Dapur' => '115070',
            'Kontra_Penerimaan_Dapur' => '211219',
            'Bayar_Pemesanan_Dapur' => '211219',
            'Retur_Beli_Dapur' => '115070',
            'Kontra_Retur_Beli_Dapur' => '211219',
            'Hibah_Dapur' => '115070',
            'Kontra_Hibah_Dapur' => '430108',
            'Piutang_Jasa_Perusahaan' => '117017',
            'Pendapatan_Piutang_Jasa_Perusahaan' => '430114',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}