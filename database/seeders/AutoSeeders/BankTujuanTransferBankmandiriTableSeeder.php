<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BankTujuanTransferBankmandiriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bank_tujuan_transfer_bankmandiri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bank_tujuan_transfer_bankmandiri')->insert(array (
          0 => 
          array (
            'kode_bank' => 'BDI',
            'nama_bank' => 'Bank Danamon',
          ),
          1 => 
          array (
            'kode_bank' => 'BNI',
            'nama_bank' => 'BNI (Bank Negara Indonesia)',
          ),
          2 => 
          array (
            'kode_bank' => 'CIT',
            'nama_bank' => 'CITIBANK, N.A.',
          ),
          3 => 
          array (
            'kode_bank' => 'MEG',
            'nama_bank' => 'Bank Mega',
          ),
          4 => 
          array (
            'kode_bank' => 'SYB',
            'nama_bank' => 'BTN (Bank Tabungan Negara) ',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}