# Dokumentasi Pengembangan Billing Rawat Jalan (Billing Ralan)

Tujuan dokumen ini adalah merangkum konsep, alur data, API, dan pemetaan fungsi dari implementasi lama berbasis Java (DlgBilingRalan) ke implementasi web (React + Laravel) agar memudahkan pengembangan dan verifikasi fitur billing pasien rawat jalan.

## Berkas Terkait di Proyek

- Frontend (React):
  - `resources/js/Pages/Akutansi/Billing.jsx` — halaman Billing pasien (tagihan, pembayaran, status permintaan)
  - `resources/js/Pages/Akutansi/KasirRalan.jsx` — daftar pasien rawat jalan (reg_periksa) untuk kasir
- Backend (Laravel):
  - Rute/Controller (contoh yang relevan):
    - `/akutansi/invoice/{no_rawat}` — header kunjungan & nota untuk billing
    - `/api/akutansi/billing` — API snapshot billing (CRUD) dan ringkasan
    - `/api/permintaan-lab/rawat/{no_rawat}` — status permintaan lab
    - `/api/permintaan-radiologi/rawat/{no_rawat}` — status permintaan radiologi
    - `/api/resep/rawat/{no_rawat}` — status permintaan resep/apotek
    - `/registration/get-registrations` — daftar `reg_periksa` (digunakan oleh KasirRalan)
- Implementasi lama (Java, referensi logic bisnis):
  - `public/DlgBilingRalan.java`
  - `public/DlgBilingRalan.form`
  - `public/cache/*.iyem` — cache master data (penjab, poli, dokter, dll.) untuk aplikasi desktop

## Konsep Utama Billing

1) Snapshot vs Preview
- Snapshot: data tagihan yang sudah diposting ke tabel `billing` (persisten), bisa di-edit/hapus melalui halaman Billing.
- Preview: data tindakan yang diakumulasi dari tabel sumber (Ralan Dokter/Paramedis, Lab, Radiologi, Obat/BHP, Operasi, dll.) ketika belum ada snapshot di `billing`. Pada mode preview, item di UI Billing tidak bisa di-edit/hapus. Pengguna perlu melakukan “Posting Billing” (di kasir) untuk membuat snapshot terlebih dahulu.

2) Kategori Biaya (Status)
- Registrasi
- Ralan Dokter
- Ralan Paramedis
- Ralan Dokter + Paramedis
- Laboratorium
- Radiologi
- Obat/BHP
- Obat Langsung
- Operasi/VK
- Tambahan
- Potongan

Kategori-kategori di atas merupakan padanan dari agregasi query di `DlgBilingRalan.java` dan digunakan untuk ringkasan pembayaran serta pengelompokan item di halaman Billing.

## Arsitektur Tingkat Tinggi

- Frontend (React):
  - Billing.jsx menyediakan tiga tab:
    - Data Tagihan: menampilkan item billing (snapshot/preview), pencarian, filter kategori, dan aksi tambah/edit/hapus (hanya untuk snapshot)
    - Pembayaran: ringkasan (subtotal per kategori, total, PPN bila ada, kembalian)
    - Status Permintaan: daftar permintaan Lab, Radiologi, dan Resep untuk `no_rawat` yang dimaksud
  - KasirRalan.jsx: daftar `reg_periksa` Ralan dengan filter dan tautan cepat ke halaman Billing dan Detail Pembayaran

- Backend (Laravel):
  - Endpoint invoice mengembalikan informasi header kunjungan & nota untuk ditampilkan di UI.
  - Endpoint billing mengembalikan item, ringkasan per status, serta menentukan apakah data berasal dari `billing` (snapshot) atau `preview` (agregasi dari tabel lain).
  - Endpoint permintaan (lab/radiologi/resep) mengembalikan status permintaan terkait `no_rawat`.

## API yang Digunakan

1) GET `/akutansi/invoice/{no_rawat}`
- Mengembalikan header kunjungan: no_rawat, tgl_registrasi, pasien (nama & no_rkm_medis), dokter, poli, penjamin.
- Jika ada nota, menyertakan informasi nota (jenis, no_nota, tanggal, jam).

