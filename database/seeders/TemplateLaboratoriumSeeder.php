<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TemplateLaboratorium;
use App\Models\JnsPerawatanLab;

class TemplateLaboratoriumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Template untuk Hematologi Lengkap
        $hematologi = JnsPerawatanLab::where('nm_perawatan', 'like', '%hematologi%')
            ->orWhere('nm_perawatan', 'like', '%darah lengkap%')
            ->first();

        if ($hematologi) {
            $hematologiTemplates = [
                [
                    'kd_jenis_prw' => $hematologi->kd_jenis_prw,
                    'item_pemeriksaan' => 'Hemoglobin (Hb)',
                    'nilai_rujukan_pria' => '13.5-17.5 g/dL',
                    'nilai_rujukan_wanita' => '12.0-16.0 g/dL',
                    'satuan' => 'g/dL',
                    'urutan' => 1,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $hematologi->kd_jenis_prw,
                    'item_pemeriksaan' => 'Hematokrit (Ht)',
                    'nilai_rujukan_pria' => '40-52%',
                    'nilai_rujukan_wanita' => '37-47%',
                    'satuan' => '%',
                    'urutan' => 2,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $hematologi->kd_jenis_prw,
                    'item_pemeriksaan' => 'Eritrosit',
                    'nilai_rujukan_pria' => '4.5-6.5 juta/μL',
                    'nilai_rujukan_wanita' => '4.0-5.5 juta/μL',
                    'satuan' => 'juta/μL',
                    'urutan' => 3,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $hematologi->kd_jenis_prw,
                    'item_pemeriksaan' => 'Leukosit',
                    'nilai_rujukan_pria' => '4.000-11.000/μL',
                    'nilai_rujukan_wanita' => '4.000-11.000/μL',
                    'satuan' => '/μL',
                    'urutan' => 4,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $hematologi->kd_jenis_prw,
                    'item_pemeriksaan' => 'Trombosit',
                    'nilai_rujukan_pria' => '150.000-450.000/μL',
                    'nilai_rujukan_wanita' => '150.000-450.000/μL',
                    'satuan' => '/μL',
                    'urutan' => 5,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $hematologi->kd_jenis_prw,
                    'item_pemeriksaan' => 'LED',
                    'nilai_rujukan_pria' => '0-15 mm/jam',
                    'nilai_rujukan_wanita' => '0-20 mm/jam',
                    'satuan' => 'mm/jam',
                    'urutan' => 6,
                    'status' => 'Aktif'
                ]
            ];

            foreach ($hematologiTemplates as $template) {
                TemplateLaboratorium::create($template);
            }
        }

        // Template untuk Kimia Darah
        $kimia = JnsPerawatanLab::where('nm_perawatan', 'like', '%kimia%')
            ->orWhere('nm_perawatan', 'like', '%gula darah%')
            ->first();

        if ($kimia) {
            $kimiaTemplates = [
                [
                    'kd_jenis_prw' => $kimia->kd_jenis_prw,
                    'item_pemeriksaan' => 'Glukosa Sewaktu',
                    'nilai_rujukan_pria' => '<200 mg/dL',
                    'nilai_rujukan_wanita' => '<200 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 1,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $kimia->kd_jenis_prw,
                    'item_pemeriksaan' => 'Glukosa Puasa',
                    'nilai_rujukan_pria' => '70-100 mg/dL',
                    'nilai_rujukan_wanita' => '70-100 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 2,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $kimia->kd_jenis_prw,
                    'item_pemeriksaan' => 'Kolesterol Total',
                    'nilai_rujukan_pria' => '<200 mg/dL',
                    'nilai_rujukan_wanita' => '<200 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 3,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $kimia->kd_jenis_prw,
                    'item_pemeriksaan' => 'Trigliserida',
                    'nilai_rujukan_pria' => '<150 mg/dL',
                    'nilai_rujukan_wanita' => '<150 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 4,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $kimia->kd_jenis_prw,
                    'item_pemeriksaan' => 'HDL Kolesterol',
                    'nilai_rujukan_pria' => '>40 mg/dL',
                    'nilai_rujukan_wanita' => '>50 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 5,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $kimia->kd_jenis_prw,
                    'item_pemeriksaan' => 'LDL Kolesterol',
                    'nilai_rujukan_pria' => '<100 mg/dL',
                    'nilai_rujukan_wanita' => '<100 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 6,
                    'status' => 'Aktif'
                ]
            ];

            foreach ($kimiaTemplates as $template) {
                TemplateLaboratorium::create($template);
            }
        }

        // Template untuk Fungsi Ginjal
        $ginjal = JnsPerawatanLab::where('nm_perawatan', 'like', '%ginjal%')
            ->orWhere('nm_perawatan', 'like', '%ureum%')
            ->orWhere('nm_perawatan', 'like', '%kreatinin%')
            ->first();

        if ($ginjal) {
            $ginjalTemplates = [
                [
                    'kd_jenis_prw' => $ginjal->kd_jenis_prw,
                    'item_pemeriksaan' => 'Ureum',
                    'nilai_rujukan_pria' => '10-50 mg/dL',
                    'nilai_rujukan_wanita' => '10-50 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 1,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $ginjal->kd_jenis_prw,
                    'item_pemeriksaan' => 'Kreatinin',
                    'nilai_rujukan_pria' => '0.7-1.3 mg/dL',
                    'nilai_rujukan_wanita' => '0.6-1.1 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 2,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $ginjal->kd_jenis_prw,
                    'item_pemeriksaan' => 'Asam Urat',
                    'nilai_rujukan_pria' => '3.5-7.2 mg/dL',
                    'nilai_rujukan_wanita' => '2.6-6.0 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 3,
                    'status' => 'Aktif'
                ]
            ];

            foreach ($ginjalTemplates as $template) {
                TemplateLaboratorium::create($template);
            }
        }

        // Template untuk Fungsi Hati
        $hati = JnsPerawatanLab::where('nm_perawatan', 'like', '%hati%')
            ->orWhere('nm_perawatan', 'like', '%sgot%')
            ->orWhere('nm_perawatan', 'like', '%sgpt%')
            ->first();

        if ($hati) {
            $hatiTemplates = [
                [
                    'kd_jenis_prw' => $hati->kd_jenis_prw,
                    'item_pemeriksaan' => 'SGOT (AST)',
                    'nilai_rujukan_pria' => '<37 U/L',
                    'nilai_rujukan_wanita' => '<31 U/L',
                    'satuan' => 'U/L',
                    'urutan' => 1,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $hati->kd_jenis_prw,
                    'item_pemeriksaan' => 'SGPT (ALT)',
                    'nilai_rujukan_pria' => '<41 U/L',
                    'nilai_rujukan_wanita' => '<33 U/L',
                    'satuan' => 'U/L',
                    'urutan' => 2,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $hati->kd_jenis_prw,
                    'item_pemeriksaan' => 'Bilirubin Total',
                    'nilai_rujukan_pria' => '0.2-1.2 mg/dL',
                    'nilai_rujukan_wanita' => '0.2-1.2 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 3,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $hati->kd_jenis_prw,
                    'item_pemeriksaan' => 'Bilirubin Direk',
                    'nilai_rujukan_pria' => '0.0-0.3 mg/dL',
                    'nilai_rujukan_wanita' => '0.0-0.3 mg/dL',
                    'satuan' => 'mg/dL',
                    'urutan' => 4,
                    'status' => 'Aktif'
                ]
            ];

            foreach ($hatiTemplates as $template) {
                TemplateLaboratorium::create($template);
            }
        }

        // Template untuk Urinalisis
        $urin = JnsPerawatanLab::where('nm_perawatan', 'like', '%urin%')
            ->orWhere('nm_perawatan', 'like', '%urinalisis%')
            ->first();

        if ($urin) {
            $urinTemplates = [
                [
                    'kd_jenis_prw' => $urin->kd_jenis_prw,
                    'item_pemeriksaan' => 'Warna',
                    'nilai_rujukan_pria' => 'Kuning jernih',
                    'nilai_rujukan_wanita' => 'Kuning jernih',
                    'satuan' => '',
                    'urutan' => 1,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $urin->kd_jenis_prw,
                    'item_pemeriksaan' => 'Kejernihan',
                    'nilai_rujukan_pria' => 'Jernih',
                    'nilai_rujukan_wanita' => 'Jernih',
                    'satuan' => '',
                    'urutan' => 2,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $urin->kd_jenis_prw,
                    'item_pemeriksaan' => 'Protein',
                    'nilai_rujukan_pria' => 'Negatif',
                    'nilai_rujukan_wanita' => 'Negatif',
                    'satuan' => '',
                    'urutan' => 3,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $urin->kd_jenis_prw,
                    'item_pemeriksaan' => 'Glukosa',
                    'nilai_rujukan_pria' => 'Negatif',
                    'nilai_rujukan_wanita' => 'Negatif',
                    'satuan' => '',
                    'urutan' => 4,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $urin->kd_jenis_prw,
                    'item_pemeriksaan' => 'Eritrosit',
                    'nilai_rujukan_pria' => '0-2/lpb',
                    'nilai_rujukan_wanita' => '0-2/lpb',
                    'satuan' => '/lpb',
                    'urutan' => 5,
                    'status' => 'Aktif'
                ],
                [
                    'kd_jenis_prw' => $urin->kd_jenis_prw,
                    'item_pemeriksaan' => 'Leukosit',
                    'nilai_rujukan_pria' => '0-5/lpb',
                    'nilai_rujukan_wanita' => '0-5/lpb',
                    'satuan' => '/lpb',
                    'urutan' => 6,
                    'status' => 'Aktif'
                ]
            ];

            foreach ($urinTemplates as $template) {
                TemplateLaboratorium::create($template);
            }
        }

        $this->command->info('Template laboratorium berhasil dibuat!');
    }
}