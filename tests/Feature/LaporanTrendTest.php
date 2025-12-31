<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\Penjab;
use App\Models\RegPeriksa;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class LaporanTrendTest extends TestCase
{
    use RefreshDatabase;

    public function test_laporan_page_loads_with_trend_data()
    {
        // Authenticate
        $user = User::factory()->create();
        $this->actingAs($user);
        
        // Seed some data
        if (Schema::hasTable('penjab')) {
            Penjab::create(['kd_pj' => 'P01', 'png_jawab' => 'BPJS', 'nama_perusahaan' => 'BPJS Kesehatan', 'alamat_perusahaan' => 'Jl. BPJS', 'no_telp' => '123', 'attn' => 'Admin', 'status' => '1']);
            Penjab::create(['kd_pj' => 'P02', 'png_jawab' => 'Umum', 'nama_perusahaan' => 'Umum', 'alamat_perusahaan' => 'Jl. Umum', 'no_telp' => '123', 'attn' => 'Admin', 'status' => '1']);
        }

        $year = 2025;

        if (Schema::hasTable('reg_periksa')) {
            RegPeriksa::create([
                'no_rawat' => '2025/01/01/000001',
                'tgl_registrasi' => "$year-01-01",
                'jam_reg' => '08:00:00',
                'kd_dokter' => 'D01',
                'no_rkm_medis' => 'RM001',
                'kd_poli' => 'POL01',
                'p_jawab' => 'Keluarga',
                'almt_pj' => 'Alamat',
                'hubunganpj' => 'Saudara',
                'biaya_reg' => 10000,
                'stts' => 'Belum',
                'stts_daftar' => 'Lama',
                'status_lanjut' => 'Ralan',
                'kd_pj' => 'P01',
                'umurdaftar' => 20,
                'sttsumur' => 'Th',
                'status_bayar' => 'Belum Bayar',
            ]);

            // Add a Ranap case
            RegPeriksa::create([
                'no_rawat' => '2025/01/01/000002',
                'tgl_registrasi' => "$year-01-01",
                'jam_reg' => '09:00:00',
                'kd_dokter' => 'D01',
                'no_rkm_medis' => 'RM002',
                'kd_poli' => 'POL01',
                'p_jawab' => 'Keluarga',
                'almt_pj' => 'Alamat',
                'hubunganpj' => 'Saudara',
                'biaya_reg' => 10000,
                'stts' => 'Belum',
                'stts_daftar' => 'Lama',
                'status_lanjut' => 'Ranap',
                'kd_pj' => 'P02',
                'umurdaftar' => 25,
                'sttsumur' => 'Th',
                'status_bayar' => 'Belum Bayar',
            ]);
        }

        if (Schema::hasTable('kamar_inap')) {
            DB::table('kamar_inap')->insert([
                'no_rawat' => '2025/01/01/000002',
                'kd_kamar' => 'K01',
                'trf_kamar' => 100000,
                'diagnosa_awal' => 'Sakit',
                'diagnosa_akhir' => 'Sembuh',
                'tgl_masuk' => "$year-01-01",
                'jam_masuk' => '10:00:00',
                'tgl_keluar' => "$year-01-05",
                'jam_keluar' => '12:00:00',
                'lama' => 4,
                'ttl_biaya' => 400000,
                'stts_pulang' => 'Sehat',
            ]);
        }

        $response = $this->get('/laporan');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Laporan/Home')
            ->has('summary.tren_ralan')
            ->has('summary.tren_ranap')
        );

        // Verify structure of tren_ralan
        $data = $response->inertiaProps()['summary']['tren_ralan'];
        $this->assertArrayHasKey('months', $data);
        $this->assertArrayHasKey('series', $data);
        $this->assertGreaterThan(0, count($data['series']));
    }
}