2) GET `/api/akutansi/billing?no_rawat=...&q=...&status=...`
- Mengembalikan:
  - `items`: daftar item tagihan. Field penting: `tgl_byr`, `no`, `nm_perawatan`, `biaya`, `jumlah`, `tambahan`, `totalbiaya`, `status`, `source` (`billing`/`preview`), `noindex` (jika snapshot).
  - `summary`: `by_status` (subtotal per kategori), `grand_total`.
- Catatan: Jika `items[0].source === 'preview'`, UI Billing menampilkan keterangan bahwa edit/hapus dinonaktifkan karena belum ada snapshot.

3) POST `/api/akutansi/billing`
- Menambah item snapshot ke tabel `billing`.
- Body mirip dengan form di Billing.jsx: `{ no_rawat, tgl_byr, no, nm_perawatan, pemisah, biaya, jumlah, tambahan, status }`. Total per item dihitung di klien, disertakan dalam payload (`totalbiaya`).

4) PUT `/api/akutansi/billing/{noindex}`
- Mengubah item snapshot (hanya untuk `source='billing'`).

5) DELETE `/api/akutansi/billing/{noindex}`
- Menghapus item snapshot (hanya untuk `source='billing'`).

6) GET `/api/permintaan-lab/rawat/{no_rawat}`
7) GET `/api/permintaan-radiologi/rawat/{no_rawat}`
8) GET `/api/resep/rawat/{no_rawat}`
- Menampilkan status dan daftar permintaan terkait kunjungan.

9) GET `/registration/get-registrations?date=YYYY-MM-DD&search=...&status=...&per_page=...`
- Digunakan oleh halaman Kasir Ralan untuk memuat daftar `reg_periksa` per tanggal dengan relasi pasien/dokter/poli/penjamin.

## Pemetaan Fungsi Java (DlgBilingRalan.java) ke Implementasi Web

Berikut rangkuman fungsi inti di Java dan padanan/implikasi di web (React/Laravel):

- `isRawat()` / `isRawat2()`
  - Tujuan: Mengisi header kunjungan (dokter, poli, pasien, penjamin), menentukan nota, dan cek apakah sudah ada snapshot di `billing`.
  - Padanan web: `GET /akutansi/invoice/{no_rawat}` dipanggil oleh Billing.jsx untuk menampilkan header; keberadaan snapshot ditentukan dari hasil `GET /api/akutansi/billing` (`source='billing'` vs `source='preview'`).

- `prosesCariReg()`
  - Tujuan: Mengambil detail `reg_periksa` (tgl, jam, biaya_reg, umur, dsb.).
  - Padanan web: Informasi serupa tampil di header invoice dan tabel Kasir Ralan (melalui `get-registrations`).

- `prosesCariRwJlDr()` / `prosesCariRwJlPr()` / `prosesCariRwJlDrPr()`
  - Tujuan: Mengagregasi tindakan Ralan (dokter, paramedis, gabungan) dari tabel `rawat_jl_*` dan `jns_perawatan` untuk menghitung jumlah, biaya, tambahan (material, manajemen, KSO), dan total.
  - Padanan web: Pada mode preview, API `billing` menyiapkan agregasi kategori “Ralan Dokter”, “Ralan Paramedis”, dan “Ralan Dokter + Paramedis” agar tampil di UI.

- `prosesCariPeriksaLab()` / `prosesCariRadiologi()`
  - Tujuan: Mengagregasi item lab/radiologi (jumlah, biaya, total dokter/petugas, KSO, BHP) berdasarkan `periksa_lab`/`periksa_radiologi` dan jenis perawatan.
  - Padanan web: Mode preview menambahkan kategori “Laboratorium” dan “Radiologi” ke item Billing beserta subtotal untuk ringkasan.

- `prosesCariObat()`
  - Tujuan: Mengakumulasi obat/BHP dari `detail_pemberian_obat` + `databarang`/`jenis`, menghitung jumlah, tambahan (embalase+tuslah), total bersih, dan total beli.
  - Padanan web: Mode preview menambahkan kategori “Obat/BHP”. Bila ada “Obat Langsung”, ditambahkan kategori tersendiri.

