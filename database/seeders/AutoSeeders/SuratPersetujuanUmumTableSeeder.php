<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratPersetujuanUmumTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_umum')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_umum')->insert(array (
          0 => 
          array (
            'no_surat' => 'PSU20250427001',
            'no_rawat' => '2025/04/27/000002',
            'tanggal' => '2025-04-27',
            'pengobatan_kepada' => '-',
            'nilai_kepercayaan' => '',
            'nama_pj' => 'PARAMITA',
            'umur_pj' => '35 Th',
            'no_ktppj' => '21212',
            'jkpj' => 'L',
            'bertindak_atas' => 'Suami',
            'no_telp' => '121212',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_surat' => 'PSU20250427002',
            'no_rawat' => '2025/04/27/000001',
            'tanggal' => '2025-04-27',
            'pengobatan_kepada' => 'Suami',
            'nilai_kepercayaan' => 'TES',
            'nama_pj' => 'RUDI',
            'umur_pj' => '68 Th',
            'no_ktppj' => '-',
            'jkpj' => 'L',
            'bertindak_atas' => 'Diri Sendiri',
            'no_telp' => '-',
            'nip' => '123124',
          ),
          2 => 
          array (
            'no_surat' => 'PSU20250526001',
            'no_rawat' => '2025/05/26/000001',
            'tanggal' => '2025-05-26',
            'pengobatan_kepada' => 'Suami',
            'nilai_kepercayaan' => 'tes',
            'nama_pj' => 'tes',
            'umur_pj' => '68 Th',
            'no_ktppj' => '-',
            'jkpj' => 'L',
            'bertindak_atas' => 'Suami',
            'no_telp' => '989',
            'nip' => '123124',
          ),
          3 => 
          array (
            'no_surat' => 'PSU20250804001',
            'no_rawat' => '2025/08/04/000001',
            'tanggal' => '2025-08-04',
            'pengobatan_kepada' => 'Suami',
            'nilai_kepercayaan' => 'tes',
            'nama_pj' => '212',
            'umur_pj' => '8 Th',
            'no_ktppj' => '21212',
            'jkpj' => 'L',
            'bertindak_atas' => 'Suami',
            'no_telp' => '21212',
            'nip' => '12/09/1988/001',
          ),
          4 => 
          array (
            'no_surat' => 'PSU20250826001',
            'no_rawat' => '2025/08/26/000001',
            'tanggal' => '2025-08-26',
            'pengobatan_kepada' => 'Suami',
            'nilai_kepercayaan' => 'tes',
            'nama_pj' => '-',
            'umur_pj' => '38 Th',
            'no_ktppj' => '-',
            'jkpj' => 'L',
            'bertindak_atas' => 'Suami',
            'no_telp' => '-',
            'nip' => '01010101',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}