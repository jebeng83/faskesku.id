<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChecklistKesiapanAnestesiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('checklist_kesiapan_anestesi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('checklist_kesiapan_anestesi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-06-11 10:30:08',
            'nip' => '123124',
            'kd_dokter' => 'D0000003',
            'tindakan' => '1 asasas',
            'teknik_anestesi' => '2sas ',
            'listrik1' => 'Tidak',
            'listrik2' => 'Ya',
            'listrik3' => 'Tidak',
            'listrik4' => 'Ya',
            'gasmedis1' => 'Tidak',
            'gasmedis2' => 'Ya',
            'gasmedis3' => 'Tidak',
            'gasmedis4' => 'Ya',
            'gasmedis5' => 'Tidak',
            'gasmedis6' => 'Ya',
            'mesinanes1' => 'Tidak',
            'mesinanes2' => 'Ya',
            'mesinanes3' => 'Tidak',
            'mesinanes4' => 'Ya',
            'mesinanes5' => 'Tidak',
            'jalannapas1' => 'Ya',
            'jalannapas2' => 'Tidak',
            'jalannapas3' => 'Ya',
            'jalannapas4' => 'Tidak',
            'jalannapas5' => 'Ya',
            'jalannapas6' => 'Tidak',
            'jalannapas7' => 'Ya',
            'jalannapas8' => 'Tidak',
            'jalannapas9' => 'Ya',
            'lainlain1' => 'Tidak',
            'lainlain2' => 'Ya',
            'lainlain3' => 'Tidak',
            'lainlain4' => 'Ya',
            'lainlain5' => 'Tidak',
            'lainlain6' => 'Ya',
            'lainlain7' => 'Tidak',
            'lainlain8' => 'Ya',
            'obatobat1' => 'Tidak',
            'obatobat2' => 'Tidak',
            'obatobat3' => 'Tidak',
            'obatobat4' => 'Tidak',
            'obatobat5' => 'Tidak',
            'obatobat6' => 'Tidak',
            'keterangan_lainnya' => '3 sasasas',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}