- `prosesCariOperasi()`
  - Tujuan: Menyusun tagihan operasi dari `operasi` + `paket_operasi` dan `beri_obat_operasi` (obat OK), menghitung komponen biaya.
  - Padanan web: Mode preview menambahkan kategori “Operasi/VK” bila ada.

- `isHitung()`
  - Tujuan: Menyatukan seluruh subtotal kategori (registrasi, ralan, lab, radiologi, obat, operasi, tambahan, potongan), menghitung grand total, PPN (jika ada), dan kekurangan/bayar.
  - Padanan web: Ringkasan di tab “Pembayaran” (`PembayaranTab` di Billing.jsx) menampilkan subtotal per kategori dan grand total. Perhitungan PPN dan kembalian mengikuti konfigurasi (bisa ditambahkan sesuai kebutuhan).

- `isKembali()`
  - Tujuan: Menghitung kembalian jika pembayaran > total tagihan.
  - Padanan web: Ditunjukkan di ringkasan pembayaran (bila ada input bayar/kembalian). Saat ini UI berfokus pada ringkasan; input bayar per akun dapat ditambahkan kemudian.

- `tampilAkunBankJateng*()`, `tampilAkunBankPapua*()`, `tampilAkunBankJabar*()`, `tampilAkunBankBRI*()`, `tampilAkunBankMandiri*()`
  - Tujuan: Menampilkan/memilih akun bank spesifik untuk pembayaran/host-to-host.
  - Padanan web: Belum diimplementasikan. Perlu modul integrasi per bank dan mapping akun. Rujuk berkas `public/cache/*.iyem` untuk referensi master data yang dulu digunakan desktop.

- `tampilAkunBayar*()`, `tampilAkunPiutang*()`, `tampilAkunBayarTersimpan()`, `tampilAkunPiutangTersimpan()`
  - Tujuan: Menyiapkan daftar akun pembayaran/piutang dan yang sudah tersimpan.
  - Padanan web: Belum diimplementasikan. Rencana: endpoint akun bayar/piutang, serta UI untuk rekonsiliasi di tab Pembayaran.

- `isSimpan()`
  - Tujuan: Menyimpan snapshot ke tabel `billing`, mengisi temporary, jurnal, dan nota pembayaran.
  - Padanan web: Aksi “Posting Billing” di Kasir (belum di halaman Billing.jsx) perlu menulis snapshot, membuat entri jurnal (bila sistem akutansi mengharuskan), dan menyiapkan nota. Saat ini halaman Billing.jsx mendukung CRUD item snapshot, namun posting agregat penuh sebaiknya dilakukan di halaman Kasir.

## Ringkasan UI (Billing.jsx)

- Input nomor rawat, tombol “Muat” memanggil `/akutansi/invoice/{no_rawat}` dan `/api/akutansi/billing`.
- Tab “Data Tagihan”:
  - Tambah Item (POST snapshot)
  - Filter kategori dan pencarian item
  - Edit/Hapus item hanya untuk `source='billing'` (snapshot)
  - Notifikasi jika dalam mode preview
- Tab “Pembayaran”:
  - Menampilkan subtotal per kategori dan grand total; komponen PPN dan kembalian dapat diaktifkan sesuai kebutuhan.
- Tab “Status Permintaan”:
  - Memuat status permintaan dari API lab/radiologi/resep berdasarkan `no_rawat`.

## Ringkasan UI (KasirRalan.jsx)

- Menampilkan daftar `reg_periksa` Ralan per rentang tanggal dengan filter penjamin, poli, dokter, status, status bayar, pencarian, dan urutan.
- Aksi cepat per baris: tautan ke halaman Billing dan Detail Pembayaran ralan.
- Menggunakan endpoint `/registration/get-registrations` untuk memuat data.

## Perhitungan & Ringkasan

- Subtotal per kategori dihitung dari item (snapshot) atau agregasi (preview).
- Grand total = penjumlahan semua subtotal, dikurangi Potongan, ditambah Tambahan, ditambah PPN (jika ada).
- Kembalian = Bayar − Grand Total (jika Bayar > Grand Total).
- Piutang: jika sebagian tagihan belum dibayar, catat sebagai piutang sesuai penjamin/akun.

