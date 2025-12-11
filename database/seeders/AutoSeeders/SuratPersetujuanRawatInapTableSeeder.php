<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratPersetujuanRawatInapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_rawat_inap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_rawat_inap')->insert(array (
          0 => 
          array (
            'no_surat' => 'PRI20250526001',
            'no_rawat' => '2025/05/26/000003',
            'tanggal' => '2025-05-26',
            'nama_pj' => '-',
            'no_ktppj' => '-',
            'pendidikan_pj' => 'TS',
            'alamatpj' => '-',
            'no_telppj' => '-',
            'ruang' => '-',
            'kelas' => 'Kelas 1',
            'hubungan' => 'Suami',
            'hak_kelas' => 'Kelas 1',
            'nama_alamat_keluarga_terdekat' => '-',
            'bayar_secara' => '-',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_surat' => 'PRI20250618001',
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-06-18',
            'nama_pj' => '-',
            'no_ktppj' => '-',
            'pendidikan_pj' => '-',
            'alamatpj' => '-',
            'no_telppj' => '-',
            'ruang' => '-',
            'kelas' => 'Kelas 1',
            'hubungan' => 'Suami',
            'hak_kelas' => 'Kelas 1',
            'nama_alamat_keluarga_terdekat' => '-',
            'bayar_secara' => '-',
            'nip' => '123124',
          ),
          2 => 
          array (
            'no_surat' => 'PRI20250628001',
            'no_rawat' => '2025/06/28/000001',
            'tanggal' => '2025-06-28',
            'nama_pj' => 'tes',
            'no_ktppj' => '1',
            'pendidikan_pj' => 'TS',
            'alamatpj' => '1',
            'no_telppj' => '1',
            'ruang' => '1',
            'kelas' => 'Kelas 1',
            'hubungan' => 'Suami',
            'hak_kelas' => 'Kelas 1',
            'nama_alamat_keluarga_terdekat' => '1',
            'bayar_secara' => '1',
            'nip' => '123124',
          ),
          3 => 
          array (
            'no_surat' => 'PRI20250630001',
            'no_rawat' => '2025/06/30/000001',
            'tanggal' => '2025-06-30',
            'nama_pj' => '-',
            'no_ktppj' => '-',
            'pendidikan_pj' => 'TS',
            'alamatpj' => '-',
            'no_telppj' => '0',
            'ruang' => '-',
            'kelas' => 'Kelas 1',
            'hubungan' => 'Suami',
            'hak_kelas' => 'Kelas 1',
            'nama_alamat_keluarga_terdekat' => '-',
            'bayar_secara' => '-',
            'nip' => '123124',
          ),
          4 => 
          array (
            'no_surat' => 'PRI20250707001',
            'no_rawat' => '2025/07/07/000001',
            'tanggal' => '2025-07-07',
            'nama_pj' => '-',
            'no_ktppj' => '-',
            'pendidikan_pj' => '-',
            'alamatpj' => '-',
            'no_telppj' => '-',
            'ruang' => '-',
            'kelas' => 'Kelas 1',
            'hubungan' => 'Suami',
            'hak_kelas' => 'Kelas 1',
            'nama_alamat_keluarga_terdekat' => '-',
            'bayar_secara' => '-',
            'nip' => '123124',
          ),
          5 => 
          array (
            'no_surat' => 'PRI20250729001',
            'no_rawat' => '2025/07/29/000002',
            'tanggal' => '2025-07-29',
            'nama_pj' => 'qwqwqw',
            'no_ktppj' => 'wqwqwqwqw',
            'pendidikan_pj' => 'TS',
            'alamatpj' => 'wqwqw',
            'no_telppj' => 'qwqw',
            'ruang' => '',
            'kelas' => 'Kelas 1',
            'hubungan' => 'Suami',
            'hak_kelas' => 'Kelas 1',
            'nama_alamat_keluarga_terdekat' => 'qwqw',
            'bayar_secara' => 'qwqw',
            'nip' => '123124',
          ),
          6 => 
          array (
            'no_surat' => 'PRI20250819001',
            'no_rawat' => '2025/08/19/000001',
            'tanggal' => '2025-08-19',
            'nama_pj' => '-',
            'no_ktppj' => '-',
            'pendidikan_pj' => 'TS',
            'alamatpj' => '-',
            'no_telppj' => '-',
            'ruang' => '-',
            'kelas' => 'Kelas 1',
            'hubungan' => 'Suami',
            'hak_kelas' => 'Kelas 1',
            'nama_alamat_keluarga_terdekat' => '-',
            'bayar_secara' => '-',
            'nip' => '12/09/1988/001',
          ),
          7 => 
          array (
            'no_surat' => 'PRI20250825001',
            'no_rawat' => '2025/08/25/000001',
            'tanggal' => '2025-08-25',
            'nama_pj' => '1212',
            'no_ktppj' => '1212',
            'pendidikan_pj' => 'TS',
            'alamatpj' => '1212',
            'no_telppj' => '212',
            'ruang' => '2122',
            'kelas' => 'Kelas 1',
            'hubungan' => 'Suami',
            'hak_kelas' => 'Kelas 1',
            'nama_alamat_keluarga_terdekat' => '1212',
            'bayar_secara' => '121212',
            'nip' => '12/09/1988/001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}