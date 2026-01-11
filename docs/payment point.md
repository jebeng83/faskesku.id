# Payment Point — Analisis dan Rancangan Pengembangan

## Ringkasan
- Payment Point adalah modul rekap transaksi pembayaran harian per shift, dengan kemampuan mencari (nama/no nota), memfilter petugas, mengelola "Modal Awal", menampilkan total, dan mencetak laporan.
- Implementasi eksisting berada di aplikasi Java Swing [DlgPaymentPoint.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java). Modul ini membaca jendela waktu shift dari tabel closing_kasir, melakukan query ke tagihan_sadewa, menyusun baris tabel, menambahkan ringkasan berdasarkan shift, dan mencetak laporan Jasper.

## Fitur Eksisting (Java)
- Pencarian cepat berbasis keyword nama pasien/no_nota dan filter petugas [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L611-L770).
- Pengaturan tanggal bayar dan pilihan shift (Semua, Pagi, Siang, Sore, Malam) [initComponents](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L377-L405) dan [combo shift](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L396-L399).
- Modal awal dibaca dari set_modal_payment dan dapat diubah melalui dialog [BtnSeek4ActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L517-L524), [BtnSimpan2ActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L540-L549).
- Tabel berisi kolom: No., Tanggal, Shift, No.Rawat/No.Nota, Nama Pasien, Pembayaran, Petugas [init](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L62-L75) dan lebar kolom [kolom](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L80-L97).
- Cetak laporan: data disalin ke temporary_payment lalu dipanggil Jasper Report [BtnPrintActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L430-L459).
- Eksekusi latar belakang single-thread untuk mencegah UI hang [runBackground](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L772-L788).

## Alur Data Eksisting
1. Ambil semua shift dari closing_kasir [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L615-L623).
2. Untuk setiap shift, buat jendela waktu: jam_masuk s/d jam_pulang; untuk Malam, jam_pulang di-"DATE_ADD" ke hari berikutnya [malam](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L632-L639).
3. Query ke tagihan_sadewa menggunakan batas waktu dan filter keyword pada nama_pasien atau no_nota [query](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L624-L641).
4. Untuk setiap baris, cari no_nota akhir via nota_inap/nota_jalan (fallback ke no_nota tagihan) [nota](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L646-L675).
5. Filter berdasarkan petugas (substring case-insensitive) [petugas filter](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L653-L667).
6. Akumulasikan jumlah_bayar per shift dan total keseluruhan; tambahkan baris tabel [akumulasi](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L655-L666) [L678-L689].
7. Setelah seluruh shift, tambahkan ringkasan: Modal Awal, Uang Masuk, dan Total sesuai pilihan shift [ringkasan](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L715-L764).
8. Cetak: isi temporary_payment dan panggil Jasper [print](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L437-L456).

## Observasi Teknis & Kelemahan
- Query OR pada tagihan_sadewa (nama_pasien/no_nota) berpotensi kurang optimal dan ambigu; perlu kontrol grouping agar tidak terjadi duplikasi.
- N+1 query: pencarian COALESCE no_nota dilakukan per baris melalui Sequel.cariIsi; sebaiknya diatasi dengan LEFT JOIN sekali jalan.
- Penentuan jendela "Malam" memakai DATE_ADD harian; perlu perhatian timezone dan boundary inklusif/eksklusif.
- Penulisan ke temporary_payment untuk cetak adalah langkah tambahan; di web sebaiknya membangun dataset di memori/response tanpa tabel sementara.
- Filter petugas memakai contains lowercase; standar yang lebih kuat adalah pemeriksaan case-insensitive via kolom terindeks atau fulltext.

## Target Fungsional (Web)
- Filter: tanggal, shift, keyword (nama/no nota), petugas.
- Tabel transaksi dengan kolom setara dan ringkasan (Modal Awal, Uang Masuk, Total).
- Pengelolaan "Modal Awal" harian via dialog.
- Cetak/unduh laporan (PDF) dan ekspor CSV.
- Pencarian cepat dengan debounce dan indikator loading.

## Arsitektur Modern (Laravel + React + Tailwind CSS + Livewire + Framer Motion)

