# Sistem Aturan & Kondisi Tindakan (Action Rule System)

Sistem ini memungkinkan konfigurasi dinamis untuk menentukan apakah suatu tindakan (Action) boleh dieksekusi berdasarkan serangkaian kondisi (Conditions).

## Konsep Dasar

1.  **Action**: Representasi dari kegiatan yang akan dilakukan (contoh: `approve_purchase`, `access_vip_area`).
2.  **Condition**: Syarat yang harus dipenuhi. Kondisi ini berupa Class PHP yang mengimplementasikan logika pengecekan tertentu.
3.  **Evaluation**: Proses memeriksa semua kondisi yang terhubung ke Action.

## Struktur Database

-   `sys_actions`: Menyimpan definisi tindakan dan mode logika (`AND` / `OR`).
-   `sys_action_conditions`: Menyimpan hubungan antara Action dan Condition Handler beserta parameternya.

## Cara Menggunakan

### 1. Membuat Handler Kondisi Baru

Buat class baru di `App\Services\ActionRuleSystem\Handlers` yang mengimplementasikan `ConditionHandlerInterface`.

```php
namespace App\Services\ActionRuleSystem\Handlers;

use App\Services\ActionRuleSystem\Contracts\ConditionHandlerInterface;

class CheckAgeHandler implements ConditionHandlerInterface
{
    public function check(array $parameters, array $context): bool
    {
        $minAge = $parameters['min_age'] ?? 18;
        $userAge = $context['user']->age ?? 0;
        
        return $userAge >= $minAge;
    }

    public function defaultFailureMessage(): string
    {
        return 'Usia tidak mencukupi.';
    }
}
```

### 2. Menghubungkan Kondisi dengan Tindakan

Gunakan `ActionRuleService` untuk menambahkan kondisi secara programatis (atau buat UI Admin untuk mengisi tabel `sys_action_conditions`).

```php
use App\Services\ActionRuleSystem\ActionRuleService;
use App\Services\ActionRuleSystem\Handlers\CheckAgeHandler;

$service = app(ActionRuleService::class);

// Menambahkan kondisi ke tindakan 'buy_alcohol'
// Param: Action Slug, Handler Class, Parameters, Priority, Custom Error Msg
$service->addCondition(
    'buy_alcohol', 
    CheckAgeHandler::class, 
    ['min_age' => 21], 
    10, 
    'Anda harus berusia 21 tahun ke atas.'
);
```

### 3. Mengevaluasi Tindakan

Saat kode aplikasi ingin menjalankan tindakan, panggil `evaluate`.

```php
$context = ['user' => auth()->user()];
$result = $service->evaluate('buy_alcohol', $context);

if ($result['allowed']) {
    // Lakukan tindakan
} else {
    // Tampilkan error
    foreach ($result['reasons'] as $reason) {
        echo $reason;
    }
}
```

## Prioritas & Konflik

-   **Prioritas**: Diatur melalui kolom `priority` (integer). Angka lebih besar dievaluasi lebih dulu.
-   **Konflik/Logika**:
    -   **AND** (Default): Semua kondisi harus `true`. Jika satu saja `false` (berdasarkan prioritas tertinggi), evaluasi berhenti dan akses ditolak.
    -   **OR**: Salah satu kondisi harus `true`. Jika ditemukan kondisi `true`, evaluasi berhenti dan akses diizinkan.

## Logging

Sistem secara otomatis mencatat proses evaluasi ke log aplikasi (`storage/logs/laravel.log`).
-   Info: Memulai evaluasi tindakan.
-   Debug: Hasil per kondisi (PASS/FAIL).
-   Error: Jika terjadi exception pada handler.

## Memodifikasi Kondisi

```php
// Update parameter kondisi ID 1
$service->updateCondition(1, ['parameters' => ['min_age' => 25]]);

// Hapus kondisi ID 1
$service->removeCondition(1);
```
