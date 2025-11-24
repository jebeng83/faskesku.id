# Rencana Lanjutan Penyerahan Resep Rawat Jalan (Batch & Embalase/Tuslah)

Dokumen ini merangkum status saat ini dan rencana kerja lanjutan yang komprehensif untuk fitur penyerahan resep Rawat Jalan, khususnya terkait pemakaian batch FIFO, pembaruan stok, audit trail, dan biaya tambahan (embalase/tuslah).

## 1) Latar Belakang Singkat
- Sistem telah mendukung penyerahan resep Rawat Jalan dengan pengurangan stok Gudangbarang secara FIFO, pencatatan detail pemberian obat per batch, serta audit trail stok.
- Embalase/Tuslah per item non‑racikan sudah dapat dikirim dari frontend dan diproses di backend; pembulatan total biaya obat menggunakan 2 desimal.
- Konfirmasi satuan `data_batch.sisa` adalah satuan kecil (contoh: tablet), sehingga pengurangan sisa mengikuti jumlah yang diambil pada Gudangbarang yang juga tersimpan dalam satuan kecil.

## 2) Status Saat Ini
Sudah selesai:
- Validasi opsional payload `embalase_tuslah.non_racikan` dan pembebanan hanya sekali per item.
- Pengurangan stok Gudangbarang per batch secara FIFO dalam satu transaksi.
- Insert ke `detail_pemberian_obat` per batch dengan total dibulatkan 2 desimal.
- Insert ke `aturan_pakai` jika tersedia.
- Audit trail stok per batch via `RiwayatTransaksiGudangBarang::catatUpdate` (error audit tidak menggagalkan penyerahan; di-log warning).
- Update `data_batch.sisa` per batch sejumlah stok kecil yang diambil (`stok_diambil`).

Belum/tahap berikutnya:
- Tampilkan breakdown batch di UI sebelum konfirmasi penyerahan.
- Validasi stok di UI dan blok penyerahan jika tidak cukup (UX).
- Toggle konfigurasi batch (env) untuk menonaktifkan logika batch bila diperlukan.
- Unit test dan E2E test yang mencakup skenario multi‑batch dan error.
- Optimisasi indeks database untuk performa query batch/stok.
- Dokumentasi kontrak API penyerahan dan perilaku batch.

## 3) Tujuan Fase Berikutnya
1. Memberikan transparansi batch yang akan dikonsumsi kepada pengguna (petugas farmasi) sebelum penyerahan.
2. Memastikan pengalaman pengguna yang aman: validasi stok di UI dan pesan error yang jelas.
3. Menyediakan saklar konfigurasi untuk menonaktifkan batch jika business rule mengharuskan.
4. Menjamin kualitas melalui unit test dan E2E end‑to‑end.
5. Memastikan performa baik melalui indeks yang tepat dan logging yang efektif.

## 4) Rencana Kerja Detail

### 4.1 Frontend
- Breakdown batch di modal konfirmasi penyerahan:
  - Sumber data: endpoint `GET /api/resep/stok-info?kode_brng={kode}&kd_poli={kd_poli}` yang sudah tersedia, memuat `batch_detail` (kd_bangsal, no_batch, no_faktur, stok) dan `total_stok`.
  - Per item non‑racikan: lakukan simulasi konsumsi FIFO di frontend berdasarkan `jml` dan `batch_detail` untuk menampilkan rencana (no_batch, no_faktur, qty diambil). Catatan: ini hanya visual; konsumsi sebenarnya tetap dilakukan di backend.
  - Tambahkan tombol “Konfirmasi Penyerahan” dengan ringkasan total item, total biaya, serta breakdown batch.
- Validasi stok di UI:
  - Jika `total_stok < jml` pada item, blok penyerahan dan tampilkan pesan error yang ramah beserta saran kontak depo terkait.
  - Opsional: highlight item yang bermasalah dalam daftar.
- Payload penyerahan:
  - Tetap kirim `embalase_tuslah.non_racikan` sesuai perubahan; racikan tetap “belum didukung” untuk sekarang.
  - Sertakan konfirmasi pengguna (checkbox atau dialog) sebelum submit.
- Error handling & UX:
  - Tampilkan hasil penyerahan yang sukses (tgl/jam penyerahan) dan ringkasan total.
  - Untuk kegagalan, tampilkan detail penyebab dari backend (mis. stok tidak cukup pada item X).

### 4.2 Backend
- Konfigurasi toggle batch:
  - Tambahkan env `OBAT_AKTIFKAN_BATCH=true` dan config, mis. `config/farmasi.php` dengan `batch_enabled => env('OBAT_AKTIFKAN_BATCH', true)`.
  - Di `ResepController::penyerahan` dan `updateStokObat`, kondisikan logika: jika `batch_enabled === false`, kurangi stok agregat (mode non‑batch) dan skip `data_batch.sisa`/per‑batch insert (tetap insert satu baris `detail_pemberian_obat` per item dengan kd_bangsal/no_batch/no_faktur kosong).
