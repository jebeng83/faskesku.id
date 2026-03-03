<?php

namespace Tests\Unit;

use App\Http\Controllers\PatientController;
use PHPUnit\Framework\TestCase;

class PatientEmailValidationTest extends TestCase
{
    private function makeController(): object
    {
        return new class extends PatientController {
            public function callNormalize($value): ?string
            {
                return $this->normalizeEmailInput($value);
            }
        };
    }

    public function test_allows_empty_email(): void
    {
        $ctrl = $this->makeController();
        $this->assertNull($ctrl->callNormalize(''));
        $this->assertNull($ctrl->callNormalize('   '));
    }

    public function test_allows_dash_email(): void
    {
        $ctrl = $this->makeController();
        $this->assertNull($ctrl->callNormalize('-'));
        $this->assertNull($ctrl->callNormalize(' - '));
    }

    public function test_preserves_valid_email(): void
    {
        $ctrl = $this->makeController();
        $this->assertSame('nama@domain.com', $ctrl->callNormalize('nama@domain.com'));
    }
}
