Pemasukan Lain — Analisis Modul Lama dan Rancangan Payment Point (Laravel + React + Tailwind CSS + Livewire + Framer Motion)

Ringkasan Modul DlgPemasukanLain.java

- Tujuan: Mencatat pemasukan non-standar (lain-lain) dengan kategori dan petugas, mem-posting ke jurnal, serta menampilkan total periode.
- Lokasi: [DlgPemasukanLain.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPemasukanLain.java)
- Metode kunci:
  - Simpan: [BtnSimpanActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPemasukanLain.java#L667-L744)
  - Hapus: [BtnHapusActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPemasukanLain.java#L766-L836)
  - Tampil: [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPemasukanLain.java#L1136-L1178)
  - Hitung: [hitung](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPemasukanLain.java#L1180-L1194)

Struktur Data yang Terlibat

- pemasukan_lain: no_masuk, tanggal, keterangan, keperluan, besar, nip, kode_kategori
- kategori_pemasukan_lain: kode_kategori, nama_kategori, kd_rek, kd_rek2 (akun & kontra-akun)
- petugas: nip, nama
- tampjurnal: buffer sementara jurnal ("+Akun" dan "Kontra Akun") sebelum commit
- jurnal: entri jurnal hasil posting buffer tampjurnal
- tagihan_sadewa: pencatatan pelunasan terkait pemasukan (konteks payment point internal)

Validasi & Aturan Simpan

- Validasi wajib: Keterangan, Keperluan, Nomor Transaksi, Petugas, Kategori, nilai Pemasukan > 0
- Transaksi DB: AutoCommit dimatikan, insert ke pemasukan_lain, posting ke tampjurnal memakai kd_rek/kd_rek2, commit jika sukses, rollback jika gagal
- Pelunasan: setelah jurnal sukses, menambah baris ke tagihan_sadewa (tipe "Pelunasan", status "Sudah")
- UI: baris data ditambahkan ke tabel dan total dihitung ulang

Alur Simpan (Detail)

1) Validasi input (lihat [Valid.textKosong](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPemasukanLain.java#L668-L679))
2) Insert pemasukan_lain (lihat [Sequel.menyimpantf](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPemasukanLain.java#L683-L686))
3) Muat akun dari kategori (lihat query kd_rek/kd_rek2 [L689-L694])
4) Isi tampjurnal dua sisi (akun & kontra-akun) [L695-L700]
5) Commit jurnal (jur.simpanJurnal) [L701-L703]
6) Catat pelunasan di tagihan_sadewa [L716-L718]
7) Commit transaksi DB [L727-L735]
8) Update tabel dan total [L737-L742]

Alur Hapus (Detail)

1) Hapus pemasukan_lain terpilih [L777-L779]
2) Bangun tampjurnal pembatalan memakai kd_rek/kd_rek2 [L781-L797]
3) Hapus tagihan_sadewa terkait [L809-L811]
4) Commit/rollback sesuai hasil [L820-L829]
5) Update tabel & total [L830-L833]

Alur Tampil & Hitung

- tampil: query rentang tanggal + pencarian bebas; gabung kategori & petugas; susun baris tabel; panggil hitung
- hitung: jumlahkan kolom besar; tambahkan baris total di akhir jika > 0

Rancangan Arsitektur Payment Point (Target: Laravel + React + Tailwind CSS + Livewire + Framer Motion)

Tujuan

- Migrasi fungsionalitas pemasukan lain ke web modern, menjaga akuntansi beriringan (jurnal dua sisi) dan pelunasan.
- Menyediakan UI cepat dengan animasi halus, dapat dioperasikan kasir/petugas.

Komponen Sistem

- Backend (Laravel)
  - Service: IncomeExtraService (CRUD pemasukan_lain)
  - Service: JournalService (posting jurnal dari buffer)
  - Service: CategoryService (kd_rek/kd_rek2)
  - Service: SettlementService (tagihan_sadewa)
  - Modul Auth & Role (Petugas)
  - Queue Worker (posting jurnal async, notifikasi)
- Frontend (React)
  - Halaman Payment Point: Pemasukan Lain
  - Form & Tabel daftar pemasukan (filter tanggal, search, kategori, petugas)
  - Komponen Total & ringkasan
- Styling (Tailwind CSS)
  - Utility-first untuk form, tabel, panel, dan state
- Interaksi (Framer Motion)
  - Transisi panel filter/daftar, micro-interaction tombol, feedback sukses/gagal
- Livewire (opsional-hibrida)
  - Server-driven widget untuk laporan/rekap (bila ingin integrasi cepat dengan Blade)
  - Integrasi via slot/partial di halaman administrasi, tidak untuk SPA utama

Skema Database (Laravel Migrations)

- pemasukan_lain
  - no_masuk (string, pk unik)
  - tanggal (datetime)
  - keterangan (text)
  - keperluan (text)
  - besar (decimal(18,2))
  - nip (string, fk petugas)
  - kode_kategori (string, fk kategori)
