# Error 419 (CSRF Token Mismatch) - Penjelasan & Solusi

## Apa itu Error 419?

Error 419 adalah HTTP status code yang dikembalikan oleh Laravel ketika terjadi **CSRF token mismatch**. Ini biasanya terjadi ketika:

1. **Session expired** - Session pengguna telah berakhir (default: 120 menit)
2. **CSRF token tidak valid** - Token CSRF yang dikirim tidak cocok dengan token di session
3. **Cookie tidak terkirim** - Cookie session tidak terkirim dengan benar dalam request
4. **Multiple tabs** - User membuka aplikasi di beberapa tab dan session berubah

## Mengapa Error Ini Terjadi?

### Penyebab Umum:

1. **Session Lifetime Terlalu Pendek**
   - Default Laravel: 120 menit
   - Jika user tidak aktif selama waktu tersebut, session akan expire
   - File: `config/session.php` → `'lifetime' => env('SESSION_LIFETIME', 120)`

2. **CSRF Token Tidak Ter-refresh**
   - Token CSRF di meta tag tidak ter-update setelah session berubah
   - Browser cache token lama

3. **Cookie SameSite Policy**
   - Browser modern memiliki kebijakan SameSite yang ketat
   - Cookie mungkin tidak terkirim dalam cross-site requests

4. **Inertia Request Handling**
   - Inertia menggunakan fetch API yang mungkin tidak mengirim cookie dengan benar
   - Perlu konfigurasi khusus untuk memastikan cookie terkirim

## Solusi yang Sudah Diimplementasikan

### 1. Backend: Exception Handler (bootstrap/app.php)

```php
->withExceptions(function (Exceptions $exceptions): void {
    // Handle 419 CSRF Token Expired untuk Inertia requests
    // Sesuai dokumentasi Inertia: https://inertiajs.com/csrf-protection
    $exceptions->respond(function (\Symfony\Component\HttpFoundation\Response $response, \Throwable $exception, \Illuminate\Http\Request $request) {
        // Handle CSRF token mismatch (419 error)
        if ($response->getStatusCode() === 419) {
            // Untuk Inertia requests, redirect kembali dengan flash message
            // Ini akan menghasilkan Inertia response yang valid
            return back()->with([
                'error' => 'Halaman telah berakhir. Silakan coba lagi.',
            ]);
        }
        
        return $response;
    });
})
```

**Cara Kerja:**
- Ketika terjadi 419 error, Laravel akan redirect kembali ke halaman sebelumnya
- Flash message `error` akan tersedia di page props Inertia
- User akan melihat pesan error yang user-friendly, bukan error modal

### 2. Frontend: CSRF Token Handling (bootstrap.js)

```javascript
// Pastikan cookie sesi dikirim pada request XHR antar port
window.axios.defaults.withCredentials = true;

// Get CSRF token from meta tag dan set ke axios
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
}

// Inject CSRF header untuk semua request fetch same-origin
window.fetch = async (input, init = {}) => {
    if (isSameOrigin(input) && needsCsrf(init.method)) {
        const headers = new Headers(init.headers || {});
        if (!headers.has('X-CSRF-TOKEN')) {
            headers.set('X-CSRF-TOKEN', csrfToken);
        }
        if (!init.credentials) {
            init.credentials = 'same-origin';
        }
    }
    return origFetch(input, init);
};

// Auto-refresh CSRF Token & Retry untuk 419
window.axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;
        const is419 = status === 419;
        
        if (is419 && !alreadyRetried) {
            await refreshCsrfToken();
            // Retry request dengan token baru
            return window.axios.request(retryConfig);
        }
        return Promise.reject(error);
    }
);
```

**Cara Kerja:**
- Axios otomatis mengirim CSRF token di header `X-CSRF-TOKEN`
- Fetch API juga di-wrap untuk mengirim CSRF token
- Jika terjadi 419, otomatis refresh token dan retry request sekali

### 3. Frontend: Inertia Error Handling (app.jsx)

Inertia akan otomatis menangani 419 error melalui backend redirect dengan flash message. Flash message akan tersedia di page props dan bisa ditampilkan di UI.

## Cara Menampilkan Flash Message Error di UI

### Contoh di Component:

```jsx
import { usePage } from '@inertiajs/react';

export default function MyComponent() {
    const { flash } = usePage().props;
    
    return (
        <div>
            {flash?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {flash.error}
                </div>
            )}
        </div>
    );
}
```

## Troubleshooting

### Jika Error 419 Masih Terjadi:

1. **Cek Session Lifetime**
   ```bash
   # Cek di config/session.php
   'lifetime' => env('SESSION_LIFETIME', 120)
   ```
   - Jika terlalu pendek, tambahkan di `.env`: `SESSION_LIFETIME=240` (4 jam)

2. **Cek Cookie Settings**
   ```php
   // config/session.php
   'same_site' => env('SESSION_SAME_SITE', 'lax'),
   'secure' => env('SESSION_SECURE_COOKIE', false), // true untuk HTTPS
   ```

3. **Clear Session & Cache**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan session:clear
   ```

4. **Cek Browser Console**
   - Lihat apakah cookie terkirim di Network tab
   - Cek apakah CSRF token ada di meta tag: `<meta name="csrf-token" content="...">`

5. **Cek Session Driver**
   ```bash
   # Pastikan menggunakan database session driver
   SESSION_DRIVER=database
   ```
   - Pastikan tabel `sessions` sudah dibuat: `php artisan session:table`

## Best Practices

1. **Gunakan Database Session Driver**
   - Lebih reliable daripada file session
   - Bisa di-share antar server (jika menggunakan load balancer)

2. **Set Session Lifetime yang Wajar**
   - Jangan terlalu pendek (user akan sering logout)
   - Jangan terlalu panjang (security risk)
   - Rekomendasi: 2-4 jam untuk aplikasi medis

3. **Monitor Session Expiry**
   - Tampilkan warning sebelum session expire
   - Auto-refresh session saat user aktif

4. **Handle Error dengan User-Friendly Message**
   - Jangan tampilkan error teknis ke user
   - Berikan instruksi yang jelas untuk mengatasi masalah

## Referensi

- [Inertia CSRF Protection Documentation](https://inertiajs.com/csrf-protection)
- [Laravel CSRF Protection](https://laravel.com/docs/csrf)
- [Laravel Session Configuration](https://laravel.com/docs/session)
