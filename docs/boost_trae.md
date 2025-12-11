# Panduan Integrasi Laravel Boost dengan Trae (macOS, PHP 8.2)

Dokumen ini menjelaskan langkah lengkap memasang Laravel Boost, mengonfigurasi MCP untuk Trae, memverifikasi, serta cara memakai dan memperluas fungsinya di proyek Faskesku.id.

## Prasyarat
- PHP 8.2 terpasang dan dapat diakses dari terminal.
- Composer terpasang.
- Proyek Laravel aktif di direktori: `/Users/agusbudiyono/Documents/NewEdokter/faskesku_id`.

## Cek Versi & Path PHP
- Jalankan di terminal:
```
which php
php -v
```
- Pada mesin ini:
  - Path PHP: `/Applications/XAMPP/xamppfiles/bin/php`
  - Versi: `PHP 8.2.4`

## Instalasi Laravel Boost
- Cek dev dependencies:
  - `composer.json` sudah memuat: `"laravel/boost": "^1.7"`.
- Jika belum terpasang di proyek lain, jalankan:
```
composer require laravel/boost --dev
```

## Menjalankan Installer Boost
- Jalankan perintah non-interaktif:
```
/Applications/XAMPP/xamppfiles/bin/php artisan boost:install --ansi --no-interaction
```
- Installer akan:
- Menghasilkan dan memasang AI Guidelines untuk Laravel, Inertia, Livewire, Pint, PHPUnit, Tailwind, Wayfinder, dsb.
- Menambahkan file konfigurasi MCP/editor yang relevan.
- Membuat `boost.json` untuk preferensi Boost.

## Konfigurasi MCP untuk Trae
- Tambahkan server MCP `laravel-boost` dengan path spesifik mesin ini:
```json
{
  "mcpServers": {
    "laravel-boost": {
      "command": "/Applications/XAMPP/xamppfiles/bin/php",
      "args": ["/Users/agusbudiyono/Documents/NewEdokter/faskesku_id/artisan", "boost:mcp"],
      "start_on_launch": true
    }
  }
}
```
- Penjelasan singkat:
- `command` menunjuk ke PHP 8.2 absolut agar tidak bergantung `PATH`.
- `args` menjalankan MCP server Boost melalui `artisan boost:mcp` pada proyek.
- `start_on_launch` menyalakan server saat Trae dibuka.

## Verifikasi
- Baca help untuk memastikan perintah tersedia:
```
/Applications/XAMPP/xamppfiles/bin/php artisan boost:mcp --help
```
- Jalankan server MCP (proses long-running):
```
/Applications/XAMPP/xamppfiles/bin/php artisan boost:mcp --no-interaction --ansi
```
- Buka Trae dan pastikan server `laravel-boost` tampil aktif di daftar MCP servers. Coba gunakan salah satu tools (contoh di bawah).

## Cara Pakai (Workflow Umum dengan Tools Boost)
- Daftar tools mencakup: `Application Info`, `List Routes`, `List Artisan Commands`, `Read Log Entries`, `Last Error`, `Search Docs`, `Database Schema`, `Database Query`, `Tinker`, `Get Config`, `List Available Env Vars`, `Browser Logs`, dll.
- Contoh skenario pemakaian:
- Inspeksi versi framework & paket:
  - Minta `Application Info` untuk membaca versi Laravel, PHP, database default, dan paket ekosistem.
- Audit routes:
  - Jalankan `List Routes` untuk memeriksa nama, metode, dan path. Cocok untuk debugging navigasi dan permalinks.
- Cek log error terbaru:
  - Gunakan `Last Error` atau `Read Log Entries` untuk mengambil error terbaru dari `storage/logs`.
- Cari dokumentasi API versi yang tepat:
  - Gunakan `Search Docs` untuk mencari API sesuai versi Laravel/ekosistem yang terpasang.
- Query database langsung:
  - Gunakan `Database Query` untuk menjalankan SQL read-only guna inspeksi data.
- Inspeksi skema database:
  - Gunakan `Database Schema` untuk membaca struktur tabel, kunci, dan relasi.
- Jalankan kode singkat di konteks aplikasi:
  - Gunakan `Tinker` untuk menjalankan potongan kode PHP dalam konteks Laravel.

> Catatan: Pemanggilan tools dilakukan dari UI/agent MCP di Trae. Pilih server `laravel-boost`, lalu pilih tool yang diinginkan dan isi argumen sesuai schema tool.

## Contoh Use Case Terpandu
- Debug “white screen” di halaman daftar pasien:
  - `Last Error` → Ambil pesan error terbaru framework.
  - `Browser Logs` → Cek error konsol front-end.
  - `List Routes` → Validasi rute dan middleware yang aktif.
  - `Search Docs` → Cari referensi API sesuai versi untuk perbaikan.
- Audit navigasi dan konsistensi URL:
  - `List Routes` → Inventaris semua route terkait modul.
  - `Get Config` → Baca konfigurasi yang memengaruhi routing atau middleware.
- Validasi integrasi database:
  - `Database Schema` → Cek struktur tabel.
  - `Database Query` → Jalankan query inspeksi data.

## Memperbarui Guidelines
- Perbarui guideline agar sesuai dengan versi paket terbaru:
``
/Applications/XAMPP/xamppfiles/bin/php artisan boost:update --ansi
``

## Integrasi Fungsi Khusus (Opsional, via Laravel MCP)
- Untuk membuat tool/prompts/resources kustom milik aplikasi, gunakan paket `laravel/mcp`.
- Instal MCP:
```
composer require laravel/mcp
php artisan vendor:publish --tag=ai-routes
```
- Buat server lokal kustom:
```
php artisan make:mcp-server ExampleServer
```
- Daftarkan server di `routes/ai.php`:
```php
use App\Mcp\Servers\ExampleServer;
use Laravel\Mcp\Facades\Mcp;

Mcp::local('example', ExampleServer::class);
```
- Contoh Tool sederhana:
```php
<?php
namespace App\Mcp\Tools;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class HelloTool extends Tool
{
    protected string $description = 'Mengembalikan sapaan untuk nama yang diberikan.';

    public function handle(Request $request): Response
    {
        $name = $request->get('name', 'Developer');
        return Response::make('Halo, '.$name.'!');
    }
}
```
- Registrasikan tool di `ExampleServer` dan mulai server MCP kustom melalui Trae dengan konfigurasi serupa.

## Troubleshooting
- Server tidak tampil di Trae:
- Pastikan path `command` dan `args` benar serta dapat dieksekusi.
- Jalankan `php artisan boost:mcp --help` untuk memastikan perintah ada.
- Tools gagal memuat:
- Periksa `storage/logs/laravel.log` untuk error aplikasi.
- Pastikan koneksi database default valid (lihat `config/database.php`).
- Guidelines tidak sesuai versi:
- Jalankan `php artisan boost:update` setelah `composer update`.

## Ringkasan
- Boost memberi server MCP Laravel dengan tools siap pakai dan guideline versi paket untuk meningkatkan akurasi output AI.
- Trae terhubung ke MCP Boost melalui `artisan boost:mcp` memakai path PHP dan proyek yang spesifik mesin.
- Gunakan tools untuk inspeksi aplikasi, debugging, dan produksi kode berkonvensi.
- Perluasan fungsi dilakukan dengan Laravel MCP untuk tool/prompts/resources kustom.

