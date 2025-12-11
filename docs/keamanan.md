# Dokumentasi Keamanan Aplikasi Faskesku ID

## Ringkasan Eksekutif

Dokumen ini berisi analisis menyeluruh terhadap celah keamanan yang ditemukan dalam aplikasi Faskesku ID dan rekomendasi perbaikan untuk meningkatkan keamanan aplikasi. Analisis dilakukan berdasarkan review kode, konfigurasi, dan praktik keamanan yang diterapkan.

**Tingkat Risiko Keseluruhan: TINGGI**

---

## 1. SQL Injection Vulnerabilities

### 1.1 Risiko: TINGGI

**Lokasi:**
- `app/Http/Controllers/AuthController.php` (baris 26)
- Penggunaan `whereRaw()` dengan string literal

**Masalah:**
```php
$active = DB::table('setting')
    ->select('nama_instansi', 'wallpaper', 'aktifkan')
    ->whereRaw('LOWER(aktifkan) = "yes"')
    ->first();
```

Meskipun menggunakan string literal, penggunaan `whereRaw()` tanpa parameter binding dapat berisiko jika diubah di masa depan.

**Rekomendasi:**
```php
// Gunakan parameter binding
$active = DB::table('setting')
    ->select('nama_instansi', 'wallpaper', 'aktifkan')
    ->whereRaw('LOWER(aktifkan) = ?', ['yes'])
    ->first();

// Atau lebih baik lagi, gunakan Eloquent
$active = DB::table('setting')
    ->select('nama_instansi', 'wallpaper', 'aktifkan')
    ->where(DB::raw('LOWER(aktifkan)'), 'yes')
    ->first();
```

**Tindakan:**
- [ ] Audit semua penggunaan `whereRaw()`, `DB::raw()`, dan query builder dengan string concatenation
- [ ] Gunakan parameter binding untuk semua raw queries
- [ ] Pertimbangkan menggunakan Eloquent ORM untuk menghindari SQL injection
- [ ] Lakukan code review untuk memastikan tidak ada user input yang langsung dimasukkan ke query

---

## 2. Tidak Ada Rate Limiting

### 2.1 Risiko: TINGGI

**Masalah:**
- Endpoint login tidak memiliki rate limiting
- API endpoints tidak memiliki rate limiting
- Rentan terhadap brute force attack dan DDoS

**Dampak:**
- Serangan brute force pada login dapat dilakukan tanpa batas
- API dapat di-overload dengan request berulang
- Konsumsi resource server yang berlebihan

**Rekomendasi:**

**Implementasi Rate Limiting untuk Login:**
```php
// Di routes/web.php atau bootstrap/app.php
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1'); // 5 attempts per minute

// Atau di AuthController
use Illuminate\Cache\RateLimiter;

public function login(Request $request)
{
    $key = 'login.'.$request->ip();
    
    if (RateLimiter::tooManyAttempts($key, 5)) {
        $seconds = RateLimiter::availableIn($key);
        return back()->withErrors([
            'username' => "Terlalu banyak percobaan. Coba lagi dalam {$seconds} detik."
        ]);
    }
    
    // ... existing login logic
    
    RateLimiter::hit($key, 60); // 60 seconds decay
}
```

**Implementasi Rate Limiting untuk API:**
```php
// Di routes/api.php
Route::middleware(['throttle:api'])->group(function () {
    // API routes
});

// Atau custom rate limiting
Route::middleware(['throttle:60,1'])->group(function () {
    // 60 requests per minute
});
```

**Konfigurasi di `config/app.php` atau middleware:**
```php
// Di bootstrap/app.php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->api(prepend: [
        \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
    ]);
    
    $middleware->alias([
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
    ]);
})
```

**Tindakan:**
- [ ] Implementasikan rate limiting untuk endpoint login (5-10 attempts per 15 menit)
- [ ] Implementasikan rate limiting untuk semua API endpoints
- [ ] Konfigurasi rate limiting yang berbeda untuk endpoint berbeda (misalnya: read-only lebih tinggi, write lebih rendah)
- [ ] Monitor dan log semua rate limit violations
- [ ] Pertimbangkan menggunakan Redis untuk rate limiting yang lebih efisien

