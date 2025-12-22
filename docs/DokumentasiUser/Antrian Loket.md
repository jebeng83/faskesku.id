# Antrian Loket — Konsep Halaman Pengambilan Antrian (Single Nomor)

Tujuan
- Menyediakan halaman sederhana bagi petugas loket untuk mengambil dan mencetak nomor antrian tunggal.
- Menjamin penomoran konsisten, aman terhadap duplikasi, dan cepat dalam kondisi beban tinggi.

Ruang Lingkup
- Skema antrian: single nomor antrian global (tanpa kategori layanan/poli).
- Target pengguna: pasien (kiosk/display self-service) dan petugas loket (fallback/admin).
- Output: tiket kecil berisi nomor antrian dan waktu pembuatan.

Prasyarat Kiosk/Display
- Perangkat publik (kiosk/layar) terhubung ke domain aplikasi.
- Printer thermal 58mm/80mm terpasang dan dikenali browser.
- Jaringan stabil; jika gagal, pasien diarahkan ke loket manual.

 Peran & Akses
 - Display/Kiosk Self-Service: halaman publik untuk pasien mengakses dan mencetak nomor antrian sendiri (tanpa login, kontrol minimal).
 - Petugas Loket: halaman internal untuk monitoring, cetak ulang, dan penanganan fallback bila kiosk gagal.
 - Display TV (opsional): layar umum yang menampilkan nomor yang sedang dipanggil (subscribe ke event).

Alur Pengambilan
Kiosk/Display (Pasien)
1) Pasien menekan tombol `Ambil Nomor` di halaman display/kiosk.
2) Frontend melakukan `POST /api/queue/tickets?channel=kiosk`.
3) Backend membuat nomor baru secara atomik, menyimpan ke tabel antrian, mengembalikan payload tiket.
4) Frontend menampilkan nomor dan memicu cetak tiket otomatis (thermal).
5) Backend mem-broadcast event `queue.ticket.created` untuk display TV.
6) Halaman kembali ke state siap (idle) untuk pasien berikutnya.

Loket (Petugas) — Fallback
1) Petugas menekan `Ambil Nomor` jika kiosk bermasalah.
2) Frontend: `POST /api/queue/tickets?channel=loket`.
3) Tiket dicetak dari loket atau diserahkan ke pasien.

### Loket: Panggil Nomor
- Kotak kecil menampilkan Nomor Antrean aktif (mis. `A-023`).
- Tombol `Panggil` untuk memanggil nomor pada loket aktif.
- Tombol `Ulang` untuk memanggil kembali nomor yang sama (re-broadcast tanpa membuat nomor baru).

Rincian perilaku:
- `Panggil`
  - Frontend memanggil `POST /api/queue/call`.
  - Payload minimal: `{"nomor": <angka>, "loket": <id_loket>}`.
  - Backend mengeset `status='dipanggil'`, `loket=<id>`, dan `dipanggil_pada=NOW()`.
  - Frontend dan Display TV menerima event panggilan untuk penayangan.
- `Ulang`
  - Frontend memanggil kembali `POST /api/queue/call` dengan `nomor` yang sama.
  - Tidak membuat tiket baru; hanya memicu pemanggilan ulang untuk penegasan di display/PA system.

#### Komponen UI (div nomor antrean)
- Div menampilkan nomor antrean yang siap dipanggil dan mengaktifkan tombol `Panggil`/`Ulang` bila nomor tersedia.
- Sumber data nomor:
  - `GET /api/queue/current` untuk mengambil nomor terakhir yang diambil/aktif hari ini.
  - Atau pilih manual dari daftar/riwayat, lalu bind ke komponen.
- Status tombol:
  - Disabled bila nomor belum tersedia (`-`). Enabled bila nomor valid.

Contoh markup dan perilaku dasar:

```html
<div class="panel-loket">
  <div class="px-2 py-1 rounded-md bg-gradient-to-r from-blue-50 to-indigo-50">
    <span class="text-[11px] font-semibold text-gray-600">Nomor Antrean</span>
    <div id="current-ticket" class="text-base font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">-</div>
  </div>
  <div class="actions">
    <button id="btn-call" disabled class="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white">Panggil</button>
    <button id="btn-repeat" disabled class="px-3 py-1.5 text-xs font-medium rounded-md bg-indigo-600 text-white">Ulang</button>
  </div>
  <small id="call-status" class="text-xs text-gray-500"></small>
  <small id="last-called-at" class="text-[11px] text-gray-400"></small>
  <script>
    async function refreshCurrent() {
      try {
        const res = await fetch('/api/queue/current', { headers: { 'Accept': 'application/json' } });
        const json = await res.json();
        const nomor = json?.nomor;
        const prefix = json?.prefix || '';
        const label = nomor ? (prefix ? `${prefix}-${String(nomor).padStart(3,'0')}` : String(nomor).padStart(3,'0')) : '-';
        document.getElementById('current-ticket').textContent = label;
        const enabled = !!nomor;
        document.getElementById('btn-call').disabled = !enabled;
        document.getElementById('btn-repeat').disabled = !enabled;
        window.__currentTicket__ = { nomor, prefix };
      } catch (_) {
        document.getElementById('current-ticket').textContent = '-';
        document.getElementById('btn-call').disabled = true;
        document.getElementById('btn-repeat').disabled = true;
      }
    }
    async function callNumber(repeat = false) {
      const t = window.__currentTicket__;
      if (!t || !t.nomor) return;
      const payload = { nomor: t.nomor, loket: 1 };
      const res = await fetch('/api/queue/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const ok = res.ok;
      document.getElementById('call-status').textContent = ok ? (repeat ? 'Dipanggil ulang' : 'Dipanggil') : 'Gagal memanggil';
      try { const js = await res.json(); if (js?.dipanggil_pada) { document.getElementById('last-called-at').textContent = `Terakhir: ${js.dipanggil_pada}`; } } catch {}
    }
    document.getElementById('btn-call').addEventListener('click', () => callNumber(false));
    document.getElementById('btn-repeat').addEventListener('click', () => callNumber(true));
    refreshCurrent();
  </script>
}
```

Catatan perilaku:
- `current-ticket` menampilkan nomor valid; default `-` bila tidak ada nomor.
- Tombol `Panggil` dan `Ulang` hanya aktif bila nomor ada.
- `POST /api/queue/call` memicu broadcast `queue.called` untuk Display TV.

Contoh payload:
```json
{
  "nomor": 23,
  "loket": 2
}
```

Ringkas UI:
- Kotak nomor: tipografi besar, kontras tinggi, fokus pada keterbacaan.
- `Panggil`: tombol utama (primer) berwarna tegas.
- `Ulang`: tombol sekunder untuk re-call.
- Indikator status singkat: berhasil/gagal, serta waktu panggil terakhir.

### Display TV: Rancangan Layar Pemanggilan
- Tujuan:
  - Menampilkan nomor yang sedang dipanggil dengan sangat jelas.
  - Menampilkan loket pemanggil dan riwayat panggilan terbaru.
  - Memberikan feedback suara/visual saat terjadi pemanggilan.

- Sumber Data:
  - Event broadcast saat `POST /api/queue/call` dieksekusi (mis. channel `queue`, event `queue.called`).
  - Fallback polling: interval 2–5 detik ke basis data melalui endpoint publik (opsional) untuk riwayat panggilan hari ini.

- Layout UI:
  - Header: nama instansi dan tanggal/jam.
  - Panel utama: “Sedang Dipanggil” — nomor besar (mis. `A-023`) dan `Loket 2`.
  - Panel sekunder: “Riwayat Terakhir” — 5–10 entri panggilan (`nomor`, `loket`, `jam`).
  - Opsional: marquee informasi, antrian berikutnya.

- Perilaku:
  - Saat menerima event panggilan, animasi highlight nomor, bunyi beep singkat, lalu simpan ke riwayat.
  - Bila tidak ada event dalam periode tertentu, tetap tampilkan nomor terakhir.

- Integrasi & Endpoint:
  - Broadcast event: `queue.called` membawa payload minimal `{ nomor, prefix?, loket, dipanggil_pada }`.
  - Fallback riwayat (opsional): `GET /api/queue/calls/today?limit=10` untuk menampilkan daftar panggilan hari ini.
  - Endpoint yang sudah ada: `POST /api/queue/call` untuk memicu panggilan.

- Aksesibilitas & Kinerja:
  - Kontras tinggi, ukuran font besar, dukungan layar besar (TV).
  - Optimalkan rendering untuk animasi sederhana; hindari efek berat.
  - Minimalkan polling; lebih utamakan event agar hemat jaringan.

```mermaid
flowchart LR
  L[Loket] -->|POST call| API[/api/queue/call]
  API -->|event: queue.called| BUS((Broadcast))
  BUS --> TV[Display TV]
```