## Catatan tentang `public/cache/*.iyem`

- Berkas cache `.iyem` di aplikasi desktop menyimpan master data (penjab, poli, dokter, dll.) untuk akses cepat.
- Di implementasi web, master data diambil melalui endpoint API. Jika diperlukan, mekanisme cache sisi server/klien dapat disiapkan agar performa tetap baik.

## Pengujian

1) Halaman Kasir Ralan: `http://127.0.0.1:8002/akutansi/kasir-ralan`
- Muat rentang tanggal aktif, verifikasi daftar pasien dan filter.
- Buka Billing dari tautan “Billing” untuk `no_rawat` terpilih.

2) Halaman Billing: `http://127.0.0.1:8001/akutansi/billing` atau sesuai server dev Anda
- Masukkan `no_rawat` dan klik “Muat”.
- Verifikasi:
  - Data Tagihan menampilkan item sesuai snapshot/preview, tombol edit/hapus nonaktif untuk preview.
  - Tab Pembayaran menampilkan ringkasan kategori dan grand total.
  - Tab Status Permintaan menampilkan permintaan lab/radiologi/resep.

## Rencana Pengembangan Lanjutan

- Menambahkan aksi “Posting Billing” di halaman Kasir untuk membuat snapshot lengkap dari agregasi preview (meniru `isSimpan()` di Java).
- Menyediakan modul akun bayar dan piutang, termasuk integrasi bank (Jateng/BRI/Jabar/Papua/Mandiri) sesuai kebutuhan.
- Menambahkan konfigurasi PPN untuk obat/jasa yang relevan dan mengalirkannya ke ringkasan pembayaran.
- Menyediakan cetak nota, jurnal akutansi, dan rekonsiliasi pembayaran.

## Perbedaan Penting vs Implementasi Desktop (Java)

- Desktop melakukan agregasi langsung via SQL dan menyimpan sementara ke tabel temporary; web melakukan agregasi melalui service/controller dan mengirimkan hasil ke UI.
- Desktop menggunakan cache `.iyem` untuk master data; web mengandalkan endpoint API dan dapat menambahkan cache sisi klien.
- Mode preview di web dirancang untuk mencegah edit/hapus sebelum ada snapshot, menjaga integritas data.

## Referensi Cepat

- Billing.jsx: komponen utama billing, form CRUD item snapshot, tab ringkasan pembayaran, status permintaan.
- KasirRalan.jsx: daftar `reg_periksa` Ralan, filter, dan tautan ke Billing.
- DlgBilingRalan.java: sumber referensi agregasi kategori dan alur bisnis (registrasi, ralan, lab, radiologi, obat, operasi, tambahan/potongan, akun bayar/piutang, bank, PPN, kembalian).

Jika Anda memerlukan detail tambahan (misal struktur payload dari endpoint tertentu, atau penyesuaian kategori/PPN), mohon informasikan agar dokumentasi diperbarui sesuai implementasi terbaru.

---

## Posting Jurnal Otomatis setelah Simpan (Billing.jsx)

Untuk memenuhi kebutuhan “posting jurnal balik” setelah aksi simpan di halaman Billing, ditambahkan endpoint dan alur berikut:

- Endpoint baru:
  - `GET /api/akutansi/nota-jalan/exists?no_rawat=...` — cek apakah sudah ada `nota_jalan` untuk kunjungan.
  - `POST /api/akutansi/nota-jalan` — membuat `nota_jalan` otomatis dengan format nomor `YYYY/MM/DD/RJ/NNNN`.
  - `POST /api/akutansi/jurnal/stage-from-billing` — menyiapkan baris staging di `tampjurnal` dari total `billing` untuk `no_rawat` tersebut.
  - `POST /api/akutansi/jurnal/post-staging` — melakukan posting dari `tampjurnal` ke `jurnal` dan `detailjurnal`.