- Validasi stok & transaksi:
  - Sudah diterapkan per item dan dibungkus dalam satu `DB::transaction`; pertahankan.
  - Opsional: pertimbangkan locking baris gudang (SELECT … FOR UPDATE) bila terjadi race condition penyerahan paralel.
- Audit trail:
  - Pertahankan `RiwayatTransaksiGudangBarang::catatUpdate`; tingkatkan metadata jika perlu (mis. user_id dari auth).
- Pembaruan `data_batch.sisa`:
  - Sudah diterapkan; tambahkan guard agar sisa tidak menjadi nilai negatif (opsional: validasi sebelum decrement atau gunakan CHECK via aplikasi).

### 4.3 Database
- Indeks yang direkomendasikan:
  - `data_batch (kode_brng, no_batch, no_faktur)` – composite index untuk lookup per batch.
  - `gudangbarang (kd_bangsal, kode_brng, no_batch, no_faktur)` – composite index untuk FIFO dan per-bangsal.
- Tambahkan migration indeks jika belum ada; uji performa query FIFO pada sampel data besar.

### 4.4 Testing
- Unit Tests (PHPUnit):
  - `updateStokObat`: konsumsi FIFO, multi‑batch, kekurangan stok, batch nonaktif.
  - `penyerahan`: validasi stok gagal, sukses multi‑item, audit trail terjadi, pembulatan total 2 desimal, pembebanan embalase/tuslah satu kali per item.
- Integration/E2E:
  - Skenario penyerahan multi‑item dan multi‑batch; verifikasi Gudangbarang, `detail_pemberian_obat`, `aturan_pakai`, data_batch.sisa, dan audit trail.
  - E2E via browser: alur pencarian resep, buka detail, lihat breakdown, konfirmasi, cek hasil.

### 4.5 Dokumentasi & Operasional
- Perbarui `docs/README_RAWAT_JALAN.md`:
  - Kontrak payload penyerahan (embalase_tuslah non‑racikan), format, default bila tidak dikirim.
  - Perilaku batch FIFO dan mekanisme pembebanan biaya.
  - Tabel output yang diupdate (`detail_pemberian_obat`, `aturan_pakai`, audit trail, `data_batch.sisa`).
- Tambahkan dokumentasi konfigurasi `OBAT_AKTIFKAN_BATCH` dan dampaknya.
- Observability:
  - Logging pada kegagalan audit dan kegagalan update data_batch (warning). Pertimbangkan menambah metric counter.

## 5) Acceptance Criteria
- UI menampilkan breakdown batch (no_batch, no_faktur, qty) untuk setiap item non‑racikan sebelum penyerahan.
- Penyerahan diblok di UI jika stok tidak cukup; backend juga menolak dan mengembalikan pesan jelas.
- Saat penyerahan berhasil:
  - Gudangbarang berkurang sesuai FIFO.
  - `detail_pemberian_obat` memiliki satu baris per batch, embalase/tuslah dikenakan sekali per item.
  - `data_batch.sisa` berkurang sesuai jumlah kecil yang diambil dan tidak menjadi negatif.
  - Audit trail tercatat per batch; jika gagal audit, penyerahan tetap berjalan dan ada log warning.
  - Total biaya obat dibulatkan ke 2 desimal.
- Toggle batch nonaktif: sistem tidak menggunakan data_batch, stok dikurangi tanpa fragmentasi per batch, dan penyerahan tetap konsisten.

## 6) Estimasi Timeline
- Minggu 1: Frontend breakdown & validasi stok UI, dokumentasi payload.
- Minggu 2: Backend toggle batch & unit tests, migration indeks database.
- Minggu 3: E2E testing, penyempurnaan logging/observability, rilis bertahap.

## 7) Risiko & Mitigasi
- Race condition penyerahan paralel pada item yang sama: mitigasi dengan validasi stok ulang di backend (sudah) dan pertimbangkan row‑level locking di gudangbarang saat commit.
- Ketidaksesuaian data_batch vs gudangbarang pada sistem lama: lanjutkan proses, log warning untuk investigasi, siapkan job rekonsiliasi berkala.
- Performa buruk pada lookup batch: tambahkan indeks composite dan batasi scope per bangsal.

## 8) Rollout & Rollback
- Rollout bertahap dengan toggle `OBAT_AKTIFKAN_BATCH` bila perlu.
- Rollback: nonaktifkan batch, kembalikan ke mode non‑batch (tanpa update data_batch.sisa), dan audit trail tetap berjalan.

## 9) Contoh Payload Penyerahan
```json
{
  "embalase_tuslah": {
    "non_racikan": [
      { "kode_brng": "BRG001", "embalase": 0, "tuslah": 1000 },
      { "kode_brng": "BRG002", "embalase": 500, "tuslah": 0 }
    ]
  }
}
```

## 10) Catatan Tambahan
- Dukungan racikan belum diimplementasikan; akan dirancang terpisah (struktur grup, detail racikan, dan pembebanan biaya racik).
- Pertimbangkan mengambil `user_id` dari sesi untuk audit trail pengguna yang melakukan penyerahan.

