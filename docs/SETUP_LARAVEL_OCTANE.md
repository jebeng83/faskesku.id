# Setup Laravel Octane dengan FrankenPHP

## 📋 Ringkasan

Dokumen ini menjelaskan cara setup dan menggunakan Laravel Octane dengan FrankenPHP untuk aplikasi Faskesku.

---

## ✅ Status Implementasi

- ✅ Laravel Octane v2.13.1 terinstall
- ✅ FrankenPHP binary terinstall
- ✅ Kode sudah diperbaiki untuk Octane compatibility
- ✅ Konfigurasi sudah disetup

---

## 🚀 Quick Start

### Development

```bash
# Jalankan dengan watch mode (auto-reload saat file berubah)
composer run dev

# Atau secara manual:
php artisan octane:start --server=frankenphp --watch
```

### Production

```bash
# Start server
php artisan octane:start --server=frankenphp

# Reload workers (setelah deployment)
php artisan octane:reload

# Stop server
php artisan octane:stop

# Check status
php artisan octane:status
```
 
---

## ✅ Panduan Production — Langkah demi langkah

### 1) Prasyarat Server

```bash
php -v && php -m | egrep "pcntl|pdo|openssl|curl|mbstring|fileinfo"
node -v && npm -v
cat .env | egrep "^APP_ENV|^APP_DEBUG|^DB_CONNECTION|^DB_HOST|^DB_DATABASE|^DB_USERNAME|^DB_PASSWORD"
```

### 2) Install Octane + FrankenPHP

```bash
composer require laravel/octane --no-dev
php artisan octane:install --server=frankenphp
```

### 3) Konfigurasi .env (Production)

```env
APP_ENV=production
APP_DEBUG=false
OCTANE_SERVER=frankenphp
OCTANE_PORT=8000
OCTANE_WORKERS=auto
OCTANE_MAX_REQUESTS=500
```

### 4) Build Aset & Optimisasi Laravel

```bash
npm ci --include=dev
npm run build
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 5) Jalankan Octane (uji manual)

```bash
php artisan octane:start --server=frankenphp --port=${OCTANE_PORT:-8000} --workers=${OCTANE_WORKERS:-auto} --max-requests=${OCTANE_MAX_REQUESTS:-500}
php artisan octane:status
```

### 6) Jalankan via Supervisor (disarankan)

```ini
[program:octane]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/app/artisan octane:start --server=frankenphp --host=127.0.0.1 --port=8000
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/path/to/app/storage/logs/octane.log
stopwaitsecs=3600
```

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start octane:*
```

### 7) (Opsional) Nginx sebagai Reverse Proxy

```nginx
map $http_upgrade $connection_upgrade { default upgrade; '' close; }
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/app/public;
    location / { try_files $uri $uri/ @octane; }
    location @octane {
        proxy_http_version 1.1;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_pass http://127.0.0.1:8000;
    }
}
```

### 8) Workflow Deployment

```bash
php artisan octane:reload
sudo supervisorctl restart octane:*
```

### 9) Monitoring & Health Check

```bash
php artisan octane:status
tail -f storage/logs/octane.log
lsof -i :8000
ps aux | grep octane
```

### 10) Troubleshooting Ringkas

- Port terpakai: ubah `OCTANE_PORT` atau hentikan proses di port tersebut.
- Server tidak start: pastikan binary `frankenphp` ada dan extension `pcntl` aktif.
- Memory leak: hindari static properties dan caching request/config di constructor; gunakan `OCTANE_MAX_REQUESTS` untuk restart berkala.

---

## 📝 Composer Scripts

Script yang tersedia di `composer.json`:

```bash
# Development dengan Octane (watch mode)
composer run dev

# Development dengan PHP built-in server (fallback)
composer run dev:serve

# Start Octane
composer run octane:start

# Start Octane dengan watch mode
composer run octane:start:watch

# Reload Octane workers
composer run octane:reload

# Stop Octane
composer run octane:stop

# Kill semua proses Octane (force stop)
composer run octane:kill
```

---

## ⚙️ Konfigurasi

