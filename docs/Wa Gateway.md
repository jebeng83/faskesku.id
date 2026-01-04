# WA Gateway – Grand Desain Arsitektur

## Tujuan & Ruang Lingkup
- Menyediakan gateway terpusat untuk pengiriman dan penerimaan pesan WhatsApp (text, template, media) yang andal, aman, dan dapat diskalakan.
- Menstandarkan integrasi WhatsApp ke seluruh modul aplikasi Faskesku.id (registrasi, antrian, lab, radiologi, billing) tanpa mengikat ke vendor spesifik.
- Menjaga kompatibilitas fungsional dengan repo referensi `wa-gateway.git` (endpoint, payload, dan alur), sekaligus memanfaatkan fitur modern WhatsApp Cloud API.

## Prinsip Arsitektur
- Stateless pada layer API; state dikelola di DB/Queue/Cache.
- Idempotensi pada operasi kirim pesan (mencegah duplikasi saat retry).
- Observability lengkap (logs, metrics, tracing) untuk troubleshooting.
- Keamanan berlapis: verifikasi tanda tangan webhook, RBAC, rate limiting, audit.
- Ekstensibilitas via adapter provider (Cloud API Meta sebagai default; dapat ditambah 360dialog/OnPrem bila diperlukan).

## Ikhtisar Sistem (Komponen)
- API Layer
  - Endpoint REST internal untuk pengiriman pesan, manajemen template, kampanye, dan monitoring.
  - Endpoint publik webhook untuk menerima event dari Meta/WhatsApp.
- Provider Adapter
  - Implementasi spesifik untuk WhatsApp Cloud API (Graph API) dan opsi multi‑provider.
- Orchestrator & Router
  - Mengelola rute pesan berdasarkan tipe (text/template/media), kebijakan tenant, dan kebijakan pengiriman (rate limit, windowing).
- Queue Workers
  - Memproses pengiriman secara asynchronous dengan retry, backoff, dan DLQ.
- Scheduler
  - Menangani pesan terjadwal, kampanye/broadcast, dan tugas berkala (sinkronisasi template/status).
- Persistence
  - Basis data relasional untuk pesan, event webhook, template, kontak, kampanye, kredensial, quota, opt‑in/out.
- Cache
  - Menyimpan token, mapping template, state ringan untuk akselerasi.
- Observability
  - Logging terstruktur, metrics (Prometheus), tracing (OpenTelemetry), dashboard health.
- Admin Console (opsional)
  - UI untuk melihat status pesan, template, kampanye, dan konfigurasi tenant.

## Pola Integrasi ke Faskesku.id
- Direct API
  - Modul aplikasi memanggil endpoint internal gateway untuk mengirim pesan.
  - Contoh implementasi awal: [routes/api.php:L247-L253](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L247-L253) menggunakan [WhatsAppService.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Services/WhatsApp/WhatsAppService.php).
- Event‑Driven
  - Modul mem‑emit event domain (RegistrationCompleted, LabResultReady), listener enqueue Job kirim WA.
- Webhook
  - Endpoint publik untuk inbound updates: verifikasi dan normalisasi event menjadi record yang dapat ditindaklanjuti.
  - Implementasi awal: [routes/api.php:L46-L47](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L46-L47) dengan [WhatsAppWebhookController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Webhook/WhatsAppWebhookController.php).

## Model Data (Skema)
- messages
  - id (uuid), tenant_id, to, from, type (text/template/media), body_json, media_url, template_name, language, status (queued/sent/delivered/read/failed), provider_message_id, provider, retries, error_code, error_message, created_at, updated_at, idempotency_key.
- message_logs
  - id, message_id, event (queued/sent/delivered/read/failed/retry), meta_json, occurred_at.
- webhook_events
  - id, provider, raw_payload, event_type, message_ref, processed (bool), received_at.
- templates
  - id, name, category, language, content_json, status (approved/pending/rejected), vendor_ref, created_at, updated_at.
- contacts
  - id, tenant_id, phone_e164, name, tags, opt_in_status, last_interaction_at.
- campaigns
  - id, name, segment_query, template_ref, schedule_at, status, total_targets, progress.