```mermaid
flowchart LR
  P[Pasien] -->|Ambil Nomor| KIOSK[Display/Kiosk]
  KIOSK -->|POST create (channel=kiosk)| API[/api/queue/tickets]
  API --> DB[(queue_tickets)]
  DB --> API
  API -->|event: ticket.created| BUS((Broadcast))
  API --> KIOSK
  KIOSK --> PRN[Cetak Tiket]
  BUS --> TV[Display TV]
  L[Loket] -->|Fallback create (channel=loket)| API
```

Antarmuka (UI)
- Kiosk/Display: tombol besar `Ambil Nomor` (full-width), kontras tinggi, fokus otomatis.
- Panel hasil: menampilkan nomor (mis. `A-023`), waktu, dan `Cetak Ulang`.
- Notifikasi: sukses/gagal; suara/beep opsional saat sukses.
- Status sistem (opsional): indikator koneksi API, status printer.
- Aksesibilitas: ukuran font besar, navigasi keyboard, high-contrast.

Aturan Nomor
- Format default: tiga digit naik `001` → `999`, lalu roll-over ke `001` per hari.
- Opsional prefix loket: huruf `A` (mis. `A-001`) bila ada lebih dari satu area namun tetap single sequence global.
- Reset: otomatis harian pada `00:00` atau sesuai konfigurasi.

Rancangan Tabel Antrian (Bahasa Indonesia)
- Nama tabel: `antriloket`
- Kolom utama:
  - `id` — BIGINT AUTO INCREMENT (PK)
  - `nomor` — INT UNSIGNED (1–999), nomor antrian harian
  - `prefix` — VARCHAR(2) NULL (opsional; mis. `A`), untuk penanda area bila diperlukan
  - `tanggal` — DATE (tanggal antrian, default `CURRENT_DATE`)
  - `status` — ENUM(`baru`,`dicetak`,`dipanggil`,`batal`) default `baru`
  - `asal` — ENUM(`kiosk`,`loket`) default `kiosk` (asal pengambilan nomor)
  - `loket` — INT NULL (ID loket/counter, opsional jika multi loket)
  - `kode_tiket` — CHAR(8) UNIQUE (opsional; untuk QR/cetak ulang)
  - `dibuat_oleh` — VARCHAR(20) NULL (NIK petugas; null untuk kiosk)
  - `created_at` — TIMESTAMP default `CURRENT_TIMESTAMP`
  - `updated_at` — TIMESTAMP NULL
  - `dicetak_pada` — TIMESTAMP NULL
  - `dipanggil_pada` — TIMESTAMP NULL
  - `dibatalkan_pada` — TIMESTAMP NULL

Indeks & Constraint
- UNIQUE `(tanggal, prefix, nomor)` untuk mencegah duplikasi per hari.
- INDEX `(status)` untuk kueri cepat berdasarkan status.
- INDEX `(asal)` untuk statistik kiosk/loket.
- INDEX `(created_at)` untuk range waktu.
- INDEX `(loket)` jika multi loket diaktifkan.
- CHECK `nomor BETWEEN 1 AND 999` (bisa dijaga di aplikasi jika DB tidak mendukung).

Contoh Skema (SQL)
```sql
CREATE TABLE antriloket (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nomor INT UNSIGNED NOT NULL,
  prefix VARCHAR(2) NULL,
  tanggal DATE NOT NULL DEFAULT (CURRENT_DATE),
  status ENUM('baru','dicetak','dipanggil','batal') NOT NULL DEFAULT 'baru',
  asal ENUM('kiosk','loket') NOT NULL DEFAULT 'kiosk',
  loket INT NULL,
  kode_tiket CHAR(8) NULL,
  dibuat_oleh VARCHAR(20) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  dicetak_pada TIMESTAMP NULL,
  dipanggil_pada TIMESTAMP NULL,
  dibatalkan_pada TIMESTAMP NULL,
  UNIQUE KEY uq_harian (tanggal, prefix, nomor),
  UNIQUE KEY uq_kode_tiket (kode_tiket),
  KEY idx_status (status),
  KEY idx_asal (asal),
  KEY idx_created (created_at),
  KEY idx_loket (loket)
);
```