- Perubahan di `resources/js/Pages/Akutansi/Billing.jsx` (handleCreate):
  1) Validasi ringan dan cek `nota_jalan` (blokir jika nota sudah ada, mengikuti perilaku Java).
  2) Simpan item snapshot ke `/api/akutansi/billing`.
  3) Buat `nota_jalan` (jika belum ada) via `/api/akutansi/nota-jalan`.
  4) Stage jurnal via `/api/akutansi/jurnal/stage-from-billing`.
  5) Posting jurnal via `/api/akutansi/jurnal/post-staging` dengan `no_bukti` = nomor nota (`no_nota`) bila tersedia.

- Konfigurasi COA (Chart of Accounts):
  - Berkas baru `config/akutansi.php` menyediakan kunci:
    - `rek_kas_default`: kode rekening default untuk Debet (Kas/Bank).
    - `rek_pendapatan_default`: kode rekening default untuk Kredit (Pendapatan Jasa).
  - Jika tidak diisi, endpoint `stage-from-billing` akan memberi error 422. Isi sesuai tabel `rekening` Anda agar staging jurnal berhasil.

- Validasi posting jurnal:
  - Service `App/Services/Akutansi/JournalService.php` memastikan jumlah baris staging > 0 dan total debet == kredit sebelum membuat `no_jurnal` (`JRYYYYMMDDNNNNNN`) dan menyisipkan ke tabel `jurnal` serta `detailjurnal`.

Catatan:
- Alur di atas adalah implementasi minimal agar “posting jurnal balik” terjadi setelah simpan item billing. Implementasi penuh (meniru `isSimpan()` Java: memasukkan komponen biaya per kategori ke staging dan membuat nota pembayaran terperinci) tetap direncanakan di modul Kasir.
- Bila Anda memiliki mapping akun per kategori (Laborat, Radiologi, Obat, Administrasi, Sarpras, Tarif Dokter/Perawat, dsb.), endpoint `stage-from-billing` dapat dikembangkan untuk menyusun baris staging lebih rinci per komponen biaya.

---

## Menghindari Error "Total Debet dan Kredit gabungan tidak sama"

Error **"Total Debet dan Kredit gabungan tidak sama"** terjadi ketika `JurnalPostingService::post()` menggabungkan data dari `tampjurnal` dan `tampjurnal2`, tetapi total debet tidak sama dengan total kredit. Error ini biasanya disebabkan oleh:

1. **Data lama di staging tidak dibersihkan** sebelum membuat staging baru
2. **Komposisi jurnal tidak seimbang** (debet ≠ kredit) saat dibuat oleh composer
3. **Staging dari operasi sebelumnya masih tersisa** dan tercampur dengan staging baru

### Best Practices untuk Menghindari Error

#### 1. **Backend: Controller - Bersihkan Staging Sebelum Membuat Staging Baru**

**WAJIB:** Sebelum memanggil composer untuk membuat staging baru, bersihkan kedua tabel staging (`tampjurnal` dan `tampjurnal2`).

**Contoh Implementasi di Controller:**

```php
public function stageJurnalRalan(Request $request)
{
    $validated = $request->validate([
        'no_rawat' => ['required', 'string'],
    ]);

    try {
        // PENTING: Bersihkan staging lama sebelum membuat staging baru
        // JurnalPostingService menggabungkan tampjurnal + tampjurnal2,
        // jadi keduanya harus dibersihkan untuk menghindari ketidakseimbangan
        DB::table('tampjurnal')->delete();
        DB::table('tampjurnal2')->delete();

        /** @var TampJurnalComposerRalan $composer */
        $composer = app(TampJurnalComposerRalan::class);
        $result = $composer->composeForNoRawat($validated['no_rawat']);

        $balanced = round($result['debet'], 2) === round($result['kredit'], 2);

        // Validasi tambahan: pastikan debet dan kredit seimbang
        if (!$balanced) {
            Log::warning('Staging jurnal tidak seimbang', [
                'no_rawat' => $validated['no_rawat'],
                'debet' => $result['debet'],
                'kredit' => $result['kredit'],
                'selisih' => abs($result['debet'] - $result['kredit']),
            ]);
        }

        return response()->json([
            'success' => true,
            'meta' => [
                'debet' => $result['debet'],
                'kredit' => $result['kredit'],
                'balanced' => $balanced,
                'lines' => count($result['lines']),
            ],
            'lines' => $result['lines'],
            'message' => 'Staging jurnal berhasil disusun',
        ], 201);
    } catch (\Throwable $e) {
        Log::error('Gagal menyusun staging jurnal', [
            'no_rawat' => $validated['no_rawat'] ?? null,
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);
        return response()->json([
            'success' => false,
            'message' => 'Gagal menyusun staging jurnal: ' . $e->getMessage(),
        ], 500);
    }
}
```