- providers
  - id, name, type, config_json (token, phone_number_id, app_secret, graph_version), active.
- tenants
  - id, name, settings_json, default_provider_id, quotas.
- consents
  - id, contact_id, source, granted_at, revoked_at.

Indexing yang disarankan:
- messages: idx on (tenant_id, status, created_at), idx on provider_message_id.
- webhook_events: idx on processed (false) untuk konsumsi cepat.
- templates: idx on (name, language, status).
- contacts: idx on phone_e164, idx pada tags (JSON index/GIN bila pakai PostgreSQL).

## Spesifikasi Endpoint (Target Paritas)
- Outbound
  - POST /api/whatsapp/send
    - Body: `{ to: "+62812...", text: "..." }`
    - Respons: `{ ok, status, json }`
  - POST /api/messages
    - Body: generik (text/template/media) dengan idempotency_key opsional.
  - POST /api/messages/{id}/retry
- Template
  - GET /api/templates
  - POST /api/templates (buat/sinkron dari Meta)
  - GET /api/templates/{name}
- Campaigns
  - POST /api/campaigns (buat kampanye terjadwal)
  - GET /api/campaigns/{id}
- Webhook
  - GET /api/webhooks/whatsapp (verify)
  - POST /api/webhooks/whatsapp (receive)
- Monitoring
  - GET /api/health
  - GET /api/metrics

Kebijakan Error dan Idempotensi:
- Gunakan header `X-Idempotency-Key` atau field `idempotency_key` di body.
- 4xx untuk validasi, 5xx untuk kegagalan provider, detail error_code/error_message di payload.

## Alur Utama (Sequence)
- Kirim Pesan Text
  1. Client memanggil `/api/messages` dengan payload text dan idempotency_key.
  2. API memvalidasi, membuat record `messages` status `queued`.
  3. Worker mengambil dari queue, memilih provider, memanggil adapter.
  4. Jika sukses, simpan `provider_message_id`, update status `sent`, tambahkan log.
  5. Bila gagal, retry dengan backoff; setelah batas retry, pindah ke DLQ.
- Terima Webhook
  1. Meta mengirim POST ke `/api/webhooks/whatsapp` dengan header `X-Hub-Signature-256`.
  2. Verifikasi tanda tangan menggunakan `WHATSAPP_APP_SECRET`.
  3. Simpan payload ke `webhook_events`, tandai `processed=false`.
  4. Worker memproses event: mapping ke `messages` (update delivered/read/failed), buat log.
- Kampanye (Broadcast)
  1. Admin membuat `campaigns` dengan segmentasi dan template.
  2. Scheduler men‑enqueue batch messages sesuai rate limit.
  3. Pengiriman berjalan bertahap, progress dan statistik diperbarui.

## Keamanan
- Webhook Signature Verification: wajib, menggunakan HMAC SHA‑256.
- Rahasia/Token: disimpan melalui konfigurasi dan secret manager (env/HashiCorp Vault/AWS Secrets Manager).
- RBAC: batasi endpoint outbound untuk role tertentu.
- Rate Limiting: per tenant dan per provider; cegah spam.
- Audit: semua perubahan template/kampanye dan pengiriman disimpan di `message_logs`.

## Skalabilitas & Keandalan
- Horizontal Scaling: API dan Worker terpisah; tambah replika sesuai beban.
- Retry & Backoff: exponential backoff; batas maksimal retry; DLQ untuk kasus permanen.
- Circuit Breaker: fallback provider jika error persisten pada satu provider.
- Sharding/Partitioning: partisi `messages` berdasarkan waktu/tenant bila volume tinggi.
- Caching: template mapping dan token akses untuk mengurangi latency.

## DevOps & Deploy
- Lingkungan: Dev/Staging/Prod dengan kredensial terpisah.
- CI/CD: lint, unit/integration test, contract test terhadap adapter.
- Observability: metrics (rate, latency, error), logs terstruktur, tracing antar komponen.
- Alerting: threshold error rate, lonjakan retry, backlog queue.

