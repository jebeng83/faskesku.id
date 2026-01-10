<?php

namespace Tests\Unit;

use App\Http\Controllers\Pcare\PcareKunjunganController;
use PHPUnit\Framework\TestCase;

class PcareKunjunganControllerTest extends TestCase
{
    private function makeController(): object
    {
        return new class extends PcareKunjunganController {
            public function callParseFromString(string $s): ?string { return $this->parseNoKunjunganFromString($s); }
            public function callParseFromResponse(array $a): ?string { return $this->parseNoKunjunganFromResponse($a); }
        };
    }

    public function testExtractNoKunjunganFromPlainText()
    {
        $ctrl = $this->makeController();
        $txt = 'Nomor Kunjungan: 112516160126Y000857; status: CREATED';
        $val = $ctrl->callParseFromString($txt);
        $this->assertSame('112516160126Y000857', $val);
    }

    public function testExtractNoKunjunganFromJsonMessage()
    {
        $ctrl = $this->makeController();
        $json = json_encode([
            'response' => [
                'field' => 'noKunjungan',
                'message' => '112516160126Y000857',
            ],
        ]);
        $val = $ctrl->callParseFromString($json);
        $this->assertSame('112516160126Y000857', $val);
    }

    public function testExtractNoKunjunganFromResponseArray()
    {
        $ctrl = $this->makeController();
        $arr = [
            'response' => [
                'noKunjungan' => '112516160126Y000857',
            ],
        ];
        $val = $ctrl->callParseFromResponse($arr);
        $this->assertSame('112516160126Y000857', $val);
    }
}