**Contoh untuk Permintaan Lab:**

```php
public function stageJurnalLab(Request $request)
{
    $validated = $request->validate([
        'noorder' => ['required', 'string'],
    ]);

    try {
        // PENTING: Bersihkan staging lama
        DB::table('tampjurnal')->delete();
        DB::table('tampjurnal2')->delete();

        /** @var TampJurnalComposerLab $composer */
        $composer = app(TampJurnalComposerLab::class);
        $result = $composer->composeForNoOrder($validated['noorder']);

        $balanced = round($result['debet'], 2) === round($result['kredit'], 2);

        if (!$balanced) {
            Log::warning('Staging jurnal lab tidak seimbang', [
                'noorder' => $validated['noorder'],
                'debet' => $result['debet'],
                'kredit' => $result['kredit'],
            ]);
        }

        return response()->json([
            'success' => true,
            'meta' => [
                'debet' => $result['debet'],
                'kredit' => $result['kredit'],
                'balanced' => $balanced,
            ],
        ], 201);
    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal menyusun staging jurnal: ' . $e->getMessage(),
        ], 500);
    }
}
```

#### 2. **Backend: Composer - Validasi Keseimbangan Sebelum Menulis ke Staging**

**WAJIB:** Di dalam composer, validasi bahwa debet dan kredit seimbang **sebelum** menulis ke staging. Jika tidak seimbang, lempar `RuntimeException` dengan pesan detail.

**Contoh Implementasi di Composer:**

```php
public function composeForNoRawat(string $noRawat): array
{
    // ... agregasi data dan pembuatan lines ...

    if (empty($lines)) {
        return ['debet' => 0.0, 'kredit' => 0.0, 'lines' => []];
    }

    // Hitung total debet dan kredit untuk validasi
    $totDeb = 0.0;
    $totKre = 0.0;
    foreach ($lines as $l) {
        $totDeb += $l['debet'];
        $totKre += $l['kredit'];
    }

    // Validasi: pastikan debet dan kredit seimbang sebelum menulis ke staging
    if (round($totDeb, 2) !== round($totKre, 2)) {
        throw new \RuntimeException(
            sprintf(
                'Komposisi jurnal tidak seimbang: Debet = %s, Kredit = %s, Selisih = %s. Periksa konfigurasi akun di set_akun_ralan.',
                number_format($totDeb, 2, '.', ','),
                number_format($totKre, 2, '.', ','),
                number_format(abs($totDeb - $totKre), 2, '.', ',')
            )
        );
    }

    // Tulis ke staging tampjurnal2 (kosongkan dulu agar idempoten)
    // Catatan: tampjurnal sudah dibersihkan di controller sebelum memanggil composer ini
    DB::table('tampjurnal2')->delete();
    DB::table('tampjurnal2')->insert(array_map(function ($l) {
        return [
            'kd_rek' => $l['kd_rek'],
            'nm_rek' => null,
            'debet' => $l['debet'],
            'kredit' => $l['kredit'],
        ];
    }, $lines));

    return ['debet' => $totDeb, 'kredit' => $totKre, 'lines' => $lines];
}
```

**Catatan Penting:**
- Composer hanya membersihkan `tampjurnal2` (atau `tampjurnal` sesuai kebutuhan)
- Controller harus membersihkan **kedua** staging (`tampjurnal` dan `tampjurnal2`) sebelum memanggil composer
- Validasi keseimbangan dilakukan **sebelum** menulis ke staging, bukan setelahnya