---

## 3. API Endpoints Tidak Dilindungi Authentication

### 3.1 Risiko: SANGAT TINGGI

**Masalah:**
Banyak endpoint API di `routes/api.php` tidak dilindungi dengan middleware `auth`:

```php
// Endpoint tanpa authentication
Route::get('/penjab', [PenjabController::class, 'index']);
Route::get('/wilayah/provinces', [WilayahController::class, 'provinces']);
Route::get('/lab-tests', [PermintaanLabController::class, 'getLabTests']);
Route::post('/employees', [EmployeeController::class, 'store']);
Route::post('/penjab', [PenjabController::class, 'store']);
// ... dan banyak lagi
```

**Dampak:**
- Data sensitif dapat diakses tanpa autentikasi
- CRUD operations dapat dilakukan oleh siapa saja
- Pelanggaran privasi pasien dan data medis
- Pelanggaran regulasi kesehatan (HIPAA, UU Kesehatan Indonesia)

**Rekomendasi:**

**1. Proteksi Semua API Endpoints:**
```php
// Di routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    // Semua API routes yang memerlukan authentication
    Route::get('/penjab', [PenjabController::class, 'index']);
    Route::post('/penjab', [PenjabController::class, 'store']);
    // ... semua routes lainnya
});

// Hanya endpoint publik yang benar-benar diperlukan
Route::get('/public/wilayah/provinces', [WilayahController::class, 'provinces']);
```

**2. Implementasi Laravel Sanctum untuk API Authentication:**
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

**3. Konfigurasi Sanctum:**
```php
// config/sanctum.php
'guard' => ['web'],
'middleware' => [
    'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
    'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
],
```

**4. Update User Model:**
```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    // ...
}
```

**Tindakan:**
- [ ] Audit semua API endpoints dan identifikasi yang memerlukan authentication
- [ ] Implementasikan Laravel Sanctum atau Passport untuk API authentication
- [ ] Proteksi semua endpoint yang berhubungan dengan data pasien, medis, dan kepegawaian
- [ ] Hanya biarkan endpoint publik untuk data yang benar-benar tidak sensitif (misalnya: referensi wilayah)
- [ ] Implementasikan API key authentication untuk integrasi eksternal jika diperlukan
- [ ] Dokumentasikan semua public endpoints dan alasan mengapa mereka tidak memerlukan authentication

---

## 4. Password Policy Lemah

### 4.1 Risiko: SEDANG-TINGGI

**Masalah:**
- Password minimum hanya 8 karakter
- Tidak ada validasi kompleksitas password (huruf besar, kecil, angka, simbol)
- Tidak ada kebijakan password expiration
- Tidak ada history password untuk mencegah penggunaan password lama

**Lokasi:**
- `app/Http/Controllers/API/UserController.php` (baris 48, 99, 210)

**Rekomendasi:**

**1. Implementasi Password Policy yang Kuat:**
```php
// Buat custom validation rule
php artisan make:rule StrongPassword

// app/Rules/StrongPassword.php
namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class StrongPassword implements Rule
{
    public function passes($attribute, $value)
    {
        return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $value);
    }

    public function message()
    {
        return 'Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol.';
    }
}

// Gunakan di UserController
use App\Rules\StrongPassword;

$validator = Validator::make($request->all(), [
    'password' => ['required', 'string', 'min:8', 'confirmed', new StrongPassword()],
]);
```

**2. Implementasi Password History:**
```php
// Migration untuk password_history table
Schema::create('password_history', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('password_hash');
    $table->timestamps();
});

// Di UserController sebelum update password
$recentPasswords = PasswordHistory::where('user_id', $user->id)
    ->orderBy('created_at', 'desc')
    ->limit(5)
    ->pluck('password_hash');

foreach ($recentPasswords as $oldHash) {
    if (Hash::check($request->password, $oldHash)) {
        return response()->json([
            'success' => false,
            'message' => 'Password tidak boleh sama dengan 5 password sebelumnya'
        ], 422);
    }
}
```

