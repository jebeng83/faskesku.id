<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KodetransaksiTujuanTransferBankmandiriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kodetransaksi_tujuan_transfer_bankmandiri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kodetransaksi_tujuan_transfer_bankmandiri')->insert(array (
          0 => 
          array (
            'kode_metode' => 'BAU',
            'kode_bank' => 'BDI',
            'kode_transaksi' => '1212313',
          ),
          1 => 
          array (
            'kode_metode' => 'BAU',
            'kode_bank' => 'BNI',
            'kode_transaksi' => '123123123',
          ),
          2 => 
          array (
            'kode_metode' => 'IBU',
            'kode_bank' => 'MEG',
            'kode_transaksi' => 'qwqwqw',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}