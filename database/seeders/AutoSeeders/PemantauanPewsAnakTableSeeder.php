<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PemantauanPewsAnakTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pemantauan_pews_anak')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pemantauan_pews_anak')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-08-11 16:24:17',
            'parameter_perilaku' => 'Tidak Merespon Terhadap Nyeri Penurunan Kesadaran',
            'skor_perilaku' => '3',
            'parameter_crt_atau_warna_kulit' => '>=5 dtk / Mottle',
            'skor_crt_atau_warna_kulit' => '3',
            'parameter_perespirasi' => 'Stridor / O2 7-8 Lpm',
            'skor_perespirasi' => '3',
            'skor_total' => '9',
            'parameter_total' => 'Laporkan perubahan klinis ke perawat ketua tim, dokter jaga dan DPJP. Kolaborasikan langkah selanjutnya dengan seluruh tim perawatan',
            'nip' => '12/09/1988/001',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tanggal' => '2025-08-11 09:20:14',
            'parameter_perilaku' => 'Tidak Merespon Terhadap Nyeri Penurunan Kesadaran',
            'skor_perilaku' => '3',
            'parameter_crt_atau_warna_kulit' => '>=5 dtk / Mottle',
            'skor_crt_atau_warna_kulit' => '3',
            'parameter_perespirasi' => 'Stridor / O2 7-8 Lpm',
            'skor_perespirasi' => '3',
            'skor_total' => '9',
            'parameter_total' => 'Laporkan perubahan klinis ke perawat ketua tim, dokter jaga dan DPJP. Kolaborasikan langkah selanjutnya dengan seluruh tim perawatan',
            'nip' => '01010101',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'tanggal' => '2025-07-08 11:36:11',
            'parameter_perilaku' => 'Tidak Merespon Terhadap Nyeri Penurunan Kesadaran',
            'skor_perilaku' => '3',
            'parameter_crt_atau_warna_kulit' => '>=5 dtk / Mottle',
            'skor_crt_atau_warna_kulit' => '3',
            'parameter_perespirasi' => 'Stridor / O2 7-8 Lpm',
            'skor_perespirasi' => '3',
            'skor_total' => '9',
            'parameter_total' => 'Laporkan perubahan klinis ke perawat ketua tim, dokter jaga dan DPJP. Kolaborasikan langkah selanjutnya dengan seluruh tim perawatan',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}