**3. Implementasi Password Expiration:**
```php
// Tambahkan kolom password_changed_at di users table
Schema::table('users', function (Blueprint $table) {
    $table->timestamp('password_changed_at')->nullable();
});

// Middleware untuk check password expiration
public function handle($request, Closure $next)
{
    if (auth()->check()) {
        $user = auth()->user();
        $passwordAge = $user->password_changed_at 
            ? now()->diffInDays($user->password_changed_at) 
            : 999;
        
        if ($passwordAge > 90) { // 90 days
            return redirect()->route('profile.password.change')
                ->with('warning', 'Password Anda sudah lebih dari 90 hari. Silakan ubah password.');
        }
    }
    
    return $next($request);
}
```

**Tindakan:**
- [x] Implementasikan password policy minimal 8 karakter dengan kompleksitas tinggi (disesuaikan untuk kemudahan penggunaan)
- [ ] Tambahkan validasi password history (mencegah penggunaan 5 password terakhir)
- [ ] Implementasikan password expiration (90 hari)
- [ ] Tambahkan password strength meter di frontend
- [ ] Implementasikan account lockout setelah beberapa kali salah password
- [ ] Pertimbangkan implementasi two-factor authentication (2FA) untuk akun admin

---

## 5. Session Security Issues

### 5.1 Risiko: SEDANG

**Masalah:**
- `SESSION_ENCRYPT` default `false` di `config/session.php`
- `SESSION_SECURE_COOKIE` tidak di-set (default null)
- `SESSION_SAME_SITE` menggunakan 'lax' yang kurang ketat

**Dampak:**
- Session data tidak dienkripsi
- Cookie dapat dikirim melalui HTTP (tidak hanya HTTPS)
- Rentan terhadap session hijacking

**Rekomendasi:**

**1. Update Konfigurasi Session:**
```php
// .env
SESSION_DRIVER=database
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=strict
SESSION_HTTP_ONLY=true
SESSION_LIFETIME=120
SESSION_EXPIRE_ON_CLOSE=false
```

**2. Update config/session.php:**
```php
'encrypt' => env('SESSION_ENCRYPT', true),
'secure' => env('SESSION_SECURE_COOKIE', true),
'same_site' => env('SESSION_SAME_SITE', 'strict'),
'http_only' => env('SESSION_HTTP_ONLY', true),
'lifetime' => (int) env('SESSION_LIFETIME', 120),
```

**3. Implementasi Session Regeneration:**
```php
// Di AuthController setelah login berhasil
Auth::login($user, $request->boolean('remember'));
$request->session()->regenerate(); // Sudah ada, baik
$request->session()->put('last_activity', now());

// Middleware untuk regenerate session secara berkala
public function handle($request, Closure $next)
{
    if (auth()->check()) {
        $lastActivity = $request->session()->get('last_activity');
        if ($lastActivity && now()->diffInMinutes($lastActivity) > 30) {
            $request->session()->regenerate();
        }
        $request->session()->put('last_activity', now());
    }
    return $next($request);
}
```

**Tindakan:**
- [ ] Set `SESSION_ENCRYPT=true` di production
- [ ] Set `SESSION_SECURE_COOKIE=true` (hanya untuk HTTPS)
- [ ] Ubah `SESSION_SAME_SITE` menjadi 'strict'
- [ ] Implementasikan session regeneration berkala
- [ ] Monitor session activity dan logout session yang tidak aktif
- [ ] Pertimbangkan menggunakan Redis untuk session storage di production

---

## 6. Error Handling yang Mungkin Expose Informasi

### 6.1 Risiko: SEDANG

**Masalah:**
- `APP_DEBUG=true` dapat mengexpose stack trace dan informasi sensitif
- Error messages mungkin mengandung informasi database, path file, dll

**Rekomendasi:**

