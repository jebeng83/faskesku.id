<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PersetujuanPenundaanPelayananTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('persetujuan_penundaan_pelayanan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('persetujuan_penundaan_pelayanan')->insert(array (
          0 => 
          array (
            'no_surat' => 'PPP20250729001',
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-07-29 14:25:47',
            'nama_pj' => '--',
            'umur_pj' => '-',
            'no_ktppj' => '-',
            'alamatpj' => '-',
            'no_telppj' => '-',
            'hubungan' => 'Suami',
            'ruang' => '-',
            'dokter_pengirim' => '-',
            'pelayanan_dilakukan' => '-',
            'ditunda_karena' => 'Kerusakan Alat',
            'keterangan_ditunda' => '-',
            'alternatif_diberikan' => 'Dijadwalkan Ulang',
            'keterangan_alternatif_diberikan' => '-',
            'nip' => '12/09/1988/001',
            'kd_dokter' => 'D0000003',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}