<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class StrongPassword implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Password harus minimal 8 karakter dan mengandung:
        // - Minimal satu huruf kecil
        // - Minimal satu huruf besar
        // - Minimal satu angka
        // - Minimal satu simbol khusus
        if (! preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $value)) {
            $fail('Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol khusus (@$!%*?&).');
        }
    }
}