#### 3. **Frontend: Validasi Staging Sebelum Posting**

**WAJIB:** Di frontend, validasi bahwa staging berhasil dan seimbang sebelum melanjutkan ke posting jurnal.

**Contoh Implementasi di Frontend (React):**

```javascript
// Setelah simpan tindakan/resep/lab berhasil, otomatis susun staging dan posting jurnal
try {
    setPostingLoading(true);
    const stageRes = await axios.post('/api/tarif-tindakan/stage-ralan', {
        token,
        no_rawat: noRawat,
    });

    // Validasi staging: pastikan success, meta ada, dan balanced = true
    if (!stageRes.data || !stageRes.data.success) {
        const errMsg = stageRes.data?.message || 'Staging jurnal gagal. Posting dibatalkan.';
        setAlertConfig({
            type: 'error',
            title: 'Staging Gagal',
            message: errMsg,
            autoClose: true,
        });
        setShowAlert(true);
        setPostingLoading(false);
        return; // STOP: jangan lanjutkan ke posting
    }

    if (!stageRes.data.meta || !stageRes.data.meta.balanced) {
        const debet = stageRes.data.meta?.debet || 0;
        const kredit = stageRes.data.meta?.kredit || 0;
        const selisih = Math.abs(debet - kredit);
        const errMsg = stageRes.data?.message || 
            `Staging jurnal tidak seimbang. Debet: ${debet.toLocaleString('id-ID')}, Kredit: ${kredit.toLocaleString('id-ID')}, Selisih: ${selisih.toLocaleString('id-ID')}. Posting dibatalkan.`;
        console.error('Staging tidak seimbang:', {
            debet,
            kredit,
            selisih,
            meta: stageRes.data.meta,
        });
        setAlertConfig({
            type: 'error',
            title: 'Staging Tidak Seimbang',
            message: errMsg,
            autoClose: true,
        });
        setShowAlert(true);
        setPostingLoading(false);
        return; // STOP: jangan lanjutkan ke posting
    }

    // Staging berhasil dan seimbang, lanjutkan ke posting
    try {
        const postRes = await axios.post('/api/akutansi/jurnal/post', {
            no_bukti: noRawat,
            keterangan: `Posting otomatis tindakan Rawat Jalan no_rawat ${noRawat}`,
        });

        if (postRes.status === 201 && postRes.data && postRes.data.no_jurnal) {
            // Success
        } else {
            // Handle error
        }
    } catch (postError) {
        // Handle posting error
    }
} catch (e) {
    // Handle staging error
}
```

#### 4. **Backend: JurnalPostingService - Validasi Final**

`JurnalPostingService::post()` sudah memiliki validasi keseimbangan sebelum posting. Validasi ini akan melempar `RuntimeException` jika:
- Staging kosong (`jml <= 0`)
- Total debet atau kredit <= 0
- Total debet tidak sama dengan total kredit

**Tidak perlu mengubah `JurnalPostingService`**, tetapi pastikan error handling di frontend menangani `RuntimeException` dengan baik.

### Checklist untuk Developer

Saat membuat composer jurnal baru atau memperbaiki composer yang ada, pastikan:

- [ ] **Controller membersihkan `tampjurnal` dan `tampjurnal2`** sebelum memanggil composer
- [ ] **Composer menghitung total debet dan kredit** sebelum menulis ke staging
- [ ] **Composer memvalidasi keseimbangan** dan melempar `RuntimeException` jika tidak seimbang
- [ ] **Composer hanya membersihkan staging yang digunakannya** (`tampjurnal` atau `tampjurnal2`)
- [ ] **Controller menambahkan logging** untuk warning jika staging tidak seimbang
- [ ] **Frontend memvalidasi `success` dan `balanced`** sebelum melanjutkan ke posting
- [ ] **Frontend menampilkan pesan error yang informatif** (debet, kredit, selisih) jika tidak seimbang
- [ ] **Frontend tidak melanjutkan posting** jika staging tidak seimbang

### Contoh Alur Kerja yang Benar

