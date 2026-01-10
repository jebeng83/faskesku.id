<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;

class SuratPdfTest extends TestCase
{
    public function test_authenticated_user_can_download_sks_pdf_without_qr_param(): void
    {
        $user = User::factory()->make();
        $this->actingAs($user);

        $response = $this->get('/surat/pdf?type=SKS');

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'application/pdf');
        $this->assertStringContainsString('attachment;', (string) $response->headers->get('content-disposition'));
        $this->assertGreaterThan(0, strlen((string) $response->getContent()));
    }
}