**1. Pastikan APP_DEBUG=false di Production:**
```php
// .env (production)
APP_ENV=production
APP_DEBUG=false
```

**2. Custom Error Handler:**
```php
// Di bootstrap/app.php
->withExceptions(function (Exceptions $exceptions): void {
    $exceptions->render(function (Throwable $e, Request $request) {
        if ($request->expectsJson()) {
            return response()->json([
                'success' => false,
                'message' => config('app.debug') 
                    ? $e->getMessage() 
                    : 'Terjadi kesalahan pada server. Silakan hubungi administrator.',
            ], 500);
        }
        
        // Jangan expose error details di production
        if (!config('app.debug')) {
            return response()->view('errors.500', [], 500);
        }
    });
})
```

**3. Logging Error yang Aman:**
```php
// Di AppServiceProvider atau Exception Handler
use Illuminate\Support\Facades\Log;

public function report(Throwable $exception)
{
    // Log error dengan informasi yang aman
    Log::error('Application Error', [
        'message' => $exception->getMessage(),
        'file' => $exception->getFile(),
        'line' => $exception->getLine(),
        'trace' => config('app.debug') ? $exception->getTraceAsString() : null,
        'user_id' => auth()->id(),
        'ip' => request()->ip(),
        'url' => request()->fullUrl(),
    ]);
}
```

**Tindakan:**
- [ ] Pastikan `APP_DEBUG=false` di production environment
- [ ] Implementasikan custom error handler yang tidak expose informasi sensitif
- [ ] Buat halaman error yang user-friendly untuk production
- [ ] Log semua error dengan detail lengkap untuk debugging internal
- [ ] Jangan tampilkan stack trace, database credentials, atau path file ke user
- [ ] Implementasikan error monitoring (misalnya: Sentry, Bugsnag)

---

## 7. File Upload Security

### 7.1 Risiko: TINGGI

**Masalah:**
- Validasi file upload mungkin tidak cukup ketat
- File dapat di-upload tanpa validasi MIME type yang proper
- Tidak ada scanning untuk malware

**Lokasi:**
- `app/Http/Controllers/EmployeeController.php` (baris 110, 276)

**Rekomendasi:**

**1. Validasi File Upload yang Ketat:**
```php
$validator = Validator::make($request->all(), [
    'photo' => [
        'nullable',
        'image',
        'mimes:jpg,jpeg,png,webp',
        'max:2048', // 2MB
        'dimensions:min_width=100,min_height=100,max_width=2000,max_height=2000',
    ],
]);

// Validasi MIME type dari file content, bukan hanya extension
$file = $request->file('photo');
$mimeType = $file->getMimeType();
$allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];

if (!in_array($mimeType, $allowedMimes)) {
    return back()->withErrors(['photo' => 'Format file tidak diizinkan.']);
}

// Validasi file signature (magic bytes)
$fileContent = file_get_contents($file->getRealPath());
if (!str_starts_with($fileContent, "\xFF\xD8") && // JPEG
    !str_starts_with($fileContent, "\x89PNG") &&   // PNG
    !str_starts_with($fileContent, "RIFF")        // WebP
) {
    return back()->withErrors(['photo' => 'File tidak valid.']);
}
```

**2. Sanitasi Nama File:**
```php
$filename = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))
    . '.' . $file->getClientOriginalExtension();

// Atau generate nama unik
$filename = Str::random(40) . '.' . $file->getClientOriginalExtension();

$path = $file->storeAs('pegawai', $filename, 'public');
```

**3. Storage File yang Aman:**
```php
// Simpan di storage/app/private, bukan public
$path = $file->store('pegawai', 'private');

// Generate signed URL untuk akses file
$url = Storage::disk('private')->temporaryUrl($path, now()->addHours(1));
```

**4. Implementasi Virus Scanning (Opsional):**
```php
// Menggunakan ClamAV atau service eksternal
use Illuminate\Support\Facades\Process;

$result = Process::run(['clamscan', '--stdout', $file->getRealPath()]);
if (str_contains($result->output(), 'FOUND')) {
    return back()->withErrors(['photo' => 'File terdeteksi mengandung malware.']);
}
```

