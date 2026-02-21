# 🏥 Panduan Implementasi Webhook SATUSEHAT

Dokumentasi ini merangkum langkah-langkah konfigurasi dan implementasi Webhook SATUSEHAT berdasarkan portal [SATUSEHAT Platform](https://satusehat.kemkes.go.id/platform/dashboard/webhook-configuration).

---

## 1. Apa itu Webhook SATUSEHAT?

Webhook adalah mekanisme **push notification** dari SATUSEHAT ke server aplikasi Fasyankes (Fasilitas Pelayanan Kesehatan). Alih-alih aplikasi kita terus-menerus melakukan *polling* (bertanya ke server SATUSEHAT), SATUSEHAT akan mengirimkan data secara *real-time* saat terjadi peristiwa tertentu.

**Kegunaan Utama:**
- **Konsen Pasien (Patient Consent):** Mendapatkan notifikasi instan saat pasien memberikan (*Opt-in*) atau mencabut (*Opt-out*) izin akses data rekam medis melalui aplikasi SATUSEHAT Mobile (PeduliLindungi).
- **Update Resource:** (Opsional) Notifikasi jika ada perubahan data resource tertentu yang relevan.

---

## 2. Langkah Konfigurasi (Dashboard)

1.  Buka [Dashboard Webhook SATUSEHAT](https://satusehat.kemkes.go.id/platform/dashboard/webhook-configuration).
2.  **Notification URL:** Masukkan URL endpoint aplikasi Anda yang akan menerima data.
    *   Contoh: `https://api.faskesku.id/api/webhooks/satusehat`
3.  **Webhook Secret:** Dashboard akan memberikan sebuah *Secret Key*. **Simpan kunci ini dengan aman** di file `.env` aplikasi Anda. Kunci ini digunakan untuk memverifikasi bahwa data benar-benar dikirim oleh SATUSEHAT.
4.  **Events:** Pilih event yang ingin dipantau (pilih `Patient Consent` atau sesuai kebutuhan).
5.  **Status:** Pastikan status dalam keadaan `Active`.

---

## 3. Persiapan di Aplikasi (Laravel)

### A. Update Environment (`.env`)
Tambahkan secret key yang didapat dari dashboard ke file `.env`:

```env
SATUSEHAT_WEBHOOK_SECRET=your_webhook_secret_here
```

### B. Membuat Route Baru (`routes/api.php`)
Tambahkan route public (karena dipanggil oleh server SATUSEHAT).

```php
// routes/api.php

Route::post('/webhooks/satusehat', [\App\Http\Controllers\Webhook\SatuSehatWebhookController::class, 'handle'])
    ->name('webhooks.satusehat');
```

> **Catatan:** Jika Anda menggunakan CSRF protection, pastikan route ini masuk dalam daftar pengecualian di `bootstrap/app.php` (untuk Laravel 11+) atau middleware `VerifyCsrfToken` (Laravel < 11).

---

## 4. Struktur Payload & Verifikasi Keamanan

SATUSEHAT mengirimkan data dalam format JSON melalui metode `POST` dengan header keamanan `X-Signature`.

### Verifikasi Signature
Aplikasi **WAJIB** memverifikasi signature untuk mencegah serangan *Spoofing*.

```php
// Contoh Logika Verifikasi
$signature = $request->header('X-Signature');
$payload = $request->getContent();
$expectedSignature = hash_hmac('sha256', $payload, config('services.satusehat.webhook_secret'));

if (!hash_equals($expectedSignature, $signature)) {
    return response()->json(['message' => 'Invalid signature'], 401);
}
```

### Contoh Payload Konsen
```json
{
  "timestamp": "2024-02-20T12:00:00Z",
  "event": "PATIENT_CONSENT_UPDATE",
  "data": {
    "patient_id": "P01234567890",
    "consent_type": "DATA_SHARING",
    "status": "OPT_IN",
    "resource_type": "Consent"
  }
}
```

---

## 5. Implementasi Controller

Buat controller baru `app/Http/Controllers/Webhook/SatuSehatWebhookController.php`:

```php
<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class SatuSehatWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // 1. Verifikasi Signature
        $signature = $request->header('X-Signature');
        $secret = config('services.satusehat.webhook_secret');
        $payload = $request->getContent();

        if (!$signature || hash_hmac('sha256', $payload, $secret) !== $signature) {
            Log::warning('[SATUSEHAT Webhook] Invalid Signature');
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $data = json_decode($payload, true);
        $event = $data['event'] ?? '';

        // 2. Routing berdasarkan Event
        switch ($event) {
            case 'PATIENT_CONSENT_UPDATE':
                return $this->processConsentUpdate($data['data']);
            
            default:
                Log::info('[SATUSEHAT Webhook] Unhandled event: ' . $event);
                return response()->json(['message' => 'Event ignored'], 200);
        }
    }

    private function processConsentUpdate($data)
    {
        $ihsNumber = $data['patient_id']; // ID Pasien di SATUSEHAT
        $status = $data['status']; // OPT_IN atau OPT_OUT

        // Cari pasien di tabel mapping
        $mapping = DB::table('satusehat_patient_mapping')
            ->where('satusehat_id', $ihsNumber)
            ->first();

        if ($mapping) {
            // Update status konsen (asumsi ada kolom status_konsen di table pasien atau mapping)
            Log::info("[SATUSEHAT Webhook] Konsen Update for Patient: {$mapping->no_rkm_medis} to {$status}");
            
            // Contoh Update:
            // DB::table('pasien')->where('no_rkm_medis', $mapping->no_rkm_medis)
            //     ->update(['satusehat_consent' => ($status === 'OPT_IN')]);
        }

        return response()->json(['message' => 'Webhook processed'], 200);
    }
}
```

---

## 6. Testing & Debugging

1.  **Gunakan Ngrok:** Karena SATUSEHAT memerlukan URL publik, gunakan `ngrok` untuk mengekspos server lokal Anda.
    *   Command: `ngrok http 8000`
2.  **Simulator:** Anda dapat mencoba mengirimkan payload manual menggunakan Postman ke URL aplikasi Anda untuk memastikan logika verifikasi signature dan update database sudah benar.
3.  **Logging:** Selalu aktifkan `Log::info` atau `Log::error` pada tahap awal untuk memantau data yang masuk dari SATUSEHAT.

---

## 7. Hal Penting Lainnya

- **Respon Cepat:** Webhook harus merespon dengan status `200 OK` sesegera mungkin. Jika proses database berat, gunakan Laravel **Jobs/Queue**.
- **Idempotency:** Terkadang SATUSEHAT mengirimkan webhook yang sama dua kali. Pastikan aplikasi Anda bisa menangani data duplikat dengan aman.
- **Retry Mechanism:** Jika server Anda sedang down, SATUSEHAT biasanya akan mencoba mengirim ulang (*retry*) dalam interval waktu tertentu.

---

**Dibuat Oleh:** Antigravity AI  
**Tanggal:** 20 Februari 2024  
**Status Dokumentasi:** Draft Implementasi