### File Konfigurasi

File konfigurasi utama: `config/octane.php`

**Default Server**: FrankenPHP (bisa diubah via `OCTANE_SERVER` di `.env`)

### Environment Variables

Tambahkan ke `.env` jika diperlukan:

```env
# Server yang digunakan (frankenphp, swoole, roadrunner)
OCTANE_SERVER=frankenphp

# Force HTTPS (untuk production)
OCTANE_HTTPS=true

# Port (default: 8000)
OCTANE_PORT=8000

# Workers (default: auto berdasarkan CPU cores)
OCTANE_WORKERS=4

# Max requests per worker sebelum restart (default: 500)
OCTANE_MAX_REQUESTS=500
```

---

## 🔧 Perbaikan Kode yang Sudah Dilakukan

### 1. PremiumModuleHelper.php

**Masalah**: Static property menyebabkan memory leak di Octane

**Solusi**: Hapus static property, selalu resolve fresh instance

```php
// SEBELUM (Masalah)
protected static $premiumService;

protected static function getPremiumService()
{
    if (!self::$premiumService) {
        self::$premiumService = App::make(PremiumModuleService::class);
    }
    return self::$premiumService;
}

// SESUDAH (Octane-friendly)
protected static function getPremiumService()
{
    return App::make(PremiumModuleService::class);
}
```

### 2. PremiumModuleService.php

**Masalah**: 
- Config di-cache di constructor (bisa stale)
- `$_SERVER` superglobal di constructor (bisa stale)

**Solusi**: 
- Hapus caching di constructor
- Gunakan `request()->server()` untuk server info
- Gunakan `config()` helper untuk config (selalu fresh)

```php
// SEBELUM (Masalah)
public function __construct()
{
    $this->appKey = config('app.key');
    $this->encryptionKey = $this->generateEncryptionKey();
}

private function generateEncryptionKey()
{
    $serverInfo = [
        'server_name' => $_SERVER['SERVER_NAME'] ?? 'localhost',
        'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? '/',
    ];
    return hash('sha256', json_encode($serverInfo));
}

// SESUDAH (Octane-friendly)
public function __construct()
{
    // Empty constructor - resolve values dynamically
}

private function getAppKey(): string
{
    return config('app.key'); // Always fresh
}

private function generateEncryptionKey(): string
{
    $request = request();
    $serverInfo = [
        'server_name' => $request->server('SERVER_NAME', 'localhost'),
        'document_root' => $request->server('DOCUMENT_ROOT', base_path()),
        'app_key' => $this->getAppKey(),
        'timestamp' => time(),
    ];
    return hash('sha256', json_encode($serverInfo));
}
```

### 3. AppServiceProvider.php

**Status**: ✅ Sudah kompatibel dengan Octane

`DB::unprepared()` di `boot()` method aman karena hanya dijalankan saat worker boot, bukan setiap request.

---

## 🎯 Penggunaan di Development

### Watch Mode

Gunakan `--watch` flag untuk auto-reload saat file berubah:

```bash
php artisan octane:start --server=frankenphp --watch
```

**Catatan**: Pastikan Node.js dan `chokidar` terinstall untuk watch mode:

```bash
npm install --save-dev chokidar
```

### File yang Di-watch

File dan direktori berikut akan di-watch secara otomatis (lihat `config/octane.php`):

- `app/`
- `bootstrap/`
- `config/**/*.php`
- `database/**/*.php`
- `public/**/*.php`
- `resources/**/*.php`
- `routes/`
- `composer.lock`
- `.env`

---

## 🚀 Penggunaan di Production

### 1. Setup Supervisor

Buat file `/etc/supervisor/conf.d/octane.conf`:

```ini
[program:octane]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/your/app/artisan octane:start --server=frankenphp --host=127.0.0.1 --port=8000
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/path/to/your/app/storage/logs/octane.log
stopwaitsecs=3600
```

