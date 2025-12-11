<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratPernyataanMemilihDpjpTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_pernyataan_memilih_dpjp')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_pernyataan_memilih_dpjp')->insert(array (
          0 => 
          array (
            'no_pernyataan' => 'DPJP20250722001',
            'no_rawat' => '2025/06/20/000003',
            'tanggal' => '2025-07-22',
            'kd_dokter' => 'D0000004',
            'nip' => '123124',
            'pembuat_pernyataan' => 'SETIYAWAN KRISTANTO',
            'alamat_pembuat_pernyataan' => 'JL. DOKTER CIPTI RT 01/RW01, BEDALI, LAWANG, KABUPATEN MALANG',
            'tgl_lahir_pembuat_pernyataan' => '1960-02-21',
            'jk_pembuat_pernyataan' => 'L',
            'hubungan_pembuat_pernyataan' => 'Diri Sendiri',
            'saksi_keluarga' => 'tes',
          ),
          1 => 
          array (
            'no_pernyataan' => 'DPJP20250723001',
            'no_rawat' => '2025/07/08/000001',
            'tanggal' => '2025-07-24',
            'kd_dokter' => 'D0000004',
            'nip' => '123124',
            'pembuat_pernyataan' => 'RAHMA NIA',
            'alamat_pembuat_pernyataan' => 'RT 01 RW 02, CISARANTEN ENDAH, ARCAMANIK, KOTA BANDUNG',
            'tgl_lahir_pembuat_pernyataan' => '2025-07-24',
            'jk_pembuat_pernyataan' => 'P',
            'hubungan_pembuat_pernyataan' => 'Diri Sendiri',
            'saksi_keluarga' => 'tes ok',
          ),
          2 => 
          array (
            'no_pernyataan' => 'DPJP20250728001',
            'no_rawat' => '2025/04/27/000001',
            'tanggal' => '2025-07-28',
            'kd_dokter' => 'D0000004',
            'nip' => '123124',
            'pembuat_pernyataan' => 'RUDI SANTOSO',
            'alamat_pembuat_pernyataan' => 'TES, KEDUNGWARU, PREMBUN, KABUPATEN KEBUMEN',
            'tgl_lahir_pembuat_pernyataan' => '1957-03-11',
            'jk_pembuat_pernyataan' => 'P',
            'hubungan_pembuat_pernyataan' => 'Diri Sendiri',
            'saksi_keluarga' => '-',
          ),
          3 => 
          array (
            'no_pernyataan' => 'DPJP20250804001',
            'no_rawat' => '2025/08/04/000001',
            'tanggal' => '2025-08-04',
            'kd_dokter' => 'D0000004',
            'nip' => '123124',
            'pembuat_pernyataan' => 'SAKHA HAMIZAN AQILA',
            'alamat_pembuat_pernyataan' => 'PAJANGAN BANTUL, -, -, -',
            'tgl_lahir_pembuat_pernyataan' => '2017-08-03',
            'jk_pembuat_pernyataan' => 'L',
            'hubungan_pembuat_pernyataan' => 'Diri Sendiri',
            'saksi_keluarga' => '-',
          ),
          4 => 
          array (
            'no_pernyataan' => 'DPJP20250819001',
            'no_rawat' => '2025/08/19/000001',
            'tanggal' => '2025-08-19',
            'kd_dokter' => 'D0000004',
            'nip' => '123124',
            'pembuat_pernyataan' => 'RUDI SANTOSO',
            'alamat_pembuat_pernyataan' => 'TES, KEDUNGWARU, PREMBUN, KABUPATEN KEBUMEN',
            'tgl_lahir_pembuat_pernyataan' => '1957-03-11',
            'jk_pembuat_pernyataan' => 'P',
            'hubungan_pembuat_pernyataan' => 'Diri Sendiri',
            'saksi_keluarga' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}