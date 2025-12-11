<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PeminjampiutangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('peminjampiutang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('peminjampiutang')->insert(array (
          0 => 
          array (
            'kode_peminjam' => 'PP001',
            'nama_peminjam' => '-',
            'alamat' => '-',
            'no_telp' => '0',
            'kd_rek' => '117009',
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}