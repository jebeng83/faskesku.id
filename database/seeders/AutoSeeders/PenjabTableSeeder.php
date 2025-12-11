<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenjabTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penjab')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penjab')->insert(array (
          0 => 
          array (
            'kd_pj' => '-',
            'png_jawab' => '-',
            'nama_perusahaan' => '-',
            'alamat_asuransi' => '-',
            'no_telp' => '-',
            'attn' => '',
            'status' => '1',
          ),
          1 => 
          array (
            'kd_pj' => 'A04',
            'png_jawab' => 'Asuransi Axa Financial',
            'nama_perusahaan' => '2121',
            'alamat_asuransi' => '21221',
            'no_telp' => '121212',
            'attn' => '21212',
            'status' => '1',
          ),
          2 => 
          array (
            'kd_pj' => 'A06',
            'png_jawab' => 'Asuransi Garda Medika',
            'nama_perusahaan' => '-',
            'alamat_asuransi' => '-',
            'no_telp' => '-',
            'attn' => '-',
            'status' => '1',
          ),
          3 => 
          array (
            'kd_pj' => 'A07',
            'png_jawab' => 'Asuransi Axa Services/Mandiri',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
          ),
          4 => 
          array (
            'kd_pj' => 'A08',
            'png_jawab' => 'Asuransi BNI Life',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
          ),
          5 => 
          array (
            'kd_pj' => 'A09',
            'png_jawab' => 'UMUM',
            'nama_perusahaan' => '-',
            'alamat_asuransi' => '-',
            'no_telp' => '-',
            'attn' => '-',
            'status' => '1',
          ),
          6 => 
          array (
            'kd_pj' => 'A17',
            'png_jawab' => 'Asuransi Manulife',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
          ),
          7 => 
          array (
            'kd_pj' => 'A19',
            'png_jawab' => 'Asuransi Lippo',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
          ),
          8 => 
          array (
            'kd_pj' => 'A20',
            'png_jawab' => 'Asuransi Adira ( Medicillin )',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
          ),
          9 => 
          array (
            'kd_pj' => 'A22',
            'png_jawab' => 'Asuransi Mega',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '0',
          ),
          10 => 
          array (
            'kd_pj' => 'A23',
            'png_jawab' => 'DINAS SOSIAL',
            'nama_perusahaan' => 'DINAS SOSIAL',
            'alamat_asuransi' => 'LEBAK',
            'no_telp' => '1213131',
            'attn' => 'BU BERTA',
            'status' => '1',
          ),
          11 => 
          array (
            'kd_pj' => 'A24',
            'png_jawab' => 'JASA RAHARJA',
            'nama_perusahaan' => '-',
            'alamat_asuransi' => '-',
            'no_telp' => '0',
            'attn' => '-',
            'status' => '1',
          ),
          12 => 
          array (
            'kd_pj' => 'A25',
            'png_jawab' => 'Asuransi Astra Aviva Life',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
          ),
          13 => 
          array (
            'kd_pj' => 'A26',
            'png_jawab' => 'Asuransi Avrist',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '0',
          ),
          14 => 
          array (
            'kd_pj' => 'A30',
            'png_jawab' => 'PT. PLN ADMEDIKA',
            'nama_perusahaan' => 'PLN INDONESIA',
            'alamat_asuransi' => 'JAKARTA',
            'no_telp' => '010101',
            'attn' => 'WAHYU PRABOWO',
            'status' => '1',
          ),
          15 => 
          array (
            'kd_pj' => 'A32',
            'png_jawab' => 'TMS Healthcare',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '0',
          ),
          16 => 
          array (
            'kd_pj' => 'A33',
            'png_jawab' => 'Asuransi Sinarmas',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '0',
          ),
          17 => 
          array (
            'kd_pj' => 'A36',
            'png_jawab' => 'Cynergy Care',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
          ),
          18 => 
          array (
            'kd_pj' => 'A38',
            'png_jawab' => 'Asuransi Tugu Mandiri',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '0',
          ),
          19 => 
          array (
            'kd_pj' => 'A42',
            'png_jawab' => 'Asuransi ABDA',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '0',
          ),
          20 => 
          array (
            'kd_pj' => 'A58',
            'png_jawab' => 'Asuransi FWD',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
          ),
          21 => 
          array (
            'kd_pj' => 'A59',
            'png_jawab' => 'JumatBerkah',
            'nama_perusahaan' => 'Bagus',
            'alamat_asuransi' => 'Sekolah',
            'no_telp' => '085229977208',
            'attn' => '0',
            'status' => '1',
          ),
          22 => 
          array (
            'kd_pj' => 'A60',
            'png_jawab' => 'PAK YANTO',
            'nama_perusahaan' => 'YANTO SEHAT',
            'alamat_asuransi' => 'SOLO',
            'no_telp' => '0271',
            'attn' => '0',
            'status' => '1',
          ),
          23 => 
          array (
            'kd_pj' => 'AKA',
            'png_jawab' => 'PT KERETA API',
            'nama_perusahaan' => 'PT KERETA API',
            'alamat_asuransi' => '-',
            'no_telp' => '0',
            'attn' => '-',
            'status' => '1',
          ),
          24 => 
          array (
            'kd_pj' => 'B00',
            'png_jawab' => 'Asuransi AIA',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
          ),
          25 => 
          array (
            'kd_pj' => 'B1',
            'png_jawab' => 'Asuransi / Pihak ke - III',
            'nama_perusahaan' => '',
            'alamat_asuransi' => '',
            'no_telp' => '',
            'attn' => '',
            'status' => '1',
          ),
          26 => 
          array (
            'kd_pj' => 'BPJ',
            'png_jawab' => 'BPJS',
            'nama_perusahaan' => '-',
            'alamat_asuransi' => '-',
            'no_telp' => '-',
            'attn' => '-',
            'status' => '1',
          ),
          27 => 
          array (
            'kd_pj' => 'PJ1',
            'png_jawab' => 'BPJS Kesehatan',
            'nama_perusahaan' => 'BPJS Kesehatan',
            'alamat_asuransi' => 'Jl. Letjen MT Haryono Kav. 4-5, Jakarta Selatan',
            'no_telp' => '1500400',
            'attn' => 'BPJS Kesehatan',
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}