- kategori_pemasukan_lain
  - kode_kategori (string, pk)
  - nama_kategori (string)
  - kd_rek (string)
  - kd_rek2 (string)
- petugas
  - nip (string, pk), nama, role
- jurnal (+ detail_jurnal)
  - no_bukti, tanggal, deskripsi
  - detail: kode_rek, debit, kredit, urutan
- tampjurnal (opsi: tabel atau model in-memory/redis)
- tagihan_sadewa
  - no_nota, deskripsi, tanggal, tipe (Pelunasan), total, bayar, status, nip

API Kontrak (Laravel Routes)

- POST /api/pemasukan-lain
  - body: { no_masuk, tanggal, kode_kategori, besar, nip, keterangan, keperluan }
  - proses: beginTransaction → insert pemasukan_lain → ambil kd_rek/kd_rek2 → buat journal entries → insert tagihan_sadewa → commit
- GET /api/pemasukan-lain?start=...&end=...&q=...
  - hasil: daftar join kategori & petugas + total
- DELETE /api/pemasukan-lain/{no_masuk}
  - proses: beginTransaction → hapus pemasukan_lain → posting jurnal pembatalan → hapus tagihan_sadewa → commit
- GET /api/kategori-pemasukan-lain
- GET /api/petugas

Business Rules & Validasi

- no_masuk unik (format bisa berbasis tanggal+counter)
- besar > 0; kategori wajib memiliki kd_rek & kd_rek2
- nip harus aktif dan berizin (role: kasir/keuangan)
- Konsistensi jurnal: total debit == total kredit setiap transaksi
- Pelunasan (tagihan_sadewa) disimpan hanya setelah jurnal sukses

Desain UI (React + Tailwind + Framer Motion)

- Form Input
  - Field: Nomor Transaksi, Tanggal, Kategori (select), Petugas (select), Pemasukan (currency), Keterangan, Keperluan
  - Validasi realtime dan disabled saat proses simpan
- Daftar & Filter
  - Rentang tanggal, pencarian teks bebas, kategori, petugas
  - Tabel responsif dengan baris total di akhir
- Interaksi
  - Tombol: Simpan, Batal, Hapus, Cetak
  - Motion: fade/slide untuk panel input dan feedback

Arsitektur Frontend

- State: React Query untuk data server (list/filter), Zustand atau Context untuk UI state lokal
- Error Handling: toast modal untuk kesalahan transaksi (rollback), inline untuk validasi
- Akses: guard berdasarkan role; audit trail aksi penting

Posting Jurnal (Detail Teknis)

- Ambil kd_rek & kd_rek2 dari kategori
- Buat dua baris detail_jurnal: debit (akun) dan kredit (kontra-akun) sesuai besar
- Bungkus dalam satu no_bukti = no_masuk
- Simpan atomik dalam transaksi; gagal → rollback seluruh transaksi

Strategi Hapus & Pembatalan

- Buat jurnal pembatalan dengan pembalikan sisi (debit/kredit ditukar)
- Hapus pemasukan_lain terlebih dulu, kemudian tagihan_sadewa
- Tabel daftar di-refresh dan total dihitung ulang

Cetak & Laporan

- Endpoint laporan periode (server side) dengan filter yang sama
- Template cetak PDF (Laravel Snappy atau DomPDF) dengan header institusi
- Rekap ringkas + detail transaksi

Keamanan & Audit

- Auth JWT/session; role-based access (kasir/keuangan/admin)
- Catat aksi: simpan, hapus, cetak (user, waktu, IP)
- Validasi server-side; sanitasi keterangan/keperluan

Reliabilitas & Performa

- Transaksi DB untuk konsistensi
- Queue untuk posting jurnal jika beban tinggi
- Indeks pada tanggal, kode_kategori, nip
- Pagination & server-side filtering

Observability

- Logging terstruktur (request-id, no_bukti)
- Metrics: jumlah transaksi, latensi simpan/hapus, error rate
- Alerting untuk mismatch jurnal (debit ≠ kredit)

Rencana Implementasi Bertahap

1) Migrations & Model (pemasukan_lain, kategori, jurnal, tagihan_sadewa)
2) Service & Repository pattern untuk transaksi
3) Endpoint API (simpan/hapus/list)
4) UI React: form & daftar dengan Tailwind + Motion
5) Cetak laporan periode
6) Role & audit trail
7) Queue & hardening (retry, idempotensi no_masuk)

Catatan Pemetaan dari Modul Lama

- Tampjurnal di Java berfungsi sebagai buffer; di Laravel bisa diganti langsung ke detail_jurnal dalam satu transaksi (atau Redis bila ingin buffer sementara).
- jur.simpanJurnal → JournalService::commit(no_masuk, entries)
- tagihan_sadewa: tetap, tetapi diselaraskan dengan aturan bisnis baru (status "Sudah" jika jurnal sukses)

