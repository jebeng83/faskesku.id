<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\RegPeriksa;
use Carbon\Carbon;

class GenerateNoRawatTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test generate no_rawat API endpoint
     */
    public function test_generate_no_rawat_api()
    {
        $tanggal = Carbon::today()->format('Y-m-d');
        
        $response = $this->postJson('/api/generate-no-rawat', [
            'tanggal' => $tanggal,
            'type' => 'no_rawat'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true
                ])
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'no_rawat'
                    ]
                ]);

        $data = $response->json('data');
        $this->assertMatchesRegularExpression('/^\d{4}\/\d{2}\/\d{2}\/\d{6}$/', $data['no_rawat']);
    }

    /**
     * Test generate no_reg API endpoint
     */
    public function test_generate_no_reg_api()
    {
        $tanggal = Carbon::today()->format('Y-m-d');
        
        $response = $this->postJson('/api/generate-no-rawat', [
            'tanggal' => $tanggal,
            'kd_dokter' => 'DR001',
            'kd_poli' => 'U0001',
            'type' => 'no_reg'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true
                ])
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'no_reg'
                    ]
                ]);

        $data = $response->json('data');
        $this->assertMatchesRegularExpression('/^\d{3}$/', $data['no_reg']);
    }

    /**
     * Test concurrent no_rawat generation to ensure uniqueness
     */
    public function test_concurrent_no_rawat_generation()
    {
        $tanggal = Carbon::today()->format('Y-m-d');

        // Use Guzzle to make truly concurrent requests
        $client = new \GuzzleHttp\Client();
        $promises = [];
        
        // Create 5 concurrent requests
        for ($i = 0; $i < 5; $i++) {
            $promises[] = $client->postAsync('http://127.0.0.1:8001/api/generate-no-rawat', [
                'json' => [
                    'tanggal' => $tanggal,
                    'type' => 'no_rawat'
                ],
                'headers' => [
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json'
                ]
            ]);
        }

        // Wait for all requests to complete
        $responses = \GuzzleHttp\Promise\Utils::settle($promises)->wait();
        
        $noRawatValues = [];
        foreach ($responses as $response) {
            if ($response['state'] === 'fulfilled') {
                $body = json_decode($response['value']->getBody()->getContents(), true);
                if (isset($body['data']['no_rawat'])) {
                    $noRawatValues[] = $body['data']['no_rawat'];
                }
            }
        }

        // Debug output
        dump('Generated no_rawat values:', $noRawatValues);

        // Ensure we got 5 responses
        $this->assertEquals(5, count($noRawatValues), 'Should have 5 generated no_rawat values');

        // Ensure all generated no_rawat are unique
        $uniqueValues = array_unique($noRawatValues);
        $this->assertEquals(count($noRawatValues), count($uniqueValues), 'All generated no_rawat should be unique');
    }

    /**
     * Test reserve and release no_rawat functionality
     */
    public function test_reserve_and_release_no_rawat()
    {
        $tanggal = Carbon::today()->format('Y-m-d');
        
        // Reserve a no_rawat
        $reserveResponse = $this->postJson('/api/generate-no-rawat/reserve', [
            'tanggal' => $tanggal,
            'type' => 'no_rawat'
        ]);

        $reserveResponse->assertStatus(200)
                       ->assertJson(['success' => true]);

        $reservedData = $reserveResponse->json('data');
        $reservedNoRawat = $reservedData['no_rawat'];
        $reservationId = $reservedData['reservation_id'];

        // Try to generate another no_rawat - should get the next number
        $generateResponse = $this->postJson('/api/generate-no-rawat', [
            'tanggal' => $tanggal,
            'type' => 'no_rawat'
        ]);

        $generateResponse->assertStatus(200);
        $generatedData = $generateResponse->json('data');
        
        // The generated no_rawat should be different from reserved one
        $this->assertNotEquals($reservedNoRawat, $generatedData['no_rawat']);

        // Release the reserved no_rawat
        $releaseResponse = $this->postJson('/api/generate-no-rawat/release', [
            'reservation_id' => $reservationId
        ]);

        $releaseResponse->assertStatus(200)
                       ->assertJson(['success' => true]);
    }

    /**
     * Test sequential no_rawat generation with existing data
     */
    public function test_sequential_no_rawat_with_existing_data()
    {
        $tanggal = Carbon::today()->format('Y-m-d');
        $ymd = explode('-', $tanggal);
        $datePrefix = "{$ymd[0]}/{$ymd[1]}/{$ymd[2]}";

        // Create some existing reg_periksa records
        RegPeriksa::create([
            'no_rawat' => "{$datePrefix}/000001",
            'no_rkm_medis' => '000001',
            'tgl_registrasi' => $tanggal,
            'jam_reg' => '08:00:00',
            'kd_dokter' => 'DR001',
            'no_reg' => '001',
            'kd_poli' => 'U0001',
            'p_jawab' => 'BPJS',
            'almt_pj' => 'Test Address',
            'hubunganpj' => 'DIRI SENDIRI',
            'biaya_reg' => 5000,
            'status_lanjut' => 'Ralan',
            'kd_pj' => 'BPJ',
            'umurdaftar' => 25,
            'sttsumur' => 'Th',
            'status_bayar' => 'Sudah Bayar',
            'status_poli' => 'Lama'
        ]);

        RegPeriksa::create([
            'no_rawat' => "{$datePrefix}/000003",
            'no_rkm_medis' => '000002',
            'tgl_registrasi' => $tanggal,
            'jam_reg' => '08:30:00',
            'kd_dokter' => 'DR001',
            'no_reg' => '002',
            'kd_poli' => 'U0001',
            'p_jawab' => 'BPJS',
            'almt_pj' => 'Test Address',
            'hubunganpj' => 'DIRI SENDIRI',
            'biaya_reg' => 5000,
            'status_lanjut' => 'Ralan',
            'kd_pj' => 'BPJ',
            'umurdaftar' => 30,
            'sttsumur' => 'Th',
            'status_bayar' => 'Sudah Bayar',
            'status_poli' => 'Lama'
        ]);

        // Generate new no_rawat - should be 000004 (next after 000003)
        $response = $this->postJson('/api/generate-no-rawat', [
            'tanggal' => $tanggal,
            'type' => 'no_rawat'
        ]);

        $response->assertStatus(200);
        $data = $response->json('data');
        
        $expectedNoRawat = "{$datePrefix}/000004";
        $this->assertEquals($expectedNoRawat, $data['no_rawat']);
    }

    /**
     * Test basic functionality without complex scenarios
     */
    public function test_simple_generate_no_rawat()
    {
        $tanggal = Carbon::today()->format('Y-m-d');
        
        $response = $this->postJson('/api/generate-no-rawat', [
            'tanggal' => $tanggal,
            'type' => 'no_rawat'
        ]);

        // Debug the response
        if ($response->status() !== 200) {
            dump('Response Status: ' . $response->status());
            dump('Response Content: ' . $response->getContent());
        }

        $response->assertStatus(200);
        
        // Just check if we get a response, don't worry about format for now
        $this->assertTrue($response->json('success'));
        $this->assertArrayHasKey('no_rawat', $response->json('data'));
    }
}