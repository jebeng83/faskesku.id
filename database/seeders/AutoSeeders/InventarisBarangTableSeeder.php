<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisBarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_barang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_barang')->insert(array (
          0 => 
          array (
            'kode_barang' => '000001',
            'nama_barang' => 'LCD SAMSUNG',
            'jml_barang' => 4,
            'kode_produsen' => 'PD00000005',
            'id_merk' => 'MI00005',
            'thn_produksi' => '2021',
            'isbn' => '-',
            'id_kategori' => 'EL',
            'id_jenis' => 'AK',
          ),
          1 => 
          array (
            'kode_barang' => '01',
            'nama_barang' => 'tes',
            'jml_barang' => 0,
            'kode_produsen' => 'PD00000001',
            'id_merk' => '-',
            'thn_produksi' => '2022',
            'isbn' => '-',
            'id_kategori' => '-',
            'id_jenis' => '-',
          ),
          2 => 
          array (
            'kode_barang' => 'BI00000002',
            'nama_barang' => 'BED PASIEN',
            'jml_barang' => 0,
            'kode_produsen' => 'CAKRA',
            'id_merk' => 'CK',
            'thn_produksi' => '2023',
            'isbn' => '097765655',
            'id_kategori' => 'KI003',
            'id_jenis' => 'JI004',
          ),
          3 => 
          array (
            'kode_barang' => 'BI00000003',
            'nama_barang' => 'KURSI MERAH',
            'jml_barang' => 0,
            'kode_produsen' => 'PD00000004',
            'id_merk' => 'CT',
            'thn_produksi' => '2024',
            'isbn' => '-',
            'id_kategori' => 'KI003',
            'id_jenis' => 'AK',
          ),
          4 => 
          array (
            'kode_barang' => 'BI00000004',
            'nama_barang' => 'TES UJICOBA',
            'jml_barang' => 0,
            'kode_produsen' => 'PD00000002',
            'id_merk' => 'CK',
            'thn_produksi' => '2026',
            'isbn' => '-',
            'id_kategori' => 'EL',
            'id_jenis' => 'JI001',
          ),
          5 => 
          array (
            'kode_barang' => 'BI00000005',
            'nama_barang' => 'MONITOR',
            'jml_barang' => 0,
            'kode_produsen' => 'PD00000006',
            'id_merk' => 'MSI',
            'thn_produksi' => '2026',
            'isbn' => '',
            'id_kategori' => 'EL',
            'id_jenis' => 'AK',
          ),
          6 => 
          array (
            'kode_barang' => 'BI00000006',
            'nama_barang' => 'PROYEKTOR',
            'jml_barang' => 0,
            'kode_produsen' => 'PD00000003',
            'id_merk' => 'MI00003',
            'thn_produksi' => '2026',
            'isbn' => '-',
            'id_kategori' => 'KI003',
            'id_jenis' => 'AK',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}