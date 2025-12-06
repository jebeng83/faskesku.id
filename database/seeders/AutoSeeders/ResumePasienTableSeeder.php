<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResumePasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('resume_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('resume_pasien')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'kd_dokter' => 'D0000004',
            'keluhan_utama' => 'mata merah, akral dingin, ',
            'jalannya_penyakit' => '1212',
            'pemeriksaan_penunjang' => 'tes 1
        
        tes 2
        
        tes 3, ',
            'hasil_laborat' => 'Hemoglobin : 1212, LED : 12, MCV : 21, ',
            'diagnosa_utama' => 'tes',
            'kd_diagnosa_utama' => 'A00.0',
            'diagnosa_sekunder' => '',
            'kd_diagnosa_sekunder' => '',
            'diagnosa_sekunder2' => '',
            'kd_diagnosa_sekunder2' => '',
            'diagnosa_sekunder3' => '',
            'kd_diagnosa_sekunder3' => '',
            'diagnosa_sekunder4' => '',
            'kd_diagnosa_sekunder4' => '',
            'prosedur_utama' => 'Therapeutic ultrasound of peripheral vascular vessels',
            'kd_prosedur_utama' => '00.03',
            'prosedur_sekunder' => '',
            'kd_prosedur_sekunder' => '',
            'prosedur_sekunder2' => '',
            'kd_prosedur_sekunder2' => '',
            'prosedur_sekunder3' => '',
            'kd_prosedur_sekunder3' => '',
            'kondisi_pulang' => 'Hidup',
            'obat_pulang' => 'Ibuprofen 200 mg : 10.0 SYR 2 x 1, ',
          ),
          1 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'kd_dokter' => 'D0000003',
            'keluhan_utama' => 'SUBJECK, mata merah, akral dingin, ',
            'jalannya_penyakit' => 'eerer',
            'pemeriksaan_penunjang' => 'tes 1
        
        tes 2
        
        tes 3, ',
            'hasil_laborat' => 'Hemoglobin : wqwq, Golongan Darah : 12122, MCH : w21, ',
            'diagnosa_utama' => 'jantung',
            'kd_diagnosa_utama' => 'D00.1',
            'diagnosa_sekunder' => '',
            'kd_diagnosa_sekunder' => '',
            'diagnosa_sekunder2' => '',
            'kd_diagnosa_sekunder2' => '',
            'diagnosa_sekunder3' => '',
            'kd_diagnosa_sekunder3' => '',
            'diagnosa_sekunder4' => '',
            'kd_diagnosa_sekunder4' => '',
            'prosedur_utama' => '',
            'kd_prosedur_utama' => '',
            'prosedur_sekunder' => '',
            'kd_prosedur_sekunder' => '',
            'prosedur_sekunder2' => '',
            'kd_prosedur_sekunder2' => '',
            'prosedur_sekunder3' => '',
            'kd_prosedur_sekunder3' => '',
            'kondisi_pulang' => 'Hidup',
            'obat_pulang' => 'Acyclovir 200 mg Tablet : 9 TAB , Ibuprofen 400 mg : 10 TAB 2 x1, Acrios 50 mg tab : 8 TAB , Amoxsan 500 mg  : 10 CAP 3 x 1, ',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/20/000001',
            'kd_dokter' => 'D0000004',
            'keluhan_utama' => '1',
            'jalannya_penyakit' => '1',
            'pemeriksaan_penunjang' => '1',
            'hasil_laborat' => '1',
            'diagnosa_utama' => '1',
            'kd_diagnosa_utama' => '',
            'diagnosa_sekunder' => '',
            'kd_diagnosa_sekunder' => '',
            'diagnosa_sekunder2' => '',
            'kd_diagnosa_sekunder2' => '',
            'diagnosa_sekunder3' => '',
            'kd_diagnosa_sekunder3' => '',
            'diagnosa_sekunder4' => '',
            'kd_diagnosa_sekunder4' => '',
            'prosedur_utama' => '',
            'kd_prosedur_utama' => '',
            'prosedur_sekunder' => '',
            'kd_prosedur_sekunder' => '',
            'prosedur_sekunder2' => '',
            'kd_prosedur_sekunder2' => '',
            'prosedur_sekunder3' => '',
            'kd_prosedur_sekunder3' => '',
            'kondisi_pulang' => 'Hidup',
            'obat_pulang' => '',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'kd_dokter' => 'D0000004',
            'keluhan_utama' => 'sasas, ',
            'jalannya_penyakit' => 'asa',
            'pemeriksaan_penunjang' => 'asas',
            'hasil_laborat' => 'sasasHemoglobin : sa, Rhesus : sas, Golongan Darah : a, MCHC : s, Trombosit : sa, ',
            'diagnosa_utama' => 'JANTUNG',
            'kd_diagnosa_utama' => 'A00.0',
            'diagnosa_sekunder' => '',
            'kd_diagnosa_sekunder' => '',
            'diagnosa_sekunder2' => '',
            'kd_diagnosa_sekunder2' => '',
            'diagnosa_sekunder3' => '',
            'kd_diagnosa_sekunder3' => '',
            'diagnosa_sekunder4' => '',
            'kd_diagnosa_sekunder4' => '',
            'prosedur_utama' => '',
            'kd_prosedur_utama' => '',
            'prosedur_sekunder' => '',
            'kd_prosedur_sekunder' => '',
            'prosedur_sekunder2' => '',
            'kd_prosedur_sekunder2' => '',
            'prosedur_sekunder3' => '',
            'kd_prosedur_sekunder3' => '',
            'kondisi_pulang' => 'Hidup',
            'obat_pulang' => 'Acetensa tab : 7 TAB , Acran 150 mg Tablet : 7 TAB , Ibuprofen 400 mg : 10 TAB 2 X 1, Paracetamol 500 mg : 10 TAB 2 X 1, ',
          ),
          4 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'kd_dokter' => 'D0000004',
            'keluhan_utama' => 'asas',
            'jalannya_penyakit' => 'asas',
            'pemeriksaan_penunjang' => 'asas',
            'hasil_laborat' => 'asas',
            'diagnosa_utama' => 'jantung',
            'kd_diagnosa_utama' => 'K30',
            'diagnosa_sekunder' => '',
            'kd_diagnosa_sekunder' => '',
            'diagnosa_sekunder2' => '',
            'kd_diagnosa_sekunder2' => '',
            'diagnosa_sekunder3' => '',
            'kd_diagnosa_sekunder3' => '',
            'diagnosa_sekunder4' => '',
            'kd_diagnosa_sekunder4' => '',
            'prosedur_utama' => '',
            'kd_prosedur_utama' => '',
            'prosedur_sekunder' => '',
            'kd_prosedur_sekunder' => '',
            'prosedur_sekunder2' => '',
            'kd_prosedur_sekunder2' => '',
            'prosedur_sekunder3' => '',
            'kd_prosedur_sekunder3' => '',
            'kondisi_pulang' => 'Hidup',
            'obat_pulang' => 'sasasas',
          ),
          5 => 
          array (
            'no_rawat' => '2025/08/11/000001',
            'kd_dokter' => 'D0000003',
            'keluhan_utama' => 'wqwq',
            'jalannya_penyakit' => 'wqwqw',
            'pemeriksaan_penunjang' => 'wqwqwq
        
        wq
        w
        qw
        qw
        
        wqw, ',
            'hasil_laborat' => 'Hemoglobin : 1212, Hematokrit : 12, MCH : 1212, ',
            'diagnosa_utama' => 'Paratyphoid fever A',
            'kd_diagnosa_utama' => 'D00.0',
            'diagnosa_sekunder' => 'wqwqw',
            'kd_diagnosa_sekunder' => '',
            'diagnosa_sekunder2' => 'wqwqwwq',
            'kd_diagnosa_sekunder2' => '',
            'diagnosa_sekunder3' => '',
            'kd_diagnosa_sekunder3' => '',
            'diagnosa_sekunder4' => 'wqwqw',
            'kd_diagnosa_sekunder4' => '',
            'prosedur_utama' => '',
            'kd_prosedur_utama' => '',
            'prosedur_sekunder' => '',
            'kd_prosedur_sekunder' => '',
            'prosedur_sekunder2' => '',
            'kd_prosedur_sekunder2' => '',
            'prosedur_sekunder3' => '',
            'kd_prosedur_sekunder3' => '',
            'kondisi_pulang' => 'Hidup',
            'obat_pulang' => 'Alovell 70 mg Tablet : 10 TAB 3 X 1, Alovell 70 mg Tablet : 10 TAB 3 X 1, ',
          ),
          6 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'kd_dokter' => 'D0000004',
            'keluhan_utama' => 'sasas, ',
            'jalannya_penyakit' => 'qwqw',
            'pemeriksaan_penunjang' => 'tes 1
        
        tes 2
        
        tes 3, ',
            'hasil_laborat' => 'Hemoglobin : 1, Hemoglobin : 1, Rhesus : 1, Golongan Darah : 1, LED : 1, MCHC : 1, MCH : 1, MCV : 1, Erytrosit : , Trombosit : 1, Hematokrit : 1, Gran% : 1, Mid% : , Lymph% : , Diffcount : , Leukosit : , SDT/Malaria : , ',
            'diagnosa_utama' => 'jantung',
            'kd_diagnosa_utama' => 'I50.0',
            'diagnosa_sekunder' => '',
            'kd_diagnosa_sekunder' => '',
            'diagnosa_sekunder2' => '',
            'kd_diagnosa_sekunder2' => '',
            'diagnosa_sekunder3' => '',
            'kd_diagnosa_sekunder3' => '',
            'diagnosa_sekunder4' => '',
            'kd_diagnosa_sekunder4' => '',
            'prosedur_utama' => '',
            'kd_prosedur_utama' => '',
            'prosedur_sekunder' => '',
            'kd_prosedur_sekunder' => '',
            'prosedur_sekunder2' => '',
            'kd_prosedur_sekunder2' => '',
            'prosedur_sekunder3' => '',
            'kd_prosedur_sekunder3' => '',
            'kondisi_pulang' => 'Hidup',
            'obat_pulang' => 'Acran 150 mg Tablet : 8 TAB , Acyclovir 200 mg Tablet : 8 TAB , Amlodipine 5 mg : 10 TAB 2x1, Ibuprofen 400 mg : 10 TAB 3x1, ',
          ),
          7 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'kd_dokter' => 'D0000004',
            'keluhan_utama' => 'SUHU : 37, ',
            'jalannya_penyakit' => 'ASASAS',
            'pemeriksaan_penunjang' => 'O
        
        
        O
        
        
        O
        , ',
            'hasil_laborat' => 'Hemoglobin : 1212, Hematokrit : 12, Trombosit : 1, MCV : 2, MCH : 12, MCHC : 12, Rhesus : 21, ',
            'diagnosa_utama' => 'Paratyphoid fever A',
            'kd_diagnosa_utama' => 'A01.1',
            'diagnosa_sekunder' => '',
            'kd_diagnosa_sekunder' => '',
            'diagnosa_sekunder2' => '',
            'kd_diagnosa_sekunder2' => '',
            'diagnosa_sekunder3' => '',
            'kd_diagnosa_sekunder3' => '',
            'diagnosa_sekunder4' => '',
            'kd_diagnosa_sekunder4' => '',
            'prosedur_utama' => '',
            'kd_prosedur_utama' => '',
            'prosedur_sekunder' => '',
            'kd_prosedur_sekunder' => '',
            'prosedur_sekunder2' => '',
            'kd_prosedur_sekunder2' => '',
            'prosedur_sekunder3' => '',
            'kd_prosedur_sekunder3' => '',
            'kondisi_pulang' => 'Hidup',
            'obat_pulang' => 'Amlodipine 10 mg : 10 TAB 3 x 1, Ibuprofen 400 mg : 10 TAB 2x1, Acetensa tab : 8 TAB , Acyclovir 200 mg Tablet : 8 TAB , Afamed tab : 6 CAP , Amoxsan 500 mg  : 6 CAP , ',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}