### Model Domain & Skema Basis Data
- payments: id, no_rawat, no_nota, tgl_bayar (datetime), nama_pasien, jumlah_bayar (decimal), petugas (kode), sumber (jalan/inap/sadewa), created_at.
- closing_kasir: id, shift (Pagi/Siang/Sore/Malam), jam_masuk (time), jam_pulang (time).
- set_modal_payment: modal_awal (decimal), effective_date (date) opsional; jika hanya satu nilai global, kolom tanggal tidak wajib.
- pegawai: nik, nama; digunakan untuk memperkaya petugas.
- Indeks: (tgl_bayar), (petugas), (no_nota), fulltext/trigram pada nama_pasien bila diperlukan untuk pencarian cepat.

### Endpoints Backend (Laravel)
- GET /api/payment-point
  - Query params: date (YYYY-MM-DD), shift (Semua|Pagi|Siang|Sore|Malam), q (keyword), user (petugas).
  - Response: items[] (no, tanggal, shift, no_nota, nama_pasien, pembayaran, petugas), summary {modal_awal, uang_masuk, total}.
- POST /api/payment-point/modal-awal
  - Body: { modal_awal: number, effective_date?: date }.
  - Aksi: simpan ke set_modal_payment dan kembalikan nilai baru.
- GET /api/payment-point/report
  - Params sama dengan list; kembalikan PDF siap unduh.

### Logika Layanan (Service Layer)
- PaymentPointService:
  - Hitung jendela waktu berdasarkan closing_kasir. Untuk shift Malam, akhir = tanggal+1 hari jam_pulang.
  - Susun query utama ke payments/tagihan_sadewa:
    - WHERE tgl_bayar BETWEEN [start,end).
    - Filter q untuk nama_pasien OR no_nota; gunakan fulltext/trigram bila tersedia, fallback LIKE.
    - Filter user case-insensitive pada petugas atau nama pegawai via JOIN.
  - Tentukan no_nota final: COALESCE(nota_inap.no_nota, nota_jalan.no_nota, payments.no_nota) via LEFT JOIN, bukan pemanggilan per baris.
  - Akumulasi per shift dan total; lampirkan ringkasan dengan modal_awal.
  - Caching 30–60 detik per kombinasi (date, shift, q, user) untuk mengurangi beban.

### Pencetakan Laporan
- Template laporan dengan Blade + CSS (Tailwind untuk styling cetak) atau gunakan engine PDF (DOMPDF/Snappy) sesuai standar proyek.
- Jalur cepat: render HTML, lalu konversi ke PDF; jalur berat: enque job (queue) untuk generasi PDF agar non-blocking.
- Hindari tabel sementara; gunakan payload JSON dari service sebagai sumber data.

### Frontend (React + Tailwind CSS + Framer Motion)
- Tata letak:
  - Header filter: tanggal bayar (DatePicker), Shift (Select), Keyword (Input), Petugas (Input), tombol Cari, All, Cetak, Modal Awal.
  - Tabel hasil dengan kolom: No., Tanggal, Shift, No.Rawat/No.Nota, Nama Pasien, Pembayaran, Petugas.
  - Baris ringkasan: Modal Awal, Uang Masuk, Total sesuai shift.
- Interaksi:
  - Debounce 300–500ms pada keyword dan petugas.
  - Loading state dan error boundary.
  - Virtualisasi list (react-window/react-virtualized) untuk performa.
- Animasi (Framer Motion):
  - Transisi halaman, munculnya baris tabel, dan dialog Modal Awal.
  - Micro-interaction pada tombol Cetak dan Simpan.

### Livewire Integration (opsional/komplementer)
- Komponen pengaturan (Closing Kasir, Modal Awal) dapat dihadirkan sebagai halaman Blade + Livewire untuk CRUD admin ringan.
- Halaman utama Payment Point tetap React untuk pengalaman interaktif tinggi; keduanya berbagi endpoint Laravel yang sama.

### Keamanan & Observabilitas
- Authorisasi akses modul dan aksi cetak berdasarkan peran.
- Validasi input (tanggal, shift, angka modal).
- Logging query lambat, metrik jumlah transaksi per shift, audit perubahan modal_awal.

