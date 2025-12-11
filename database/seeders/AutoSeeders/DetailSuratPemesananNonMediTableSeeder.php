<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailSuratPemesananNonMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_surat_pemesanan_non_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_surat_pemesanan_non_medis')->insert(array (
          0 => 
          array (
            'no_pemesanan' => 'SPM20250123001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'h_pesan' => 25984.9890000000013969838619232177734375,
            'subtotal' => 259849.890000000013969838619232177734375,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 259849.890000000013969838619232177734375,
          ),
          1 => 
          array (
            'no_pemesanan' => 'SPM20250123001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 10.0,
            'h_pesan' => 50551.74465300000156275928020477294921875,
            'subtotal' => 505517.4465300000156275928020477294921875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 505517.4465300000156275928020477294921875,
          ),
          2 => 
          array (
            'no_pemesanan' => 'SPM20250123001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 10.0,
            'h_pesan' => 66186.903185268747620284557342529296875,
            'subtotal' => 661869.03185268747620284557342529296875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 661869.03185268747620284557342529296875,
          ),
          3 => 
          array (
            'no_pemesanan' => 'SPM20250123002',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'h_pesan' => 25984.9890000000013969838619232177734375,
            'subtotal' => 259849.890000000013969838619232177734375,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 259849.890000000013969838619232177734375,
          ),
          4 => 
          array (
            'no_pemesanan' => 'SPM20250123002',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 5.0,
            'h_pesan' => 50551.74465300000156275928020477294921875,
            'subtotal' => 252758.72326500000781379640102386474609375,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 252758.72326500000781379640102386474609375,
          ),
          5 => 
          array (
            'no_pemesanan' => 'SPM20250130001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 30.0,
            'h_pesan' => 24000.0,
            'subtotal' => 720000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 720000.0,
          ),
          6 => 
          array (
            'no_pemesanan' => 'SPM20250130001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 20.0,
            'h_pesan' => 50000.0,
            'subtotal' => 1000000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 1000000.0,
          ),
          7 => 
          array (
            'no_pemesanan' => 'SPM20250130001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 50.0,
            'h_pesan' => 10000.0,
            'subtotal' => 500000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 500000.0,
          ),
          8 => 
          array (
            'no_pemesanan' => 'SPM20250813001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'h_pesan' => 28843.33779000000140513293445110321044921875,
            'subtotal' => 288433.3779000000213272869586944580078125,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 288433.3779000000213272869586944580078125,
          ),
          9 => 
          array (
            'no_pemesanan' => 'SPM20250813001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 5.0,
            'h_pesan' => 11100.0,
            'subtotal' => 55500.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 55500.0,
          ),
          10 => 
          array (
            'no_pemesanan' => 'SPM20250813001',
            'kode_brng' => 'B00004',
            'kode_sat' => 'BTL',
            'jumlah' => 10.0,
            'h_pesan' => 27803.45955915000013192184269428253173828125,
            'subtotal' => 278034.5955914999940432608127593994140625,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 278034.5955914999940432608127593994140625,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}