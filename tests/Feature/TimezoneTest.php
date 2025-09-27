<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Setting;
use App\Models\RegPeriksa;
use App\Models\Patient;
use Carbon\Carbon;

class TimezoneTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Set timezone for testing
        config(['app.timezone' => 'Asia/Jakarta']);
        date_default_timezone_set('Asia/Jakarta');
    }

    /**
     * Test that application timezone is correctly configured
     */
    public function test_application_timezone_configuration(): void
    {
        $this->assertEquals('Asia/Jakarta', config('app.timezone'));
        $this->assertEquals('Asia/Jakarta', date_default_timezone_get());
    }

    /**
     * Test timezone configuration API endpoint
     */
    public function test_config_api_returns_correct_timezone(): void
    {
        $response = $this->getJson('/api/config');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'timezone' => 'Asia/Jakarta'
                    ]
                ]);
    }

    /**
     * Test that Carbon dates use correct timezone
     */
    public function test_carbon_uses_correct_timezone(): void
    {
        $now = Carbon::now();
        $this->assertEquals('Asia/Jakarta', $now->getTimezone()->getName());
        
        // Test specific date formatting
        $testDate = Carbon::create(2024, 1, 15, 14, 30, 0, 'Asia/Jakarta');
        $this->assertEquals('2024-01-15 14:30:00', $testDate->format('Y-m-d H:i:s'));
    }

    /**
     * Test database timestamps use correct timezone
     */
    public function test_database_timestamps_use_correct_timezone(): void
    {
        // Create a test setting record
        $setting = Setting::create([
            'nama_instansi' => 'Test Hospital',
            'alamat_instansi' => 'Test Address',
            'kabupaten' => 'Test City',
            'propinsi' => 'Test Province',
            'kontak' => '123456789',
            'email' => 'test@hospital.com',
            'aktifkan' => 'Yes'
        ]);

        // Verify timestamps are in correct timezone
        $this->assertInstanceOf(Carbon::class, $setting->created_at);
        $this->assertEquals('Asia/Jakarta', $setting->created_at->getTimezone()->getName());
    }

    /**
     * Test date formatting in API responses
     */
    public function test_api_date_formatting(): void
    {
        // Create test data
        $pasien = Patient::create([
            'no_rkm_medis' => 'TEST001',
            'nm_pasien' => 'Test Patient',
            'jk' => 'L',
            'tmp_lahir' => 'Jakarta',
            'tgl_lahir' => '1990-01-01',
            'alamat' => 'Test Address'
        ]);

        $regPeriksa = RegPeriksa::create([
            'no_rawat' => '2024/01/15/000001',
            'no_rkm_medis' => 'TEST001',
            'tgl_registrasi' => Carbon::now()->format('Y-m-d'),
            'jam_reg' => Carbon::now()->format('H:i:s'),
            'kd_dokter' => 'DR001',
            'no_reg' => '001',
            'kd_poli' => 'U0001',
            'p_jawab' => 'Test',
            'almt_pj' => 'Test Address',
            'hubunganpj' => 'Keluarga',
            'biaya_reg' => 10000,
            'stts' => 'Belum'
        ]);

        // Test API response includes properly formatted dates
        $response = $this->getJson("/api/reg-periksa/{$regPeriksa->no_rawat}");
        
        $response->assertStatus(200);
        $data = $response->json('data');
        
        // Verify date format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2}$/', $data['tgl_registrasi']);
        $this->assertMatchesRegularExpression('/^\d{2}:\d{2}:\d{2}$/', $data['jam_reg']);
    }

    /**
     * Test timezone consistency across different components
     */
    public function test_timezone_consistency_across_components(): void
    {
        $carbonNow = Carbon::now();
        $phpNow = new \DateTime();
        
        // Both should use the same timezone
        $this->assertEquals('Asia/Jakarta', $carbonNow->getTimezone()->getName());
        $this->assertEquals('Asia/Jakarta', $phpNow->getTimezone()->getName());
        
        // Times should be very close (within 1 second)
        $timeDiff = abs($carbonNow->timestamp - $phpNow->getTimestamp());
        $this->assertLessThan(2, $timeDiff);
    }

    /**
     * Test date display formatting for Indonesian locale
     */
    public function test_indonesian_date_formatting(): void
    {
        $testDate = Carbon::create(2024, 1, 15, 14, 30, 0, 'Asia/Jakarta');
        
        // Test various Indonesian date formats
        $this->assertEquals('15/01/2024', $testDate->format('d/m/Y'));
        $this->assertEquals('15-01-2024', $testDate->format('d-m-Y'));
        $this->assertEquals('2024-01-15', $testDate->format('Y-m-d'));
        $this->assertEquals('14:30', $testDate->format('H:i'));
    }

    /**
     * Test timezone handling in form submissions
     */
    public function test_form_submission_timezone_handling(): void
    {
        $formData = [
            'nama_instansi' => 'Test Hospital Updated',
            'alamat_instansi' => 'Updated Address',
            'kabupaten' => 'Updated City',
            'propinsi' => 'Updated Province',
            'kontak' => '987654321',
            'email' => 'updated@hospital.com',
            'aktifkan' => 'Yes'
        ];

        $response = $this->postJson('/settings', $formData);
        
        // Verify the record was created with correct timezone
        $setting = Setting::latest()->first();
        $this->assertNotNull($setting);
        $this->assertEquals('Asia/Jakarta', $setting->created_at->getTimezone()->getName());
    }

    /**
     * Test that scheduled tasks respect timezone
     */
    public function test_scheduled_tasks_respect_timezone(): void
    {
        // Test that scheduled time calculations use correct timezone
        $scheduledTime = Carbon::createFromTime(6, 0, 0, 'Asia/Jakarta'); // 6 AM Jakarta time
        $utcTime = $scheduledTime->utc();
        
        // Jakarta is UTC+7, so 6 AM Jakarta = 11 PM UTC (previous day)
        $this->assertEquals(23, $utcTime->hour);
        $this->assertEquals($scheduledTime->subDay()->day, $utcTime->day);
    }
}