**Tindakan:**
- [ ] Validasi MIME type dari file content, bukan hanya extension
- [ ] Validasi file signature (magic bytes)
- [ ] Batasi ukuran file maksimal
- [ ] Sanitasi nama file sebelum disimpan
- [ ] Simpan file di storage private, bukan public
- [ ] Generate signed URL untuk akses file
- [ ] Pertimbangkan implementasi virus scanning
- [ ] Implementasikan file type whitelist yang ketat

---

## 8. Cross-Site Scripting (XSS) Vulnerabilities

### 8.1 Risiko: SEDANG-TINGGI

**Masalah:**
- Output data user mungkin tidak di-escape dengan benar
- React/Inertia secara default sudah aman, tapi perlu verifikasi
- Data dari database yang ditampilkan mungkin mengandung script

**Rekomendasi:**

**1. Pastikan Data Di-escape di Frontend:**
```jsx
// React sudah otomatis escape, tapi pastikan tidak menggunakan dangerouslySetInnerHTML
// ❌ JANGAN LAKUKAN INI
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ GUNAKAN INI
<div>{userInput}</div>
```

**2. Sanitasi Data di Backend:**
```php
use Illuminate\Support\Str;

// Sanitasi sebelum menyimpan ke database
$data = [
    'nama' => strip_tags($request->nama),
    'alamat' => htmlspecialchars($request->alamat, ENT_QUOTES, 'UTF-8'),
];

// Atau gunakan helper
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags($input), ENT_QUOTES, 'UTF-8');
}
```

**3. Content Security Policy (CSP):**
```php
// Di middleware atau AppServiceProvider
public function handle($request, Closure $next)
{
    $response = $next($request);
    
    $response->headers->set('Content-Security-Policy', 
        "default-src 'self'; " .
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " .
        "style-src 'self' 'unsafe-inline'; " .
        "img-src 'self' data: https:; " .
        "font-src 'self' data:;"
    );
    
    return $response;
}
```

**Tindakan:**
- [ ] Audit semua output data user di frontend
- [ ] Pastikan tidak menggunakan `dangerouslySetInnerHTML` tanpa sanitasi
- [ ] Implementasikan Content Security Policy (CSP) headers
- [ ] Sanitasi input sebelum menyimpan ke database
- [ ] Gunakan library sanitasi seperti DOMPurify untuk HTML content
- [ ] Lakukan security testing dengan tools seperti OWASP ZAP

---

## 9. Authorization Issues

### 9.1 Risiko: TINGGI

**Masalah:**
- Beberapa endpoint mungkin tidak memiliki authorization check
- User dapat mengakses data yang bukan miliknya
- Tidak ada check ownership untuk beberapa resources

**Rekomendasi:**

**1. Implementasi Policy untuk Setiap Resource:**
```php
php artisan make:policy PatientPolicy --model=Patient

// app/Policies/PatientPolicy.php
public function view(User $user, Patient $patient)
{
    // Hanya bisa melihat pasien sendiri atau jika memiliki permission
    return $user->can('view patients') || 
           $patient->created_by === $user->id;
}

public function update(User $user, Patient $patient)
{
    return $user->can('edit patients') || 
           $patient->created_by === $user->id;
}
```

**2. Gunakan Policy di Controller:**
```php
public function show(Patient $patient)
{
    $this->authorize('view', $patient);
    
    return response()->json([
        'success' => true,
        'data' => $patient
    ]);
}
```

**3. Implementasi Scope untuk Query Filtering:**
```php
// Di Model
public function scopeForUser($query, User $user)
{
    if (!$user->hasRole('admin')) {
        return $query->where('created_by', $user->id);
    }
    return $query;
}

// Di Controller
$patients = Patient::forUser(auth()->user())->get();
```

