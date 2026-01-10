<?php

namespace Tests\Unit;

use Tests\TestCase;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QrCodeTest extends TestCase
{
    public function test_can_generate_svg_qr(): void
    {
        $svg = QrCode::size(80)->errorCorrection('H')->format('svg')->generate('TEST');
        $str = (string) $svg;
        $this->assertIsString($str);
        $this->assertNotEmpty($str);
        $this->assertStringContainsString('<svg', $str);
    }
}