```
1. User klik Simpan (Tindakan/Resep/Lab)
   ↓
2. Simpan data ke database (rawat_jl_dr, resep_obat, permintaan_lab, dll.)
   ↓
3. Controller: Bersihkan tampjurnal & tampjurnal2
   ↓
4. Controller: Panggil composer untuk membuat staging baru
   ↓
5. Composer: Agregasi data dan buat lines jurnal
   ↓
6. Composer: Hitung total debet dan kredit
   ↓
7. Composer: Validasi keseimbangan (debet == kredit)
   ├─ Jika tidak seimbang → Lempar RuntimeException
   └─ Jika seimbang → Tulis ke staging (tampjurnal2)
   ↓
8. Controller: Return response dengan meta.balanced = true/false
   ↓
9. Frontend: Validasi success dan balanced
   ├─ Jika tidak success atau tidak balanced → STOP, tampilkan error
   └─ Jika success dan balanced → Lanjutkan ke posting
   ↓
10. Frontend: POST /api/akutansi/jurnal/post
   ↓
11. JurnalPostingService: Validasi final keseimbangan
   ├─ Jika tidak seimbang → Lempar RuntimeException (400)
   └─ Jika seimbang → Posting ke jurnal/detailjurnal
```

### Troubleshooting

**Error: "Total Debet dan Kredit gabungan tidak sama"**

**Kemungkinan Penyebab:**
1. Data lama di `tampjurnal` atau `tampjurnal2` tidak dibersihkan sebelum staging baru
2. Komposisi jurnal di composer tidak seimbang (periksa perhitungan agregasi)
3. Konfigurasi akun di `set_akun_ralan` tidak lengkap atau salah
4. Ada operasi lain yang menulis ke staging secara bersamaan

**Solusi:**
1. Pastikan controller membersihkan **kedua** staging sebelum memanggil composer
2. Periksa composer: pastikan setiap debet memiliki kredit yang seimbang
3. Periksa konfigurasi akun di `set_akun_ralan`: pastikan semua akun yang diperlukan sudah terisi
4. Periksa log untuk melihat nilai debet, kredit, dan selisih
5. Gunakan transaksi database (`DB::beginTransaction()`) jika diperlukan untuk isolasi

**Contoh Query untuk Debugging:**

```sql
-- Cek isi staging saat ini
SELECT 'tampjurnal' AS tabel, COUNT(*) AS jumlah, 
       SUM(COALESCE(debet,0)) AS total_debet, 
       SUM(COALESCE(kredit,0)) AS total_kredit
FROM tampjurnal
UNION ALL
SELECT 'tampjurnal2' AS tabel, COUNT(*) AS jumlah,
       SUM(COALESCE(debet,0)) AS total_debet,
       SUM(COALESCE(kredit,0)) AS total_kredit
FROM tampjurnal2;

-- Cek detail baris staging
SELECT 'tampjurnal' AS tabel, kd_rek, debet, kredit FROM tampjurnal
UNION ALL
SELECT 'tampjurnal2' AS tabel, kd_rek, debet, kredit FROM tampjurnal2
ORDER BY kd_rek;
```

### Referensi File

- **Composer:**
  - `app/Services/Akutansi/TampJurnalComposerRalan.php` - Tindakan Rawat Jalan
  - `app/Services/Akutansi/TampJurnalComposerResepRalan.php` - Resep Obat Rawat Jalan
  - `app/Services/Akutansi/TampJurnalComposerLab.php` - Permintaan Laboratorium
- **Controller:**
  - `app/Http/Controllers/TarifTindakanController.php` - `stageJurnalRalan()`
  - `app/Http/Controllers/PermintaanLabController.php` - `stageJurnalLab()`
  - `app/Http/Controllers/RawatJalan/ResepController.php` - Auto posting resep
- **Service:**
  - `app/Services/Akutansi/JurnalPostingService.php` - Posting dari staging ke jurnal
- **Frontend:**
  - `resources/js/Pages/RawatJalan/components/TarifTindakan.jsx` - Contoh validasi staging
  - `resources/js/Pages/RawatJalan/components/PermintaanLab.jsx` - Contoh validasi staging
