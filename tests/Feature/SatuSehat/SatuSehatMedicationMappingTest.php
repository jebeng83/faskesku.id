<?php

namespace Tests\Feature\SatuSehat;

use App\Models\DataBarang;
use App\Models\SatuSehat\SatuSehatMappingObat;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SatuSehatMedicationMappingTest extends TestCase
{
    // Note: Since this project uses an existing database structure, 
    // we might not want to use RefreshDatabase on a live table.
    // However, for testing CRUD we can use a transaction or just cleanup.

    protected function setUp(): void
    {
        parent::setUp();
        
        // Ensure we have a user to authenticate
        $this->user = User::first() ?: User::factory()->create();
    }

    public function test_can_get_medication_mappings()
    {
        $response = $this->actingAs($this->user)
            ->getJson(route('api.satusehat.mapping-obat.index'));

        $response->assertStatus(200);
    }

    public function test_can_search_barang()
    {
        // Ensure at least one barang exists
        $barang = DataBarang::first();
        
        if ($barang) {
            $response = $this->actingAs($this->user)
                ->getJson(route('api.satusehat.mapping-obat.search-barang', ['q' => substr($barang->nama_brng, 0, 3)]));

            $response->assertStatus(200);
            $response->assertJsonFragment(['kode_brng' => $barang->kode_brng]);
        }
    }

    public function test_can_store_medication_mapping()
    {
        $barang = DataBarang::first();
        if (!$barang) {
            $this->markTestSkipped('No barang available for testing');
        }

        $data = [
            'kode_brng' => $barang->kode_brng,
            'obat_code' => 'KFA001',
            'obat_system' => 'http://sys-ids.kemkes.go.id/kfa',
            'obat_display' => 'Amoxicillin 500mg',
            'form_code' => 'POWDER',
            'form_display' => 'Puyer',
            'route_code' => 'ORAL',
            'route_display' => 'Oral'
        ];

        $response = $this->actingAs($this->user)
            ->postJson(route('api.satusehat.mapping-obat.store'), $data);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('satu_sehat_mapping_obat', [
            'kode_brng' => $barang->kode_brng,
            'obat_code' => 'KFA001'
        ]);
    }

    public function test_can_delete_medication_mapping()
    {
        $barang = DataBarang::first();
        if (!$barang) {
            $this->markTestSkipped('No barang available for testing');
        }

        // Create a mapping first
        SatuSehatMappingObat::updateOrCreate(
            ['kode_brng' => $barang->kode_brng],
            [
                'obat_code' => 'KFA002',
                'obat_system' => 'http://sys-ids.kemkes.go.id/kfa',
                'obat_display' => 'Paracetamol'
            ]
        );

        $response = $this->actingAs($this->user)
            ->deleteJson(route('api.satusehat.mapping-obat.destroy', ['kode_brng' => $barang->kode_brng]));

        $response->assertStatus(200);
        $this->assertDatabaseMissing('satu_sehat_mapping_obat', [
            'kode_brng' => $barang->kode_brng,
            'obat_code' => 'KFA002'
        ]);
    }
}
