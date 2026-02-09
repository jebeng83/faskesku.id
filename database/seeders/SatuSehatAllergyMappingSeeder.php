<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SatuSehatAllergyMappingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Contoh alergi lokal dan mapping KFA/SNOMED-nya
        $mappings = [
            [
                'alergi_kode' => 'ALG001', // Asumsi: Kode Amoxicillin di data_alergi
                'nama_alergi' => 'Amoxicillin',
                'kfa_code' => 'KFA-00123', // Kode KFA imajiner (sesuaikan dengan actual)
                'kfa_display' => 'Amoxicillin Trihydrate',
                'category' => 'medication',
                'snomed_code' => null,
                'snomed_display' => null
            ],
            [
                'alergi_kode' => 'ALG002', // Asumsi: Kode Latex
                'nama_alergi' => 'Latex',
                'kfa_code' => null,
                'kfa_display' => null,
                'category' => 'environment',
                'snomed_code' => '111088007', // Latex allergy (disorder)
                'snomed_display' => 'Allergy to latex'
            ],
            [
                'alergi_kode' => 'ALG003', // Asumsi: Udang
                'nama_alergi' => 'Udang',
                'kfa_code' => null,
                'kfa_display' => null,
                'category' => 'food',
                'snomed_code' => '294966005', 
                'snomed_display' => 'Allergy to shrimp'
            ],
            // Tambahkan contoh lain sesuai kebutuhan
        ];

        foreach ($mappings as $map) {
            DB::table('satusehat_mapping_alergi')->updateOrInsert(
                ['alergi_kode' => $map['alergi_kode']],
                $map
            );
        }
    }
}