**Tindakan:**
- [ ] Audit semua controller methods dan pastikan ada authorization check
- [ ] Buat Policy untuk setiap resource penting (Patient, Employee, dll)
- [ ] Implementasikan check ownership untuk resources yang user-specific
- [ ] Gunakan middleware `can` atau `authorize` di routes
- [ ] Implementasikan row-level security di database queries
- [ ] Test authorization dengan berbagai role dan permission

---

## 10. CSRF Protection

### 10.1 Risiko: RENDAH-SEDANG

**Status:** CSRF protection sudah diimplementasikan dengan baik

**Verifikasi:**
- CSRF token validation sudah aktif di `bootstrap/app.php`
- Inertia.js secara otomatis mengirim CSRF token
- Exception handler untuk 419 error sudah ada

**Rekomendasi Tambahan:**
- [ ] Pastikan semua form menggunakan CSRF token
- [ ] Verifikasi CSRF token di API endpoints jika menggunakan session-based auth
- [ ] Pertimbangkan menggunakan SameSite cookie untuk proteksi tambahan

---

## 11. Input Validation

### 11.1 Risiko: SEDANG

**Masalah:**
- Beberapa endpoint mungkin tidak memiliki validasi yang cukup
- Validasi mungkin tidak konsisten di seluruh aplikasi

**Rekomendasi:**

**1. Gunakan Form Request untuk Validasi:**
```php
php artisan make:request StorePatientRequest

// app/Http/Requests/StorePatientRequest.php
public function rules()
{
    return [
        'nm_pasien' => 'required|string|max:50',
        'no_ktp' => 'nullable|string|size:16|unique:pasien,no_ktp',
        'tgl_lahir' => 'required|date|before:today',
        'alamat' => 'required|string|max:200',
    ];
}

// Di Controller
public function store(StorePatientRequest $request)
{
    $patient = Patient::create($request->validated());
    // ...
}
```

**2. Validasi Input yang Ketat:**
```php
// Validasi NIK/KTP
'no_ktp' => [
    'required',
    'string',
    'size:16',
    'regex:/^[0-9]{16}$/',
    'unique:pasien,no_ktp'
],

// Validasi email
'email' => [
    'required',
    'email:rfc,dns', // Validasi DNS record
    'max:255',
    'unique:users,email'
],

// Validasi URL
'website' => [
    'nullable',
    'url',
    'max:255'
],
```

**Tindakan:**
- [ ] Buat Form Request untuk setiap form submission
- [ ] Validasi semua input dengan rules yang ketat
- [ ] Gunakan custom validation rules untuk validasi kompleks
- [ ] Validasi di frontend dan backend (defense in depth)
- [ ] Sanitasi input sebelum menyimpan ke database

---

## 12. Logging dan Monitoring

### 12.1 Risiko: SEDANG

**Masalah:**
- Tidak ada logging untuk aktivitas keamanan penting
- Tidak ada monitoring untuk serangan atau aktivitas mencurigakan

**Rekomendasi:**

**1. Implementasi Security Logging:**
```php
use Illuminate\Support\Facades\Log;

// Log login attempts
Log::info('Login attempt', [
    'username' => $request->username,
    'ip' => $request->ip(),
    'user_agent' => $request->userAgent(),
    'success' => $success,
]);

// Log sensitive operations
Log::warning('Sensitive operation', [
    'user_id' => auth()->id(),
    'action' => 'delete_patient',
    'patient_id' => $patient->id,
    'ip' => $request->ip(),
]);
```

**2. Implementasi Audit Trail:**
```php
// Migration untuk audit_logs table
Schema::create('audit_logs', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->nullable()->constrained();
    $table->string('action'); // create, update, delete, view
    $table->string('model'); // Patient, Employee, etc
    $table->unsignedBigInteger('model_id')->nullable();
    $table->json('old_values')->nullable();
    $table->json('new_values')->nullable();
    $table->string('ip_address');
    $table->text('user_agent');
    $table->timestamps();
    
    $table->index(['user_id', 'created_at']);
    $table->index(['model', 'model_id']);
});
```

