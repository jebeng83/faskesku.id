<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\RegPeriksa;
use App\Models\Patient;
use App\Models\Dokter;
use App\Models\Poliklinik;
use App\Models\User;

class RegPeriksaRiwayatTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Run migrations
        $this->artisan('migrate:fresh');
        
        // Create a user for authentication
        $user = User::factory()->create([
            'username' => 'testuser',
        ]);
        $this->actingAs($user);
    }

    /** @test */
    public function it_can_get_riwayat_pemeriksaan_for_a_patient()
    {
        // Create a patient
        $patient = Patient::create([
            'no_rkm_medis' => '000001',
            'nm_pasien' => 'Test Patient',
            'jk' => 'L',
            'tgl_lahir' => '1990-01-01',
            'alamat' => 'Test Address'
        ]);

        // Create a doctor
        $dokter = Dokter::create([
            'kd_dokter' => 'DR001',
            'nm_dokter' => 'Dr. Test',
            'jk' => 'L',
            'status' => '1'
        ]);

        // Create a poliklinik
        $poliklinik = Poliklinik::create([
            'kd_poli' => 'POL01',
            'nm_poli' => 'Poli Test',
            'status' => '1'
        ]);

        // Create registration records
        RegPeriksa::create([
            'no_reg' => '001',
            'no_rawat' => '2023/01/01/000001',
            'tgl_registrasi' => '2023-01-01',
            'jam_reg' => '08:00:00',
            'kd_dokter' => $dokter->kd_dokter,
            'no_rkm_medis' => $patient->no_rkm_medis,
            'kd_poli' => $poliklinik->kd_poli,
            'p_jawab' => 'Test',
            'almt_pj' => 'Test Address',
            'hubunganpj' => 'Test',
            'biaya_reg' => 50000,
            'stts' => 'Sudah',
            'stts_daftar' => 'Baru',
            'status_lanjut' => 'Ralan',
            'kd_pj' => 'UMU',
            'umurdaftar' => 30,
            'sttsumur' => 'Th',
            'status_bayar' => 'Sudah Bayar',
            'status_poli' => 'Baru'
        ]);

        // Create a cancelled registration (should not appear in results)
        RegPeriksa::create([
            'no_reg' => '002',
            'no_rawat' => '2023/01/02/000002',
            'tgl_registrasi' => '2023-01-02',
            'jam_reg' => '09:00:00',
            'kd_dokter' => $dokter->kd_dokter,
            'no_rkm_medis' => $patient->no_rkm_medis,
            'kd_poli' => $poliklinik->kd_poli,
            'p_jawab' => 'Test',
            'almt_pj' => 'Test Address',
            'hubunganpj' => 'Test',
            'biaya_reg' => 50000,
            'stts' => 'Batal',
            'stts_daftar' => 'Baru',
            'status_lanjut' => 'Ralan',
            'kd_pj' => 'UMU',
            'umurdaftar' => 30,
            'sttsumur' => 'Th',
            'status_bayar' => 'Belum Bayar',
            'status_poli' => 'Baru'
        ]);

        // Make request to the endpoint
        $response = $this->getJson("/rawat-jalan/riwayat-pemeriksaan?no_rkm_medis={$patient->no_rkm_medis}");

        // Assert response
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'tgl_registrasi',
                    'no_rawat',
                    'nm_dokter',
                    'status_lanjut',
                    'nm_poli',
                    'no_reg'
                ]
            ]
        ]);

        // Should only return 1 record (not the cancelled one)
        $responseData = $response->json();
        $this->assertCount(1, $responseData['data']);
    }

    /** @test */
    public function it_returns_empty_array_when_no_patient_id_provided()
    {
        $response = $this->getJson('/rawat-jalan/riwayat-pemeriksaan');

        $response->assertStatus(200);
        $response->assertJson([
            'data' => []
        ]);
    }
}