Contoh Migrasi (Laravel)
```php
Schema::create('antriloket', function (Blueprint $table) {
    $table->id();
    $table->unsignedInteger('nomor');
    $table->string('prefix', 2)->nullable();
    $table->date('tanggal')->default(DB::raw('CURRENT_DATE'));
    $table->enum('status', ['baru','dicetak','dipanggil','batal'])->default('baru');
    $table->enum('asal', ['kiosk','loket'])->default('kiosk');
    $table->unsignedInteger('loket')->nullable();
    $table->char('kode_tiket', 8)->nullable()->unique();
    $table->string('dibuat_oleh', 20)->nullable();
    $table->timestamp('dicetak_pada')->nullable();
    $table->timestamp('dipanggil_pada')->nullable();
    $table->timestamp('dibatalkan_pada')->nullable();
    $table->timestamps();

    $table->unique(['tanggal', 'prefix', 'nomor'], 'uq_harian');
    $table->index('status');
    $table->index('asal');
    $table->index('loket');
});
```

Tabel Pendukung (Opsional)
- `antriloket_counter`: menyimpan `tanggal`, `prefix`, dan `last_nomor` untuk increment atomik.
  - Kolom: `tanggal DATE`, `prefix VARCHAR(2) NULL`, `last_nomor INT UNSIGNED`.
  - Transaksi: `SELECT ... FOR UPDATE` pada baris `tanggal+prefix`, lalu `UPDATE` menaikkan `last_nomor`.

Catatan Penomoran Harian
- Reset nomor otomatis saat tanggal berganti; gunakan `tanggal` sebagai partisi natural.
- Jika menggunakan `prefix`, tetap satu sequence global per `prefix` agar konsisten.

Endpoint & Konkurensi
- `POST /api/queue/tickets` — membuat nomor antrian baru.
  - Param `channel`: `kiosk` (default di display) atau `loket`.
  - Transaksi DB: gunakan `SELECT FOR UPDATE` atau sequence untuk mencegah duplikasi.
  - Validasi: rate limit per klien, cegah spam klik; dukung `Idempotency-Key` untuk klik ganda.
- `GET /api/queue/current` — nomor terakhir yang diambil (untuk konfirmasi UI/kiosk).
- Broadcast: channel `queue` dengan event `ticket.created` untuk display TV.

Cetak Tiket
- Browser print: template ringkas (thermal 58mm), auto print dengan `window.print()`.
- Integrasi perangkat: dukungan `WebUSB`/`WebSerial` (opsional) untuk printer Direct.
- Isi tiket: nomor, tanggal/jam, lokasi, QR (opsional untuk tracking).
- Cetak ulang: tombol tersedia sampai halaman kembali ke idle; tidak membuat nomor baru.

Keamanan & Keandalan
- Kiosk: halaman publik tanpa login; batasi ke domain resmi, aktifkan CSRF.
- Rate limit tombol (debounce) dan server (mis. 5 req/detik/klien); cooldown 2 detik di UI.
- Audit: simpan `channel` dan `created_by` (null untuk kiosk) untuk pelacakan.
- Offline fallback: tampilkan instruksi menuju loket bila API gagal; tidak ada penomoran lokal.

Edge Cases
- Klik ganda: lindungi dengan state `processing` dan idempotency (token sekali pakai).
- Printer gagal: tetap simpan tiket, sediakan `Cetak Ulang`.
- Roll-over: pastikan reset harian tidak menabrak nomor yang sudah ada.

Implementasi (Rencana)
- Frontend:
  - `resources/js/Pages/Antrian/AntrialLoket.jsx` — halaman kiosk/display self-service untuk pasien.
  - Halaman internal loket untuk monitoring dan cetak ulang.
- Backend: Controller `QueueController@create` untuk `POST /api/queue/tickets`.
- Model/Migrasi: `QueueTicket` + migrasi `queue_tickets` dengan index pada `(created_at, number)`.
- Broadcast: gunakan channel publik `queue` (tanpa data sensitif).

Roadmap (Ekstensi)
- Multi loket: pemetaan `counter_id` saat pemanggilan, tetap single sequence nomor.
- Pemanggilan nomor: halaman `Panggil Nomor` untuk memindahkan status ke `served` dan broadcast.
- Display TV: halaman khusus yang subscribe ke event untuk update real-time.
- QR untuk cetak ulang: kode unik pada tiket yang memungkinkan re-print tanpa nomor baru.

Tautan Terkait
- `docs/REKOMENDASI_PERBAIKAN.md` — rencana Display Antrean & Kiosk.
- `docs/REGISTRATION_MODULE_README.md` — konteks front office & registrasi.