**3. Implementasi Monitoring:**
```php
// Middleware untuk detect suspicious activity
public function handle($request, Closure $next)
{
    // Check untuk multiple failed login attempts
    $failedAttempts = Cache::get('failed_logins_' . $request->ip(), 0);
    if ($failedAttempts > 10) {
        Log::alert('Possible brute force attack', [
            'ip' => $request->ip(),
            'attempts' => $failedAttempts,
        ]);
        // Block IP atau kirim alert
    }
    
    return $next($request);
}
```

**Tindakan:**
- [ ] Implementasikan logging untuk semua aktivitas keamanan penting
- [ ] Buat audit trail untuk operasi CRUD pada data sensitif
- [ ] Monitor failed login attempts dan aktivitas mencurigakan
- [ ] Setup alert untuk aktivitas yang tidak biasa
- [ ] Pertimbangkan menggunakan service seperti Loggly, Papertrail, atau ELK stack
- [ ] Implementasikan log rotation untuk mencegah disk penuh

---

## 13. Database Security

### 13.1 Risiko: SEDANG

**Rekomendasi:**

**1. Database Connection Security:**
```php
// .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=faskesku
DB_USERNAME=faskesku_user
DB_PASSWORD=strong_password_here

// Gunakan SSL untuk koneksi database
DB_SSL_CA=/path/to/ca-cert.pem
DB_SSL_CERT=/path/to/client-cert.pem
DB_SSL_KEY=/path/to/client-key.pem
```

**2. Database User Permissions:**
```sql
-- Buat user dengan permission terbatas
CREATE USER 'faskesku_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON faskesku.* TO 'faskesku_user'@'localhost';
-- Jangan berikan DROP, CREATE, ALTER permission ke aplikasi
FLUSH PRIVILEGES;
```

**3. Database Backup:**
- [ ] Setup automated daily backups
- [ ] Test restore procedure secara berkala
- [ ] Simpan backup di lokasi yang aman dan terpisah
- [ ] Enkripsi backup files
- [ ] Implementasikan retention policy untuk backup

**Tindakan:**
- [ ] Gunakan strong password untuk database user
- [ ] Batasi database user permissions (hanya SELECT, INSERT, UPDATE, DELETE)
- [ ] Gunakan SSL/TLS untuk koneksi database
- [ ] Implementasikan database backup yang teratur
- [ ] Enkripsi data sensitif di database (misalnya: password, data medis)
- [ ] Implementasikan database connection pooling
- [ ] Monitor database access logs

---

## 14. Environment Variables dan Secrets

### 14.1 Risiko: TINGGI

**Rekomendasi:**

**1. Pastikan .env Tidak Ter-commit:**
```gitignore
# .gitignore
.env
.env.backup
.env.production
*.env
```

**2. Gunakan Secret Management:**
- Gunakan Laravel Vault atau service seperti AWS Secrets Manager
- Jangan hardcode credentials di kode
- Rotate secrets secara berkala

