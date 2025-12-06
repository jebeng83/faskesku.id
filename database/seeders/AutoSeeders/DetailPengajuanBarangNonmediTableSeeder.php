<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPengajuanBarangNonmediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_pengajuan_barang_nonmedis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_pengajuan_barang_nonmedis')->insert(array (
          0 => 
          array (
            'no_pengajuan' => 'PBNM20250123001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'h_pengajuan' => 25984.9890000000013969838619232177734375,
            'total' => 259849.890000000013969838619232177734375,
          ),
          1 => 
          array (
            'no_pengajuan' => 'PBNM20250123001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 10.0,
            'h_pengajuan' => 50551.74465300000156275928020477294921875,
            'total' => 505517.4465300000156275928020477294921875,
          ),
          2 => 
          array (
            'no_pengajuan' => 'PBNM20250130001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'h_pengajuan' => 28843.33779000000140513293445110321044921875,
            'total' => 2884333.779000000096857547760009765625,
          ),
          3 => 
          array (
            'no_pengajuan' => 'PBNM20250130001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 20.0,
            'h_pengajuan' => 56112.436564830000861547887325286865234375,
            'total' => 1122248.73129660007543861865997314453125,
          ),
          4 => 
          array (
            'no_pengajuan' => 'PBNM20250130001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 50.0,
            'h_pengajuan' => 73467.4625356483156792819499969482421875,
            'total' => 3673373.1267824159003794193267822265625,
          ),
          5 => 
          array (
            'no_pengajuan' => 'PBNM20250619001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 100.0,
            'h_pengajuan' => 11100.0,
            'total' => 1110000.0,
          ),
          6 => 
          array (
            'no_pengajuan' => 'PBNM20250619001',
            'kode_brng' => 'B00004',
            'kode_sat' => 'BTL',
            'jumlah' => 100.0,
            'h_pengajuan' => 27803.45955915000013192184269428253173828125,
            'total' => 2780345.9559149998240172863006591796875,
          ),
          7 => 
          array (
            'no_pengajuan' => 'PBNM20250813001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'h_pengajuan' => 28843.33779000000140513293445110321044921875,
            'total' => 288433.3779000000213272869586944580078125,
          ),
          8 => 
          array (
            'no_pengajuan' => 'PBNM20250813001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 10.0,
            'h_pengajuan' => 11100.0,
            'total' => 111000.0,
          ),
          9 => 
          array (
            'no_pengajuan' => 'PBNM20250813001',
            'kode_brng' => 'B00004',
            'kode_sat' => 'BTL',
            'jumlah' => 10.0,
            'h_pengajuan' => 27803.45955915000013192184269428253173828125,
            'total' => 278034.5955914999940432608127593994140625,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}