## Rencana Implementasi Bertahap
1. Definisikan model/ORM untuk payments, closing_kasir, set_modal_payment.
2. Implementasikan PaymentPointService dan endpoint GET /api/payment-point.
3. Bangun UI React + Tailwind: filter bar, tabel, ringkasan, loading.
4. Tambah dialog Modal Awal (React) dan endpoint POST /api/payment-point/modal-awal.
5. Implementasi cetak: template Blade -> PDF, tombol Cetak di UI.
6. Optimasi: indeks, caching, virtualisasi tabel.
7. Livewire admin untuk manajemen shift/modal (opsional) dan hardening keamanan.
8. Pengujian: unit (service), integrasi (endpoint), e2e (UI), verifikasi hasil menyamai modul Java.

## Kriteria Penerimaan
- Hasil list dan ringkasan (Modal Awal, Uang Masuk, Total) identik dengan keluaran Java untuk dataset yang sama.
- Pencarian keyword dan filter petugas bekerja cepat dan konsisten.
- Cetak menghasilkan PDF dengan layout jelas dan total yang tepat.

## Contoh Bentuk Response
```json
{
  "items": [
    {
      "no": 1,
      "tanggal": "2026-01-11 08:35:00",
      "shift": "Pagi",
      "no_nota": "NI-2026-0001",
      "nama_pasien": "Budi Santoso",
      "pembayaran": 150000.0,
      "petugas": "A123 - Andi"
    }
  ],
  "summary": {
    "modal_awal": 1000000.0,
    "uang_masuk": 4500000.0,
    "total": 5500000.0
  }
}
```

## Pseudo-SQL (Query Inti)
```sql
-- Tentukan jendela waktu shift
-- start = CONCAT(date, ' ', jam_masuk)
-- end   = CONCAT(date + (shift='Malam' ? 1 day : 0), ' ', jam_pulang)

SELECT 
  COALESCE(ni.no_nota, nj.no_nota, t.no_nota) AS no_nota_final,
  t.tgl_bayar,
  t.nama_pasien,
  t.jumlah_bayar,
  t.petugas
FROM tagihan_sadewa t
LEFT JOIN nota_inap ni   ON ni.no_rawat = t.no_nota
LEFT JOIN nota_jalan nj  ON nj.no_rawat = t.no_nota
LEFT JOIN pegawai p      ON p.nik = t.petugas
WHERE t.tgl_bayar >= :start AND t.tgl_bayar < :end
  AND (
    (:q IS NULL) OR (
      t.nama_pasien LIKE CONCAT('%', :q, '%') OR 
      COALESCE(ni.no_nota, nj.no_nota, t.no_nota) LIKE CONCAT('%', :q, '%')
    )
  )
  AND (
    (:user IS NULL) OR (
      LOWER(CONCAT(t.petugas, ' ', p.nama)) LIKE LOWER(CONCAT('%', :user, '%'))
    )
  )
ORDER BY t.tgl_bayar, no_nota_final;
```

## Risiko & Mitigasi
- Boundary waktu shift: gunakan pembandingan half-open [start, end) untuk akurasi; uji kasus khusus "Malam".
- Performa: indeks tepat (tgl_bayar, petugas, no_nota), batasi kolom select, gunakan pagination bila diperlukan.
- Konsistensi data: perjelas sumber no_nota (jalan/inap) dan definisikan fallback tunggal via COALESCE.
- Skala: gunakan caching dan virtualisasi di UI; enque cetak berat ke job queue.
- Timezone: konsisten di backend dan frontend; simpan UTC, tampilkan lokal.

## Referensi Kode (Java)
- Inisialisasi tabel dan lebar kolom: [DlgPaymentPoint.java:62-97](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L62-L97)
- Aksi Cetak (isi temporary_payment, panggil Jasper): [BtnPrintActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L430-L459)
- Dialog Modal Awal: [BtnSeek4ActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L517-L524), [BtnSimpan2ActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L540-L549)
- Pengambilan dan perakitan data utama: [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L611-L770)
- Eksekusi latar belakang untuk UI: [runBackground](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPaymentPoint.java#L772-L788)

