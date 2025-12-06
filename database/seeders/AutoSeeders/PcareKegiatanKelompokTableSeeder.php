<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PcareKegiatanKelompokTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pcare_kegiatan_kelompok')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pcare_kegiatan_kelompok')->insert(array (
          0 => 
          array (
            'eduId' => '18100000009',
            'clubId' => '5565',
            'namaClub' => 'klinik',
            'tglPelayanan' => '2018-10-07',
            'nmKegiatan' => '10 Penyuluhan',
            'nmKelompok' => '01 Diabetes Melitus',
            'materi' => '-',
            'pembicara' => '-',
            'lokasi' => '-',
            'keterangan' => '-',
            'biaya' => 0.0,
          ),
          1 => 
          array (
            'eduId' => '19040000015',
            'clubId' => '5565',
            'namaClub' => 'klinik',
            'tglPelayanan' => '2019-04-30',
            'nmKegiatan' => '01 Senam',
            'nmKelompok' => '01 Diabetes Melitus',
            'materi' => '-',
            'pembicara' => '-',
            'lokasi' => '-',
            'keterangan' => '-',
            'biaya' => 0.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}