Reload Supervisor:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start octane:*
```

### 2. Setup Nginx (Optional)

FrankenPHP bisa berjalan standalone, tapi jika ingin menggunakan Nginx sebagai reverse proxy:

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/app/public;

    index index.php;

    location / {
        try_files $uri $uri/ @octane;
    }

    location @octane {
        proxy_http_version 1.1;
        proxy_set_header Host $http_host;
        proxy_set_header Scheme $scheme;
        proxy_set_header SERVER_PORT $server_port;
        proxy_set_header REMOTE_ADDR $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        proxy_pass http://127.0.0.1:8000;
    }
}
```

### 3. Deployment Workflow

Setelah deployment:

```bash
# Reload workers (graceful restart)
php artisan octane:reload

# Atau restart via Supervisor
sudo supervisorctl restart octane:*
```

---

## 📊 Monitoring

### Check Status

```bash
php artisan octane:status
```

### Logs

Log Octane tersimpan di:
- `storage/logs/octane.log` (jika menggunakan Supervisor)
- Console output (jika running langsung)

### Memory Usage

Monitor memory usage untuk mendeteksi memory leaks:

```bash
# Check memory usage
ps aux | grep octane
```

---

## ⚠️ Best Practices

### 1. Jangan Cache Request/Config di Constructor

```php
// ❌ BAD
public function __construct()
{
    $this->request = request();
    $this->config = config('app.key');
}

// ✅ GOOD
public function __construct()
{
    // Empty atau hanya inject dependencies yang aman
}

public function doSomething()
{
    $request = request(); // Always fresh
    $config = config('app.key'); // Always fresh
}
```

### 2. Jangan Gunakan Static Properties untuk State

```php
// ❌ BAD
class MyService
{
    protected static $data = [];
    
    public function add($item)
    {
        self::$data[] = $item; // Memory leak!
    }
}

// ✅ GOOD
class MyService
{
    public function add($item)
    {
        // Store in database, cache, atau session
        Cache::put('key', $item);
    }
}
```

### 3. Gunakan Laravel Helpers untuk Request/Config

```php
// ✅ GOOD - Always fresh
$ip = request()->ip();
$config = config('app.name');

// ❌ BAD - Bisa stale
$ip = $_SERVER['REMOTE_ADDR'];
$config = $this->cachedConfig;
```

---

## 🔍 Troubleshooting

### Port 8000 sudah digunakan

Jika mendapatkan error "Port 8000 is already in use":

```bash
# 1. Check proses yang menggunakan port 8000
lsof -i :8000

# 2. Stop proses tersebut (ganti PID dengan PID yang ditemukan)
kill <PID>

# Atau stop semua proses PHP yang menggunakan port 8000
lsof -ti :8000 | xargs kill

# 3. Atau gunakan port lain
php artisan octane:start --server=frankenphp --port=8001

# 4. Set port di .env
echo "OCTANE_PORT=8001" >> .env

# 5. Atau gunakan helper script
./scripts/stop-octane.sh
```

### Server tidak start

```bash
# Check apakah FrankenPHP binary ada
ls -la ./frankenphp

# Check PHP extensions
php -m | grep pcntl

# Check logs
tail -f storage/logs/octane.log

# Check apakah port tersedia
lsof -i :8000
```

### Memory leak

1. Monitor memory usage
2. Check apakah ada static properties yang diisi terus
3. Pastikan tidak ada singleton yang cache request/config
4. Restart workers secara berkala (default: setiap 500 requests)

### File changes tidak terdeteksi

1. Pastikan `chokidar` terinstall: `npm install --save-dev chokidar`
2. Check apakah file ada di `watch` list di `config/octane.php`
3. Restart server dengan `--watch` flag

---

## 📚 Referensi

- [Laravel Octane Documentation](https://laravel.com/docs/12.x/octane)
- [FrankenPHP Documentation](https://frankenphp.dev/)
- [Analisis Laravel Octane](./ANALISIS_LARAVEL_OCTANE.md)
- [Kompatibilitas FrankenPHP](./KOMPATIBILITAS_FRANKENPHP.md)

---

**Dibuat**: 2025-01-27
**Versi**: 1.1
**Status**: Production Ready — Step-by-step diperbarui
