<?php

namespace Tests\Feature;

use App\Http\Controllers\SatuSehat\SatuSehatMedicationMappingController;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class SatuSehatMedicationMappingTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        // Buat tabel minimal yang dibutuhkan jika belum ada (untuk sqlite / env testing lain)
        DB::statement('CREATE TABLE IF NOT EXISTS databarang (kode_brng TEXT PRIMARY KEY, nama_brng TEXT)');
        DB::statement('CREATE TABLE IF NOT EXISTS satu_sehat_mapping_obat (
            kode_brng TEXT PRIMARY KEY,
            satusehat_id TEXT NULL,
            obat_code TEXT NULL,
            obat_system TEXT NULL,
            obat_display TEXT NULL,
            form_code TEXT NULL,
            form_system TEXT NULL,
            form_display TEXT NULL,
            numerator_code TEXT NULL,
            numerator_system TEXT NULL,
            denominator_code TEXT NULL,
            denominator_system TEXT NULL,
            route_code TEXT NULL,
            route_system TEXT NULL,
            route_display TEXT NULL
        )');
    }

    public function test_store_creates_or_updates_mapping_obat(): void
    {
        $this->actingAs(User::factory()->create());

        DB::table('databarang')->insert([
            'kode_brng' => 'TEST-001',
            'nama_brng' => 'Paracetamol 500 mg',
        ]);

        $controller = app(SatuSehatMedicationMappingController::class);

        $request = Request::create('/api/satusehat/mapping-obat', 'POST', [
            'kode_brng' => 'TEST-001',
            'obat_code' => 'KFA123',
            'obat_system' => 'http://sys-ids.kemkes.go.id/kfa',
            'obat_display' => 'Paracetamol 500 mg Tablet',
        ]);

        $response = $controller->store($request);
        $response->assertStatus(200);

        $json = $response->getData(true);
        $this->assertTrue($json['success']);
        $this->assertSame('TEST-001', $json['data']['kode_brng']);
        $this->assertSame('KFA123', $json['data']['obat_code']);

        $exists = DB::table('satu_sehat_mapping_obat')->where('kode_brng', 'TEST-001')->exists();
        $this->assertTrue($exists);
    }

    public function test_store_requires_existing_databarang(): void
    {
        $this->actingAs(User::factory()->create());

        $controller = app(SatuSehatMedicationMappingController::class);

        $request = Request::create('/api/satusehat/mapping-obat', 'POST', [
            'kode_brng' => 'UNKNOWN',
            'obat_code' => 'KFA999',
            'obat_system' => 'http://sys-ids.kemkes.go.id/kfa',
            'obat_display' => 'Obat Tidak Ada',
        ]);

        try {
            $controller->store($request);
            $this->fail('Expected validation exception for unknown kode_brng');
        } catch (\Illuminate\Validation\ValidationException $e) {
            $this->assertArrayHasKey('kode_brng', $e->errors());
        }
    }

    public function test_get_mappings_returns_joined_data(): void
    {
        $this->actingAs(User::factory()->create());

        DB::table('databarang')->insert([
            'kode_brng' => 'TEST-002',
            'nama_brng' => 'Amoxicillin 500 mg',
        ]);

        DB::table('satu_sehat_mapping_obat')->insert([
            'kode_brng' => 'TEST-002',
            'obat_code' => 'KFA456',
            'obat_system' => 'http://sys-ids.kemkes.go.id/kfa',
            'obat_display' => 'Amoxicillin 500 mg Kapsul',
        ]);

        $controller = app(SatuSehatMedicationMappingController::class);

        $request = Request::create('/api/satusehat/mapping-obat', 'GET', [
            'search' => 'Amoxicillin',
        ]);

        $response = $controller->getMappings($request);
        $response->assertStatus(200);

        $json = $response->getData(true);
        $this->assertArrayHasKey('data', $json);
        $this->assertNotEmpty($json['data']);

        $first = $json['data'][0];
        $this->assertSame('TEST-002', $first['kode_brng']);
        $this->assertSame('KFA456', $first['obat_code']);
        $this->assertSame('Amoxicillin 500 mg Kapsul', $first['obat_display']);
        $this->assertNotEmpty($first['barang']);
        $this->assertSame('Amoxicillin 500 mg', $first['barang']['nama_brng']);
    }

    public function test_destroy_deletes_mapping(): void
    {
        $this->actingAs(User::factory()->create());

        DB::table('databarang')->insert([
            'kode_brng' => 'TEST-003',
            'nama_brng' => 'Ibuprofen 400 mg',
        ]);

        DB::table('satu_sehat_mapping_obat')->insert([
            'kode_brng' => 'TEST-003',
            'obat_code' => 'KFA789',
            'obat_system' => 'http://sys-ids.kemkes.go.id/kfa',
            'obat_display' => 'Ibuprofen 400 mg Tablet',
        ]);

        $controller = app(SatuSehatMedicationMappingController::class);

        $request = Request::create('/api/satusehat/mapping-obat/TEST-003', 'DELETE');

        $response = $controller->destroy('TEST-003');
        $response->assertStatus(200);

        $exists = DB::table('satu_sehat_mapping_obat')->where('kode_brng', 'TEST-003')->exists();
        $this->assertFalse($exists);
    }
}