**3. Environment-specific Configuration:**
```php
// .env.example (template, boleh di-commit)
APP_NAME=Faskesku
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

**Tindakan:**
- [ ] Pastikan .env tidak ter-commit ke git
- [ ] Gunakan .env.example sebagai template
- [ ] Rotate semua secrets secara berkala (setiap 90 hari)
- [ ] Jangan share .env file melalui email atau chat
- [ ] Gunakan different credentials untuk setiap environment
- [ ] Implementasikan secret rotation policy

---

## 15. HTTPS dan SSL/TLS

### 15.1 Risiko: TINGGI

**Rekomendasi:**

**1. Force HTTPS di Production:**
```php
// Di AppServiceProvider
public function boot()
{
    if (config('app.env') === 'production') {
        URL::forceScheme('https');
    }
}
```

**2. HSTS Headers:**
```php
// Middleware
public function handle($request, Closure $next)
{
    $response = $next($request);
    
    $response->headers->set('Strict-Transport-Security', 
        'max-age=31536000; includeSubDomains; preload'
    );
    
    return $response;
}
```

**Tindakan:**
- [ ] Setup SSL certificate untuk production
- [ ] Force HTTPS untuk semua requests di production
- [ ] Implementasikan HSTS headers
- [ ] Setup SSL certificate auto-renewal
- [ ] Test SSL configuration dengan tools seperti SSL Labs

---

## 16. Dependency Security

### 16.1 Risiko: SEDANG

**Rekomendasi:**

**1. Update Dependencies Secara Berkala:**
```bash
composer update
npm update
```

**2. Audit Dependencies untuk Vulnerabilities:**
```bash
composer audit
npm audit
```

**3. Gunakan Dependabot atau Similar Service:**
- Setup automated dependency updates
- Review security advisories secara berkala

**Tindakan:**
- [ ] Update semua dependencies ke versi terbaru yang aman
- [ ] Audit dependencies untuk known vulnerabilities
- [ ] Setup automated dependency scanning
- [ ] Review dan update dependencies secara berkala (bulanan)
- [ ] Hapus dependencies yang tidak digunakan

---

## Checklist Implementasi Keamanan

### Prioritas Tinggi (Implementasi Segera)
- [ ] Fix SQL Injection vulnerabilities
- [ ] Implementasikan rate limiting untuk login dan API
- [ ] Proteksi semua API endpoints dengan authentication
- [ ] Implementasikan password policy yang kuat
- [ ] Setup HTTPS dan SSL/TLS di production
- [ ] Pastikan APP_DEBUG=false di production

### Prioritas Sedang (Implementasi dalam 1-2 Minggu)
- [ ] Perbaiki session security configuration
- [ ] Implementasikan file upload security yang ketat
- [ ] Implementasikan authorization checks untuk semua endpoints
- [ ] Setup security logging dan monitoring
- [ ] Implementasikan input validation yang ketat
- [ ] Audit dan update dependencies

### Prioritas Rendah (Implementasi dalam 1 Bulan)
- [ ] Implementasikan audit trail
- [ ] Setup database backup yang teratur
- [ ] Implementasikan Content Security Policy
- [ ] Setup secret rotation policy
- [ ] Implementasikan two-factor authentication (2FA)

---

## Testing Keamanan

### 1. Penetration Testing
- [ ] Lakukan penetration testing oleh security expert
- [ ] Test untuk SQL injection, XSS, CSRF vulnerabilities
- [ ] Test authentication dan authorization
- [ ] Test file upload security
- [ ] Test API security

### 2. Security Scanning
- [ ] Gunakan tools seperti OWASP ZAP, Burp Suite
- [ ] Scan untuk known vulnerabilities
- [ ] Test dengan automated security scanners

### 3. Code Review
- [ ] Lakukan security-focused code review
- [ ] Review semua user input handling
- [ ] Review authentication dan authorization logic
- [ ] Review error handling

---

## Monitoring dan Maintenance

### 1. Security Monitoring
- [ ] Setup monitoring untuk failed login attempts
- [ ] Monitor untuk suspicious activity
- [ ] Setup alerts untuk security events
- [ ] Review logs secara berkala

### 2. Regular Updates
- [ ] Update Laravel framework secara berkala
- [ ] Update dependencies setiap bulan
- [ ] Review dan apply security patches segera
- [ ] Keep up dengan security advisories

### 3. Security Training
- [ ] Training untuk developers tentang secure coding
- [ ] Training untuk administrators tentang security best practices
- [ ] Regular security awareness sessions

---

## Kontak dan Support

Jika menemukan celah keamanan, silakan hubungi tim security melalui:
- Email: security@faskesku.id
- Jangan disclose vulnerability secara publik sebelum diperbaiki

---

## Referensi

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Laravel Security Documentation](https://laravel.com/docs/security)
- [PHP Security Best Practices](https://www.php.net/manual/en/security.php)
- [HIPAA Compliance Guide](https://www.hhs.gov/hipaa/index.html)

---

**Dokumen ini harus direview dan diupdate secara berkala (minimal setiap 3 bulan atau setelah perubahan signifikan pada aplikasi).**

**Terakhir diupdate:** {{ date('Y-m-d') }}
