<?php

namespace Database\Seeders;

use App\Models\Penjab;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class PenjabSeeder extends Seeder
{
    public function run()
    {
        $penjabs = [
            [
                'kd_pj' => 'PJ1',
                'png_jawab' => 'BPJS Kesehatan',
                'nama_perusahaan' => 'BPJS Kesehatan',
                'alamat_perusahaan' => 'Jl. Letjen MT Haryono Kav. 4-5, Jakarta Selatan',
                'no_telp' => '1500400',
                'attn' => 'BPJS Kesehatan',
                'status' => '1',
            ],
            [
                'kd_pj' => 'PJ2',
                'png_jawab' => 'Umum',
                'nama_perusahaan' => '-',
                'alamat_perusahaan' => '-',
                'no_telp' => '-',
                'attn' => '-',
                'status' => '1',
            ],
            [
                'kd_pj' => 'PJ3',
                'png_jawab' => 'Asuransi Jiwa Sinarmas',
                'nama_perusahaan' => 'PT Asuransi Jiwa Sinarmas MSIG',
                'alamat_perusahaan' => 'Jl. HR Rasuna Said Kav. 1-2, Jakarta Selatan',
                'no_telp' => '021-25555555',
                'attn' => 'Asuransi Jiwa Sinarmas',
                'status' => '1',
            ],
            [
                'kd_pj' => 'PJ4',
                'png_jawab' => 'Allianz Life Indonesia',
                'nama_perusahaan' => 'PT Allianz Life Indonesia',
                'alamat_perusahaan' => 'Jl. HR Rasuna Said Kav. 13, Jakarta Selatan',
                'no_telp' => '021-25555556',
                'attn' => 'Allianz Life Indonesia',
                'status' => '1',
            ],
            [
                'kd_pj' => 'PJ5',
                'png_jawab' => 'Prudential Indonesia',
                'nama_perusahaan' => 'PT Prudential Life Assurance',
                'alamat_perusahaan' => 'Jl. Sudirman Kav. 52-53, Jakarta Selatan',
                'no_telp' => '021-25555557',
                'attn' => 'Prudential Indonesia',
                'status' => '1',
            ],
            [
                'kd_pj' => 'PJ6',
                'png_jawab' => 'AIA Indonesia',
                'nama_perusahaan' => 'PT AIA Financial',
                'alamat_perusahaan' => 'Jl. Sudirman Kav. 54-55, Jakarta Selatan',
                'no_telp' => '021-25555558',
                'attn' => 'AIA Indonesia',
                'status' => '1',
            ],
            [
                'kd_pj' => 'PJ7',
                'png_jawab' => 'Mandiri Inhealth',
                'nama_perusahaan' => 'PT Mandiri Inhealth',
                'alamat_perusahaan' => 'Jl. Gatot Subroto Kav. 36-38, Jakarta Selatan',
                'no_telp' => '021-25555559',
                'attn' => 'Mandiri Inhealth',
                'status' => '1',
            ],
            [
                'kd_pj' => 'PJ8',
                'png_jawab' => 'Cigna Indonesia',
                'nama_perusahaan' => 'PT Cigna Indonesia',
                'alamat_perusahaan' => 'Jl. Sudirman Kav. 56-57, Jakarta Selatan',
                'no_telp' => '021-25555560',
                'attn' => 'Cigna Indonesia',
                'status' => '1',
            ],
        ];

        if (! Schema::hasTable('penjab')) {
            return;
        }

        $columns = Schema::getColumnListing('penjab');

        foreach ($penjabs as $penjab) {
            $data = array_intersect_key($penjab, array_flip($columns));

            Penjab::updateOrCreate(
                ['kd_pj' => $penjab['kd_pj']],
                $data
            );
        }
    }
}
