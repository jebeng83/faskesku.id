<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPengajuanBarangMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_pengajuan_barang_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_pengajuan_barang_medis')->insert(array (
          0 => 
          array (
            'no_pengajuan' => 'PBM20241116001',
            'kode_brng' => 'B000001294',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 14641.0,
            'total' => 1464100.0,
            'jumlah2' => 100.0,
          ),
          1 => 
          array (
            'no_pengajuan' => 'PBM20241116001',
            'kode_brng' => 'B000001597',
            'kode_sat' => 'BOX',
            'jumlah' => 100.0,
            'h_pengajuan' => 72939.0,
            'total' => 7293900.0,
            'jumlah2' => 100.0,
          ),
          2 => 
          array (
            'no_pengajuan' => 'PBM20241116001',
            'kode_brng' => 'B000000561',
            'kode_sat' => 'BTL',
            'jumlah' => 100.0,
            'h_pengajuan' => 23100.0,
            'total' => 2310000.0,
            'jumlah2' => 100.0,
          ),
          3 => 
          array (
            'no_pengajuan' => 'PBM20241119001',
            'kode_brng' => 'B000000640',
            'kode_sat' => 'BTL',
            'jumlah' => 100.0,
            'h_pengajuan' => 23100.0,
            'total' => 2310000.0,
            'jumlah2' => 100.0,
          ),
          4 => 
          array (
            'no_pengajuan' => 'PBM20241119001',
            'kode_brng' => 'B000000641',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 17050.0,
            'total' => 1705000.0,
            'jumlah2' => 100.0,
          ),
          5 => 
          array (
            'no_pengajuan' => 'PBM20241119001',
            'kode_brng' => 'B000000644',
            'kode_sat' => 'MIN',
            'jumlah' => 100.0,
            'h_pengajuan' => 16225.0,
            'total' => 1622500.0,
            'jumlah2' => 100.0,
          ),
          6 => 
          array (
            'no_pengajuan' => 'PBM20241121001',
            'kode_brng' => 'B000000593',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 244.0,
            'total' => 24400.0,
            'jumlah2' => 100.0,
          ),
          7 => 
          array (
            'no_pengajuan' => 'PBM20241121001',
            'kode_brng' => 'B000001285',
            'kode_sat' => 'CAP',
            'jumlah' => 100.0,
            'h_pengajuan' => 7638.0,
            'total' => 763800.0,
            'jumlah2' => 100.0,
          ),
          8 => 
          array (
            'no_pengajuan' => 'PBM20241121001',
            'kode_brng' => 'B000001552',
            'kode_sat' => 'SYR',
            'jumlah' => 100.0,
            'h_pengajuan' => 18200.0,
            'total' => 1820000.0,
            'jumlah2' => 100.0,
          ),
          9 => 
          array (
            'no_pengajuan' => 'PBM20241121001',
            'kode_brng' => 'B000000604',
            'kode_sat' => 'SYR',
            'jumlah' => 100.0,
            'h_pengajuan' => 27500.0,
            'total' => 2750000.0,
            'jumlah2' => 100.0,
          ),
          10 => 
          array (
            'no_pengajuan' => 'PBM20241122001',
            'kode_brng' => 'B000002014',
            'kode_sat' => 'CAP',
            'jumlah' => 100.0,
            'h_pengajuan' => 11500.0,
            'total' => 1150000.0,
            'jumlah2' => 100.0,
          ),
          11 => 
          array (
            'no_pengajuan' => 'PBM20241122001',
            'kode_brng' => 'B000001519',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 4400.0,
            'total' => 440000.0,
            'jumlah2' => 100.0,
          ),
          12 => 
          array (
            'no_pengajuan' => 'PBM20241122001',
            'kode_brng' => 'B000001951',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'h_pengajuan' => 129000.0,
            'total' => 12900000.0,
            'jumlah2' => 100.0,
          ),
          13 => 
          array (
            'no_pengajuan' => 'PBM20241210001',
            'kode_brng' => 'B000001424',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'h_pengajuan' => 14575.0,
            'total' => 1457500.0,
            'jumlah2' => 100.0,
          ),
          14 => 
          array (
            'no_pengajuan' => 'PBM20241210001',
            'kode_brng' => 'B000001383',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 9350.0,
            'total' => 935000.0,
            'jumlah2' => 100.0,
          ),
          15 => 
          array (
            'no_pengajuan' => 'PBM20241210001',
            'kode_brng' => 'B000000656',
            'kode_sat' => 'AMP5',
            'jumlah' => 100.0,
            'h_pengajuan' => 216450.0,
            'total' => 21645000.0,
            'jumlah2' => 100.0,
          ),
          16 => 
          array (
            'no_pengajuan' => 'PBM20250107001',
            'kode_brng' => 'B000001424',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'h_pengajuan' => 16178.0,
            'total' => 161780.0,
            'jumlah2' => 10.0,
          ),
          17 => 
          array (
            'no_pengajuan' => 'PBM20250107001',
            'kode_brng' => 'B000001856',
            'kode_sat' => 'KAP',
            'jumlah' => 100.0,
            'h_pengajuan' => 4950.0,
            'total' => 495000.0,
            'jumlah2' => 100.0,
          ),
          18 => 
          array (
            'no_pengajuan' => 'PBM20250107001',
            'kode_brng' => 'B000000623',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 99.0,
            'total' => 9900.0,
            'jumlah2' => 100.0,
          ),
          19 => 
          array (
            'no_pengajuan' => 'PBM20250107001',
            'kode_brng' => 'B000000625',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 7722.0,
            'total' => 772200.0,
            'jumlah2' => 100.0,
          ),
          20 => 
          array (
            'no_pengajuan' => 'PBM20250115001',
            'kode_brng' => 'B000000226',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 5500.0,
            'total' => 550000.0,
            'jumlah2' => 100.0,
          ),
          21 => 
          array (
            'no_pengajuan' => 'PBM20250115001',
            'kode_brng' => 'B000001617',
            'kode_sat' => 'AMP5',
            'jumlah' => 100.0,
            'h_pengajuan' => 91500.0,
            'total' => 9150000.0,
            'jumlah2' => 100.0,
          ),
          22 => 
          array (
            'no_pengajuan' => 'PBM20250115001',
            'kode_brng' => 'B000001904',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 15000.0,
            'total' => 1500000.0,
            'jumlah2' => 100.0,
          ),
          23 => 
          array (
            'no_pengajuan' => 'PBM20250121001',
            'kode_brng' => 'B000000461',
            'kode_sat' => 'GEL',
            'jumlah' => 100.0,
            'h_pengajuan' => 15950.0,
            'total' => 1595000.0,
            'jumlah2' => 100.0,
          ),
          24 => 
          array (
            'no_pengajuan' => 'PBM20250121001',
            'kode_brng' => 'B000001507',
            'kode_sat' => 'BTL',
            'jumlah' => 100.0,
            'h_pengajuan' => 70400.0,
            'total' => 7040000.0,
            'jumlah2' => 100.0,
          ),
          25 => 
          array (
            'no_pengajuan' => 'PBM20250121001',
            'kode_brng' => 'B000001579',
            'kode_sat' => 'BTL',
            'jumlah' => 100.0,
            'h_pengajuan' => 79750.0,
            'total' => 7975000.0,
            'jumlah2' => 100.0,
          ),
          26 => 
          array (
            'no_pengajuan' => 'PBM20250130001',
            'kode_brng' => 'B000001735',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 5497.0,
            'total' => 549700.0,
            'jumlah2' => 100.0,
          ),
          27 => 
          array (
            'no_pengajuan' => 'PBM20250130001',
            'kode_brng' => 'B000001174',
            'kode_sat' => 'AMP5',
            'jumlah' => 30.0,
            'h_pengajuan' => 205370.0,
            'total' => 6161100.0,
            'jumlah2' => 30.0,
          ),
          28 => 
          array (
            'no_pengajuan' => 'PBM20250130001',
            'kode_brng' => 'B000000637',
            'kode_sat' => 'AMP5',
            'jumlah' => 20.0,
            'h_pengajuan' => 22000.0,
            'total' => 440000.0,
            'jumlah2' => 20.0,
          ),
          29 => 
          array (
            'no_pengajuan' => 'PBM20250130002',
            'kode_brng' => 'B000001941',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 270.0,
            'total' => 27000.0,
            'jumlah2' => 100.0,
          ),
          30 => 
          array (
            'no_pengajuan' => 'PBM20250130002',
            'kode_brng' => 'B000000671',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 605.0,
            'total' => 60500.0,
            'jumlah2' => 100.0,
          ),
          31 => 
          array (
            'no_pengajuan' => 'PBM20250130002',
            'kode_brng' => 'B000000433',
            'kode_sat' => 'SYR',
            'jumlah' => 100.0,
            'h_pengajuan' => 61710.0,
            'total' => 6171000.0,
            'jumlah2' => 100.0,
          ),
          32 => 
          array (
            'no_pengajuan' => 'PBM20250130002',
            'kode_brng' => 'B000000729',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 3232.0,
            'total' => 323200.0,
            'jumlah2' => 100.0,
          ),
          33 => 
          array (
            'no_pengajuan' => 'PBM20250211001',
            'kode_brng' => 'B000001666',
            'kode_sat' => 'BOX',
            'jumlah' => 10.0,
            'h_pengajuan' => 1540000.0,
            'total' => 15400000.0,
            'jumlah2' => 10.0,
          ),
          34 => 
          array (
            'no_pengajuan' => 'PBM20250211001',
            'kode_brng' => 'B000000450',
            'kode_sat' => 'SAC',
            'jumlah' => 100.0,
            'h_pengajuan' => 60500.0,
            'total' => 6050000.0,
            'jumlah2' => 100.0,
          ),
          35 => 
          array (
            'no_pengajuan' => 'PBM20250211001',
            'kode_brng' => 'B000000224',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 7700.0,
            'total' => 770000.0,
            'jumlah2' => 100.0,
          ),
          36 => 
          array (
            'no_pengajuan' => 'PBM20250211002',
            'kode_brng' => 'B000001424',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'h_pengajuan' => 16178.0,
            'total' => 1617800.0,
            'jumlah2' => 100.0,
          ),
          37 => 
          array (
            'no_pengajuan' => 'PBM20250211002',
            'kode_brng' => 'B000000409',
            'kode_sat' => 'BTL',
            'jumlah' => 100.0,
            'h_pengajuan' => 10450.0,
            'total' => 1045000.0,
            'jumlah2' => 100.0,
          ),
          38 => 
          array (
            'no_pengajuan' => 'PBM20250211002',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 100.0,
            'h_pengajuan' => 70000.0,
            'total' => 7000000.0,
            'jumlah2' => 100.0,
          ),
          39 => 
          array (
            'no_pengajuan' => 'PBM20250211002',
            'kode_brng' => 'A000000003',
            'kode_sat' => 'GLN',
            'jumlah' => 100.0,
            'h_pengajuan' => 236500.0,
            'total' => 23650000.0,
            'jumlah2' => 100.0,
          ),
          40 => 
          array (
            'no_pengajuan' => 'PBM20250211002',
            'kode_brng' => 'B000001809',
            'kode_sat' => 'BKS',
            'jumlah' => 200.0,
            'h_pengajuan' => 400.0,
            'total' => 80000.0,
            'jumlah2' => 200.0,
          ),
          41 => 
          array (
            'no_pengajuan' => 'PBM20250414001',
            'kode_brng' => 'B000000623',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 99.0,
            'total' => 9900.0,
            'jumlah2' => 100.0,
          ),
          42 => 
          array (
            'no_pengajuan' => 'PBM20250414001',
            'kode_brng' => 'B000001656',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 1600.0,
            'total' => 160000.0,
            'jumlah2' => 100.0,
          ),
          43 => 
          array (
            'no_pengajuan' => 'PBM20250414001',
            'kode_brng' => 'B000000424',
            'kode_sat' => 'AMP5',
            'jumlah' => 100.0,
            'h_pengajuan' => 60500.0,
            'total' => 6050000.0,
            'jumlah2' => 100.0,
          ),
          44 => 
          array (
            'no_pengajuan' => 'PBM20250603001',
            'kode_brng' => 'B000001659',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 539.0,
            'total' => 53900.0,
            'jumlah2' => 100.0,
          ),
          45 => 
          array (
            'no_pengajuan' => 'PBM20250603001',
            'kode_brng' => 'B000000569',
            'kode_sat' => 'INF',
            'jumlah' => 100.0,
            'h_pengajuan' => 133200.0,
            'total' => 13320000.0,
            'jumlah2' => 100.0,
          ),
          46 => 
          array (
            'no_pengajuan' => 'PBM20250611001',
            'kode_brng' => 'B000000587',
            'kode_sat' => 'TAB',
            'jumlah' => 200.0,
            'h_pengajuan' => 1705.0,
            'total' => 341000.0,
            'jumlah2' => 200.0,
          ),
          47 => 
          array (
            'no_pengajuan' => 'PBM20250611001',
            'kode_brng' => 'B000001285',
            'kode_sat' => 'CAP',
            'jumlah' => 200.0,
            'h_pengajuan' => 7638.0,
            'total' => 1527600.0,
            'jumlah2' => 200.0,
          ),
          48 => 
          array (
            'no_pengajuan' => 'PBM20250611001',
            'kode_brng' => 'B000001254',
            'kode_sat' => 'TAB',
            'jumlah' => 60.0,
            'h_pengajuan' => 10450.0,
            'total' => 627000.0,
            'jumlah2' => 60.0,
          ),
          49 => 
          array (
            'no_pengajuan' => 'PBM20250611001',
            'kode_brng' => 'B000001700',
            'kode_sat' => 'TAB',
            'jumlah' => 70.0,
            'h_pengajuan' => 3552.0,
            'total' => 248640.0,
            'jumlah2' => 70.0,
          ),
          50 => 
          array (
            'no_pengajuan' => 'PBM20250618001',
            'kode_brng' => 'B000001597',
            'kode_sat' => 'BOX',
            'jumlah' => 100.0,
            'h_pengajuan' => 72939.0,
            'total' => 7293900.0,
            'jumlah2' => 100.0,
          ),
          51 => 
          array (
            'no_pengajuan' => 'PBM20250618001',
            'kode_brng' => 'B000001880',
            'kode_sat' => 'BTL',
            'jumlah' => 20.0,
            'h_pengajuan' => 1602000.0,
            'total' => 32040000.0,
            'jumlah2' => 20.0,
          ),
          52 => 
          array (
            'no_pengajuan' => 'PBM20250618001',
            'kode_brng' => 'B000000584',
            'kode_sat' => 'AMP5',
            'jumlah' => 20.0,
            'h_pengajuan' => 1467.0,
            'total' => 29340.0,
            'jumlah2' => 20.0,
          ),
          53 => 
          array (
            'no_pengajuan' => 'PBM20250630001',
            'kode_brng' => 'A000000102',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'h_pengajuan' => 1500.0,
            'total' => 150000.0,
            'jumlah2' => 100.0,
          ),
          54 => 
          array (
            'no_pengajuan' => 'PBM20250630001',
            'kode_brng' => 'B000001902',
            'kode_sat' => 'CC',
            'jumlah' => 100.0,
            'h_pengajuan' => 18000.0,
            'total' => 1800000.0,
            'jumlah2' => 100.0,
          ),
          55 => 
          array (
            'no_pengajuan' => 'PBM20250630001',
            'kode_brng' => 'B000001406',
            'kode_sat' => 'PCS',
            'jumlah' => 50.0,
            'h_pengajuan' => 38000.0,
            'total' => 1900000.0,
            'jumlah2' => 50.0,
          ),
          56 => 
          array (
            'no_pengajuan' => 'PBM20250630001',
            'kode_brng' => 'A000000116',
            'kode_sat' => 'PCS',
            'jumlah' => 30.0,
            'h_pengajuan' => 78000.0,
            'total' => 2340000.0,
            'jumlah2' => 30.0,
          ),
          57 => 
          array (
            'no_pengajuan' => 'PBM20250630001',
            'kode_brng' => 'A000000104',
            'kode_sat' => 'PCS',
            'jumlah' => 20.0,
            'h_pengajuan' => 30000.0,
            'total' => 600000.0,
            'jumlah2' => 20.0,
          ),
          58 => 
          array (
            'no_pengajuan' => 'PBM20250708001',
            'kode_brng' => 'B000001880',
            'kode_sat' => 'BTL',
            'jumlah' => 5.0,
            'h_pengajuan' => 1602000.0,
            'total' => 8010000.0,
            'jumlah2' => 5.0,
          ),
          59 => 
          array (
            'no_pengajuan' => 'PBM20250708001',
            'kode_brng' => 'B000000450',
            'kode_sat' => 'SAC',
            'jumlah' => 100.0,
            'h_pengajuan' => 60500.0,
            'total' => 6050000.0,
            'jumlah2' => 100.0,
          ),
          60 => 
          array (
            'no_pengajuan' => 'PBM20250708001',
            'kode_brng' => 'B000001211',
            'kode_sat' => 'SAC',
            'jumlah' => 100.0,
            'h_pengajuan' => 60500.0,
            'total' => 6050000.0,
            'jumlah2' => 100.0,
          ),
          61 => 
          array (
            'no_pengajuan' => 'PBM20250719001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'jumlah' => 10.0,
            'h_pengajuan' => 1139.121311999999988984200172126293182373046875,
            'total' => 11391.21312000000034458935260772705078125,
            'jumlah2' => 10.0,
          ),
          62 => 
          array (
            'no_pengajuan' => 'PBM20250719001',
            'kode_brng' => 'B000000557',
            'kode_sat' => 'TAB',
            'jumlah' => 10.0,
            'h_pengajuan' => 926.0,
            'total' => 9260.0,
            'jumlah2' => 10.0,
          ),
          63 => 
          array (
            'no_pengajuan' => 'PBM20250719001',
            'kode_brng' => 'B000000560',
            'kode_sat' => 'CAP',
            'jumlah' => 100.0,
            'h_pengajuan' => 9751.0,
            'total' => 975100.0,
            'jumlah2' => 100.0,
          ),
          64 => 
          array (
            'no_pengajuan' => 'PBM20250724001',
            'kode_brng' => 'B000000568',
            'kode_sat' => 'AMP5',
            'jumlah' => 1000.0,
            'h_pengajuan' => 3959.88999999999987267074175179004669189453125,
            'total' => 3959890.0,
            'jumlah2' => 1000.0,
          ),
          65 => 
          array (
            'no_pengajuan' => 'PBM20250724001',
            'kode_brng' => 'A000000125',
            'kode_sat' => 'AMP5',
            'jumlah' => 1000.0,
            'h_pengajuan' => 173800.0,
            'total' => 173800000.0,
            'jumlah2' => 1000.0,
          ),
          66 => 
          array (
            'no_pengajuan' => 'PBM20250724001',
            'kode_brng' => 'B000000579',
            'kode_sat' => 'TAB',
            'jumlah' => 1000.0,
            'h_pengajuan' => 770.0,
            'total' => 770000.0,
            'jumlah2' => 1000.0,
          ),
          67 => 
          array (
            'no_pengajuan' => 'PBM20250805001',
            'kode_brng' => 'B000001990',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 8000.0,
            'total' => 800000.0,
            'jumlah2' => 100.0,
          ),
          68 => 
          array (
            'no_pengajuan' => 'PBM20250805001',
            'kode_brng' => 'B000000624',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 151.80000000000001136868377216160297393798828125,
            'total' => 15180.000000000001818989403545856475830078125,
            'jumlah2' => 100.0,
          ),
          69 => 
          array (
            'no_pengajuan' => 'PBM20250805001',
            'kode_brng' => 'B000001814',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 7000.0,
            'total' => 700000.0,
            'jumlah2' => 100.0,
          ),
          70 => 
          array (
            'no_pengajuan' => 'PBM20250805002',
            'kode_brng' => 'B000000425',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 2420.0,
            'total' => 242000.0,
            'jumlah2' => 100.0,
          ),
          71 => 
          array (
            'no_pengajuan' => 'PBM20250805002',
            'kode_brng' => 'B000000659',
            'kode_sat' => 'AMP5',
            'jumlah' => 100.0,
            'h_pengajuan' => 22095.0,
            'total' => 2209500.0,
            'jumlah2' => 100.0,
          ),
          72 => 
          array (
            'no_pengajuan' => 'PBM20250805002',
            'kode_brng' => 'B000000662',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 473.0,
            'total' => 47300.0,
            'jumlah2' => 100.0,
          ),
          73 => 
          array (
            'no_pengajuan' => 'PBM20250812001',
            'kode_brng' => 'B000000579',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 770.0,
            'total' => 77000.0,
            'jumlah2' => 100.0,
          ),
          74 => 
          array (
            'no_pengajuan' => 'PBM20250812001',
            'kode_brng' => 'B000008024',
            'kode_sat' => 'GLN',
            'jumlah' => 10.0,
            'h_pengajuan' => 1400000.0,
            'total' => 14000000.0,
            'jumlah2' => 10.0,
          ),
          75 => 
          array (
            'no_pengajuan' => 'PBM20250812001',
            'kode_brng' => 'B000001659',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 539.0,
            'total' => 53900.0,
            'jumlah2' => 100.0,
          ),
          76 => 
          array (
            'no_pengajuan' => 'PBM20250825001',
            'kode_brng' => 'B000001701',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 4950.0,
            'total' => 495000.0,
            'jumlah2' => 100.0,
          ),
          77 => 
          array (
            'no_pengajuan' => 'PBM20250825001',
            'kode_brng' => 'B000000160',
            'kode_sat' => 'AMP5',
            'jumlah' => 10.0,
            'h_pengajuan' => 5500.0,
            'total' => 55000.0,
            'jumlah2' => 10.0,
          ),
          78 => 
          array (
            'no_pengajuan' => 'PBM20250825001',
            'kode_brng' => 'B000000235',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'h_pengajuan' => 15400.0,
            'total' => 1540000.0,
            'jumlah2' => 100.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}