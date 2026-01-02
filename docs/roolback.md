# Catatan Rollback Transaksi

Dokumen ini menjelaskan konsep rollback transaksi dan pola implementasinya di aplikasi Faskesku.id (Laravel 12, Octane, Inertia/Livewire). Fokusnya adalah memastikan setiap operasi tulis multi‑langkah bersifat atomik: bila salah satu langkah gagal, seluruh perubahan dibatalkan (rollback), sehingga data tetap konsisten.

## Konsep Utama

- Atomicity (ACID): satu unit kerja harus either commit seluruhnya atau rollback seluruhnya.
- Konsistensi: aturan bisnis dan integritas database harus tetap valid setelah operasi.
- Isolasi: transaksi tidak saling mengganggu; gunakan penguncian seperlunya (contoh: `lockForUpdate`).
- Durability: perubahan yang telah di‑commit bertahan meski terjadi crash.

## Pola Laravel yang Didukung

- Closure `DB::transaction`: otomatis commit bila tidak ada exception, otomatis rollback bila ada exception.
  
  ```php
  $result = DB::transaction(function () use ($payload) {
      // 1) Validasi bisnis (throw exception untuk gagal)
      // 2) Tulisan multi-tabel
      // 3) Kembalikan nilai jika perlu
      return ['ok' => true];
  });
  ```

- Manual `beginTransaction`/`commit`/`rollBack`: cocok bila ada banyak titik kegagalan (early return) dan ingin mengontrol respons per kondisi.
  
  ```php
  DB::beginTransaction();
  try {
      // Validasi stok, izin, dll.
      if ($invalid) {
          DB::rollBack();
          return response()->json(['message' => 'invalid'], 400);
      }
      // Tulisan ke beberapa tabel
      DB::commit();
      return response()->json(['success' => true]);
  } catch (\Throwable $e) {
      DB::rollBack();
      return response()->json(['message' => $e->getMessage()], 500);
  }
  ```

## Implementasi di Aplikasi Ini

- Bulk update harga obat: memakai `DB::transaction` agar seluruh pembaruan `databarang` konsisten bila terjadi kegagalan satu item.
  Lihat [DataBarangController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Farmasi/DataBarangController.php#L242-L316).

- Penyerahan resep/obat: memakai `beginTransaction` dan beberapa `DB::rollBack()` untuk validasi stok dan kondisi khusus, lalu `DB::commit()` saat sukses.
  Lihat [ResepController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/RawatJalan/ResepController.php#L56-L140) dan bagian penyerahan [ResepController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/RawatJalan/ResepController.php#L332-L501).

- Posting jurnal akuntansi dari staging: memakai `DB::transaction` dan `lockForUpdate` untuk nomor urut jurnal; menghindari `TRUNCATE` di dalam transaksi (pakai `delete`).
  Lihat [JournalService.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Services/Akutansi/JournalService.php#L35-L88).

- Pengaturan harga obat (admin): beberapa endpoint memakai transaksi manual untuk upsert dan validasi.
  Lihat [SetHargaObatController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Farmasi/SetHargaObatController.php#L138-L169) dan [SetHargaObatController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Farmasi/SetHargaObatController.php#L197-L220).

## Guard Rails & Praktik Baik

- Lempar exception di dalam closure `DB::transaction` untuk memicu rollback otomatis. Hindari menelan error tanpa tindakan.
- Pada pola manual, pastikan setiap jalur kegagalan memanggil `DB::rollBack()` sebelum return.
- Hindari operasi non‑kritikal (audit/log eksternal) menyebabkan kegagalan transaksi: bungkus dengan `try/catch` dan catat warning, lalu lanjutkan. Contoh di penyerahan obat, update `data_batch` yang gagal tidak membatalkan transaksi, tetapi di‑log untuk investigasi.
- Hindari transaksi berdurasi panjang: kumpulkan validasi cepat di luar transaksi, komputasi berat di luar, dan lakukan tulis di dalam transaksi sependek mungkin.
- Hindari `TRUNCATE` di dalam transaksi; gunakan `delete`. Lihat implementasi staging jurnal.
- Nomor urut (sequence) gunakan `lockForUpdate` pada baris agregat untuk mencegah race condition.
- Nested transactions: Laravel mengemulasikan savepoint; tetap prefer satu transaksi top‑level di controller/service dan jangan mencampur manual begin/commit dengan closure nested di area yang sama.

## Pola Penerapan Menurut Modul

- Farmasi → Penyerahan Obat:
  - Top‑level transaksi manual (`beginTransaction`).
  - Early rollback untuk stok tidak cukup, status barang tidak aktif, dll.
  - Operasi audit (`RiwayatTransaksiGudangBarang`) dan penyesuaian batch dibungkus `try/catch` agar tidak memblok transaksi inti.

- Akutansi → Posting Jurnal:
  - `DB::transaction` pada service posting.
  - Validasi debet == kredit sebelum transaksi.
  - Setelah commit, kosongkan staging dengan `delete`.

- Admin → Set Harga Obat:
  - `DB::transaction` atau manual begin/commit untuk konsistensi upsert multi tabel (`set_harga_obat`, `setpenjualan`, `setpenjualanperbarang`).

## Integrasi Eksternal & Kompensasi

- Jangan panggil API eksternal di dalam transaksi DB; commit dulu, lalu kirim. Jika gagal, catat status dan susun job retry/kompensasi.
- Gunakan idempoten key untuk mencegah duplikasi saat retry.
- Kompensasi (bukan rollback) berarti menambah entri pembatalan/balik (contoh: mengembalikan stok dan menambah jurnal pembatalan), bukan menghapus histori.

## Template Kode Standar

- Atomic write (closure):

  ```php
  try {
      $out = DB::transaction(function () use ($ctx) {
          // tulis ke beberapa tabel
          return $ctx;
      });
      return response()->json(['success' => true, 'data' => $out]);
  } catch (\Throwable $e) {
      return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
  }
  ```

- Multi‑branch validation (manual):

  ```php
  DB::beginTransaction();
  try {
      if ($failA) {
          DB::rollBack();
          return response()->json(['message' => 'A'], 400);
      }
      if ($failB) {
          DB::rollBack();
          return response()->json(['message' => 'B'], 400);
      }
      // proses utama
      DB::commit();
      return response()->json(['success' => true]);
  } catch (\Throwable $e) {
      DB::rollBack();
      return response()->json(['message' => $e->getMessage()], 500);
  }
  ```

## Checklist Adopsi

- Pastikan setiap endpoint tulis multi‑tabel memakai transaksi (closure atau manual).
- Pastikan jalur error selalu melakukan rollback sebelum return.
- Pindahkan operasi berat/non‑DB di luar blok transaksi.
- Pakai `lockForUpdate` saat membuat nomor bukti/jurnal atau mengandalkan nilai agregat bersama.
- Audit/log eksternal dibungkus `try/catch` dan tidak memblok transaksi inti.
- Hindari `TRUNCATE` dalam transaksi; gunakan `delete`.

## Referensi Kode

- Data Obat bulk update: [DataBarangController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Farmasi/DataBarangController.php#L242-L316)
- Penyerahan resep/obat: [ResepController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/RawatJalan/ResepController.php#L56-L140), [ResepController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/RawatJalan/ResepController.php#L332-L501)
- Posting jurnal: [JournalService.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Services/Akutansi/JournalService.php#L35-L88)
- Pengaturan harga obat: [SetHargaObatController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Farmasi/SetHargaObatController.php#L138-L169), [SetHargaObatController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Farmasi/SetHargaObatController.php#L197-L220)