## Kompatibilitas dengan `wa-gateway.git`
- Endpoint Parity: sesuaikan nama rute dan bentuk payload agar kompatibel dengan klien yang sudah memakai repo tersebut.
- Adapter Layer: jika repo menggunakan provider selain Cloud API, tambahkan adapter driver dan normalisasi respons.
- Migrasi Data: impor template, kontak, dan histori kampanye menggunakan skrip ETL.
- Konfigurasi: map environment variables ke [services.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/config/services.php#L38-L48), bagian `whatsapp` dimulai di [services.php:L48](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/config/services.php#L48).

## Roadmap Implementasi Bertahap
- Fase 1 (Baseline)
  - Outbound text minimal, webhook verify/receive, logging dasar.
  - Status: skeleton sudah ada di aplikasi (service, webhook, rute).
- Fase 2 (Reliability)
  - Queue & worker, retry/backoff, DLQ, idempotency.
  - Admin konfigurasi provider dan tenant.
- Fase 3 (Produk)
  - Template API, broadcast/campaigns, segmentasi, penjadwalan.
  - Analytics dasar (delivery/read rate).
- Fase 4 (Enterprise)
  - Multi‑tenant penuh, failover multi‑provider, dashboard observability, compliance (opt‑in/out, consent log).

## Acceptance Criteria & KPI
- Delivery Success Rate ≥ 98% untuk pesan valid.
- Median Latency Outbound < 500 ms (di luar waktu tunggu provider).
- Webhook Loss Rate = 0 (semua event tercatat dan diproses).
- Retry Success ≥ 70% untuk error sementara (5xx provider).

## Risiko & Mitigasi
- Bottleneck di provider: mitigasi dengan circuit breaker dan failover.
- Pembatasan rate Meta: terapkan rate limiter dan penjadwalan broadcast.
- Data privasi: enkripsi rahasia, audit, kontrol akses ketat.
- Duplikasi pesan: idempotency key dan dedup di storage.

## Lampiran: Variabel Lingkungan & Referensi Kode
- Environment (contoh)
  - `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_APP_SECRET`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_GRAPH_VERSION`.
- Referensi Kode di Aplikasi
  - Konfigurasi: [services.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/config/services.php)
  - Service: [WhatsAppService.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Services/WhatsApp/WhatsAppService.php)
  - Webhook: [WhatsAppWebhookController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Webhook/WhatsAppWebhookController.php)
  - Rute: [routes/api.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L46-L47), [routes/api.php:L247-L253](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L247-L253)

---

Catatan Asumsi: dokumen ini menyelaraskan fitur umum WA Gateway berdasarkan praktik WhatsApp Cloud API dan target paritas dengan `wa-gateway.git`. Jika diperlukan kecocokan endpoint/payload yang benar‑benar identik dengan repo tersebut, sediakan daftar endpoint dan contoh payload agar adapter/kompatibilitas dapat disesuaikan secara presisi.

## Analisis Detail `public/wa-gateway-main`

### Ikhtisar Aplikasi Desktop (Delphi + WebView2)
- Bahasa/stack: Delphi VCL, proyek [WhatsAppSender.dpr](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/WhatsAppSender.dpr), [WhatsAppSender.dproj](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/WhatsAppSender.dproj).
- WebView: Microsoft Edge WebView2 untuk memuat WhatsApp Web, komponen [TEdgeBrowser](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/ufrmUtama.pas#L83).
- Database: MySQL via FireDAC, koneksi dikonfigurasi melalui UI dan INI file `setting.mkf`.
- Skema DB: lihat [database.sql](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/database.sql).
  - wa_outbox: antrean pesan outbound dengan kolom `nowa`, `pesan`, `status` (ANTRIAN/Terproses), `sender`, `type` (TEXT/IMAGE/VIDEO), `file`.
  - wa_libur: kalender libur untuk menonaktifkan pengiriman pada tanggal tertentu.
- Bridging JS: file [bridge.mkf](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/bridge.mkf) di‑inject ke WhatsApp Web untuk membuka API internal (WAPI) dan mengirim pesan.

### Mekanisme Pengiriman
- Injeksi file JS: tombol “Load Bridging” memuat `bridge.mkf` dan menyiapkan `window.WAPI` untuk operasi kirim.
- Kirim teks: [SendMessage](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/ufrmUtama.pas#L780-L789) memanggil `window.WAPI.sendMessageToID("<nowa>", "<pesan>")`.
- Kirim file: [SendFile](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/ufrmUtama.pas#L791-L828) memanggil `window.WAPI.sendImage(dataUrl, nowa, filename, caption)`.
- Eksekusi JS: [ExecuteScript](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/ufrmUtama.pas#L1022-L1084) menyisipkan try/catch, mengirim hasil via `window.chrome.webview.postMessage` dan menangani timeout.
- Penjadwalan: [tmWDTimer](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/ufrmUtama.pas#L1252-L1499) menjalankan loop periodik untuk mengambil satu record dari `wa_outbox` dengan status ANTRIAN, memfilter jenis penerima (`@c.us`, `@g.us`, `@t.us`), rentang jam, hari, dan modulus.
- Format nomor: [FormatNOWA](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/ufrmUtama.pas#L309-L316) otomatis mengubah awalan `08` menjadi `62`.
- Logging & file: log tersimpan ke folder `logs`, file media ke folder `media`, pesan contoh ke folder `pesan`.

### Fitur Tambahan
- Penghitungan antrean: [btnWDJumlahAntiran](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/ufrmUtama.pas#L572-L622) menampilkan jumlah ANTRIAN group vs contact.
- Telegram: endpoint pengiriman Telegram tersedia sebagai alternatif `sender=TELEGRAM` ([sendTelegram](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/ufrmUtama.pas#L244-L284)).
- Reset session: [btnResetSession](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/ufrmUtama.pas#L522-L525) me‑reinit WebView.

### Catatan Instalasi WebView2
- Lihat [catatan.txt](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/catatan.txt): pasang Microsoft Edge WebView2 Runtime.
- Unduh: Microsoft Edge WebView2 – pilih Evergreen Standalone Installer (x86): https://developer.microsoft.com/en-us/microsoft-edge/webview2/?form=MA13LH#download

## Langkah‑Langkah Implementasi WA Gateway di Aplikasi Ini

### Mode 1 – WhatsApp Cloud API (server‑side, sudah tersedia skeleton)
- Konfigurasi layanan di [services.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/config/services.php#L48): token, phone_number_id, app_secret, verify_token.
- Webhook publik: [routes/api.php:L46-L47](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L46-L47) dengan controller [WhatsAppWebhookController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Webhook/WhatsAppWebhookController.php).
- Outbound kirim teks: [routes/api.php:L247-L253](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L247-L253) memanggil [WhatsAppService.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Services/WhatsApp/WhatsAppService.php).
- Integrasi modul bisnis: emit event domain (Registrasi/Lab/Billing), listener enqueue Job yang memanggil service WhatsApp.

### Mode 2 – WA Web Desktop (Delphi/WebView2) kompatibel dengan `wa-gateway-main`
- Siapkan mesin Windows dengan WebView2 Runtime (Evergreen x86).
- Jalankan aplikasi desktop [WhatsAppSender.exe](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/WhatsAppSender.exe):
  - Hubungkan MySQL sesuai [ufrmUtama.pas:btnConnectClick](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/ufrmUtama.pas#L432-L460) dan simpan di `setting.mkf`.
  - Klik “Start WA Web” untuk membuka WhatsApp Web, login QR.
  - Klik “Load Bridging” untuk memuat [bridge.mkf](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/bridge.mkf).
  - Klik “RUN WA GATEWAY DELPHI” untuk memulai loop otomatis (tmWD).
- Dorong pesan dari aplikasi Faskesku.id ke tabel `wa_outbox`:
  - Field wajib: `nowa` (format E.164 atau `xxx@c.us`), `pesan`, `status='ANTRIAN'`, `type='TEXT'|'FILE'`, `file` bila ada.
  - Opsional: `sender` (NODEJS/QISCUS/TELEGRAM) untuk routing.
- Gateway akan mengambil satu per satu pesan ANTRIAN, memanggil WAPI, dan memperbarui log/respons. Tombol “Set Terproses” dapat mengubah batch status ke “Terproses”.
- Konfigurasi waktu/hari/libur:
  - Jam mulai/sampai, hari aktif (Minggu–Sabtu), libur via `wa_libur`.
  - Interval/Detik‑ke untuk pacing, modulus untuk sharding sederhana.

## Langkah‑Langkah Implementasi di Aplikasi Ini (Dasar Pengembangan)

### Prasyarat Umum
- Tentukan mode utama: Mode 1 (Cloud API, disarankan) atau Mode 2 (WA Web Desktop).
- Siapkan kredensial WhatsApp Cloud API bila memilih Mode 1.
- Siapkan MySQL dan mesin Windows + WebView2 Runtime bila memilih Mode 2.

### Langkah Mode 1 (Cloud API)
- Isi .env sesuai kunci di [services.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/config/services.php#L48):
  - `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_APP_SECRET`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_GRAPH_VERSION`.
- Daftarkan webhook ke Meta App:
  - Verification URL: `/api/webhooks/whatsapp` GET [routes/api.php:L46-L47](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L46-L47).
  - Callback URL: `/api/webhooks/whatsapp` POST.
  - Gunakan verify token yang sama dengan `WHATSAPP_VERIFY_TOKEN`.
- Uji kirim teks:
  - Endpoint internal: `/api/whatsapp/send` [routes/api.php:L247-L253](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L247-L253).
  - Payload minimal: `{ "to": "62812xxxxx", "text": "Halo" }`.
- Integrasi modul bisnis:
  - Emit event domain (mis. RegistrationCompleted) saat aksi bisnis selesai.
  - Listener membuat Job untuk panggil [WhatsAppService.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Services/WhatsApp/WhatsAppService.php).
- Reliabilitas:
  - Tambahkan queue worker (Laravel queue:listen), retry/backoff, dan DLQ.
  - Terapkan idempotency key di layer API untuk menghindari duplikasi.
- Observability:
  - Logging aman (tanpa token), agregasi metrics, dan dashboard health.
- Keamanan:
  - Verifikasi signature webhook (`X-Hub-Signature-256`) di [WhatsAppWebhookController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Webhook/WhatsAppWebhookController.php).
  - Batasi endpoint outbound dengan RBAC dan rate limit.

### Langkah Mode 2 (WA Web Desktop)
- Instal WebView2 Runtime (Windows):
  - Unduh dari Microsoft Edge WebView2, pilih “Evergreen Standalone Installer (x86)”.
  - Laman unduhan: https://developer.microsoft.com/en-us/microsoft-edge/webview2/?form=MA13LH#download
- Jalankan aplikasi desktop di folder publik:
  - Buka [WhatsAppSender.exe](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/WhatsAppSender.exe).
  - Klik “Start WA Web”, login QR di WhatsApp Web.
  - Klik “Load Bridging” untuk memuat [bridge.mkf](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/bridge.mkf).
  - Hubungkan MySQL dan pastikan skema [database.sql](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wa-gateway-main/database.sql) terpasang.
  - Klik “RUN WA GATEWAY DELPHI” untuk mulai loop pengiriman.
- Enqueue pesan dari aplikasi:
  - Sisipkan record ke `wa_outbox` dengan `status='ANTRIAN'`, `nowa`, `pesan`, `type`, dan `file` bila perlu.
  - Gunakan format nomor E.164 atau suffix `@c.us/@g.us/@t.us` sesuai target.
- Pengaturan operasional:
  - Atur jam/hari aktif dan libur (`wa_libur`), interval/detik‑ke, modulus.
  - Pantau log aplikasi desktop dan backlog antrean.

### Integrasi ke Modul Faskesku.id
- Registrasi: kirim konfirmasi antrean atau reminder jadwal.
- Lab/Radiologi: notifikasi ketersediaan hasil dan link verifikasi.
- Billing/Keuangan: pengingat pembayaran atau rekap transaksi.
- Gunakan event domain + Job agar modul tetap terpisah dari detail gateway.

### Checklist Dasar Pengembangan

## Koneksi WA Gateway & Kredensial

- Mode 1 (WhatsApp Cloud API)
  - Buat/konfigurasi aplikasi di Meta Developers, aktifkan produk WhatsApp, dan tambahkan nomor pada Business Manager.
  - Catat kredensial: WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_APP_SECRET, WHATSAPP_VERIFY_TOKEN, WHATSAPP_GRAPH_VERSION. Lihat pemetaan di konfigurasi layanan [services.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/config/services.php#L48).
  - Simpan kredensial di sistem melalui halaman [KredensialWaGateway.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/WaGateway/KredensialWaGateway.jsx) yang memanggil endpoint internal [WhatsAppCredentialController::store](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/API/WhatsAppCredentialController.php#L32-L63).
  - Alternatif cepat: gunakan Tools [ScanWhatsAppCredentials.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Tools/ScanWhatsAppCredentials.jsx) untuk menempel JSON/KEY=VALUE dan menghasilkan snippet .env, lalu salin ke env/project.
  - Daftarkan webhook ke Meta App:
    - Verify URL: GET /api/webhooks/whatsapp ([routes/api.php:L46-L47](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L46-L47)) dengan verifikasi HMAC menggunakan WHATSAPP_APP_SECRET di [WhatsAppWebhookController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Webhook/WhatsAppWebhookController.php).
    - Callback URL: POST /api/webhooks/whatsapp.
  - Outbound text tersedia di endpoint internal /api/whatsapp/send ([routes/api.php:L247-L253](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L247-L253)) yang memakai [WhatsAppService.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Services/WhatsApp/WhatsAppService.php).
  - Caching kredensial aktif dan secrets ditangani via [CredentialRepository.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Repositories/WhatsApp/CredentialRepository.php) dengan kunci cache wa:active_credential, wa:active_secrets, wa:active_list; invalidasi terjadi di [WhatsAppCredentialController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/API/WhatsAppCredentialController.php#L58-L62).

- Mode 2 (WA Web Gateway – Node MrLee di public/wagateway)
  - Lokasi: [public/wagateway/node_mrlee](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/node_mrlee).
  - Jalankan server: `node appJM.js` atau script shell [start-server.sh](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/node_mrlee/start-server.sh). Server default di port 8100 (lihat [appJM.js](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/node_mrlee/appJM.js#L10)).
  - Login sesi WA Web:
    - Hit endpoint GET /status untuk melihat status, atau POST /WA-QrCode untuk memperoleh QR (lihat [appJM.js:L456-L478](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/node_mrlee/appJM.js#L456-L478)).
    - Scan QR di perangkat, sesi disimpan via LocalAuth ke folder `.wwebjs_auth` (lihat [appJM.js:L65-L71](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/node_mrlee/appJM.js#L65-L71)).
  - Kirim pesan:
    - POST /send-message dengan body `{ number, message }` (lihat [appJM.js:L486-L526](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/node_mrlee/appJM.js#L486-L526)).
    - Kirim media via /send-fileurl atau /send-file (lihat [appJM.js:L529-L573](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/node_mrlee/appJM.js#L529-L573), [appJM.js:L575-L620](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/node_mrlee/appJM.js#L575-L620)).
    - Grup: POST /send-group dengan `id` atau `name` (lihat [appJM.js:L631-L687](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/node_mrlee/appJM.js#L631-L687)).
  - Kredensial pada mode ini berupa sesi login WA Web (bukan token Cloud API). Sesi tersimpan lokal dan dikelola oleh library whatsapp-web.js; tidak ada token PNID/Graph seperti Cloud API.
  - Integrasi cepat dari aplikasi: buat service internal yang memanggil endpoint Node MrLee untuk use case tertentu (registrasi, reminder), sambil tetap mempertahankan Mode 1 sebagai jalur utama untuk kemampuan template business messaging.

- Mode 2 (WA Web Desktop – Delphi/WebView2) kompatibel `wa_gateway.exe`
  - Lokasi: [public/wagateway](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway), jalankan [wa_gateway.exe](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/wa_gateway.exe) dan konfigurasi DB sesuai [wa_outbox.sql](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/wagateway/wa_outbox.sql).
  - Alur: login WA Web via WebView2, inject bridging, dan proses antrean dari tabel wa_outbox.
  - Kredensial: sesi WA Web lokal; tidak menggunakan token Cloud API.

## Ringkasan Cara Mengambil Kredensial

- Cloud API (disarankan untuk template dan webhook)
  - Ambil token akses (permanent/long-lived) dari Meta Business (System Users → Generate Token) dan Phone Number ID dari WhatsApp Business Account.
  - Tentukan verify token custom untuk webhook, dan app secret dari aplikasi Meta.
  - Simpan melalui halaman kredensial atau Tools Scan, lalu uji endpoint internal `/api/whatsapp/send`.

- WA Web (Node/Delphi)
  - Tidak ada token/PNID; lakukan login QR untuk membuat sesi. Status/QR tersedia via endpoint Node (mis. `/status`, `/WA-QrCode`).
  - Gunakan endpoint kirim pesan yang tersedia, atau enque ke DB (untuk varian Delphi).
- Konfigurasi env variabel WhatsApp di aplikasi.
- Aktifkan webhook verify/receive dan uji konektivitas.
- Sediakan endpoint enqueue (Mode 1: langsung; Mode 2: tulis ke `wa_outbox`).
- Tambah queue workers, retry/backoff, logging aman, dan metrics.
- Siapkan rate limit per tenant/provider dan audit trail pengiriman.

### Uji & Validasi
- Mode 1: kirim POST ke `/api/whatsapp/send` dan verifikasi respons Graph API.
- Mode 2: sisipkan data ke `wa_outbox`, amati pengiriman di log aplikasi desktop.
- Verifikasi status delivered/read via webhook (Mode 1) atau via WAPI jika tersedia (Mode 2).

### Quick Start (Praktis)
- Mode 1 (Cloud API)
  - Contoh konfigurasi `.env`:

    ```env
    WHATSAPP_TOKEN=YOUR_TOKEN
    WHATSAPP_PHONE_NUMBER_ID=YOUR_PHONE_NUMBER_ID
    WHATSAPP_APP_SECRET=YOUR_APP_SECRET
    WHATSAPP_VERIFY_TOKEN=YOUR_VERIFY_TOKEN
    WHATSAPP_GRAPH_VERSION=v19.0
    WHATSAPP_GRAPH_BASE=https://graph.facebook.com
    ```

  - Verifikasi webhook (GET):

    ```bash
    curl "http://localhost/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=YOUR_VERIFY_TOKEN&hub.challenge=123"
    ```

  - Kirim pesan teks (POST):

    ```bash
    curl -X POST http://localhost/api/whatsapp/send \
      -H "Content-Type: application/json" \
      -d '{"to":"62812xxxxxxx","text":"Halo dari Faskesku"}'
    ```

- Mode 2 (WA Web Desktop)
  - Sisipkan antrean ke MySQL `wa_outbox`:

    ```sql
    INSERT INTO wa_outbox (nowa, pesan, status, type, file)
    VALUES ('62812xxxxxxx@c.us', 'Halo dari Faskesku', 'ANTRIAN', 'TEXT', NULL);
    ```

  - Pastikan aplikasi desktop aktif (Start WA Web, Load Bridging, RUN WA GATEWAY DELPHI) dan periksa log pengiriman.

### Rekomendasi Integrasi Data
- Buat model dan repository untuk `wa_outbox` di Laravel bila memakai Mode 2, atau gunakan API Mode 1 untuk server‑side murni.
- Terapkan idempotency key saat enqueue ke `wa_outbox`/API untuk menghindari duplikasi.
- Tambahkan kolom `provider_message_id` bila ingin tracking detil di Mode 1 (Cloud API).

### Keamanan & Kepatuhan
- Mode 2 bergantung pada injeksi JS ke WhatsApp Web (rapuh terhadap perubahan internal); gunakan hanya bila ada kebutuhan khusus. Mode 1 (Cloud API) lebih stabil dan terdukung resmi.
- Simpan rahasia/token di environment aman; jangan log token.
- Batasi akses API kirim pesan dengan RBAC & rate limit.

### Operasional & Monitoring
- Mode 2: pantau log aplikasi desktop, ping DB, status WebView2, dan backlog `wa_outbox`.
- Mode 1: pantau webhook delivery, error rate, dan retry queue di worker.
