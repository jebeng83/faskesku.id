# Ringkasan Modul IGD (DlgIGD.java)

- Lokasi sumber: [DlgIGD.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java)
- Deskripsi singkat: dialog Swing untuk manajemen IGD (Instalasi Gawat Darurat) mencakup registrasi, penelusuran data, integrasi BPJS/rujukan, akses rekam medis, permintaan layanan penunjang, keuangan, dan pencetakan.

## Tanggung Jawab Utama
- Registrasi pasien IGD, termasuk dokter dituju, penanggung jawab, jenis bayar, status daftar, dan biaya registrasi.
- Penelusuran dan filter data kunjungan IGD berdasarkan periode tanggal dan kata kunci.
- Integrasi ke puluhan form rekam medis (penilaian awal, monitor, skrining, edukasi, operasi, persalinan, hemodialisa, dsb.).
- Bridging eksternal: BPJS (SEP, PRB, SPRI, Surat Kontrol), ICare, INACBG, Inhealth, PCare, Sisrute.
- Permintaan layanan penunjang: laboratorium, radiologi, ranap, informasi obat/farmasi.
- Fitur keuangan: billing rawat jalan/parsial, lihat piutang; validasi closing tagihan sebelumnya.
- Pencetakan tracer/berkas dengan kendali printer ESC/P (font, bold, condensed, spacing, feed, margin).

## Struktur Data & Tabel
- Tabel utama di UI: 21 kolom menampilkan status kunjungan IGD.
- Query utama memuat data dari reg_periksa, dokter, pasien, poliklinik, penjab, dibatasi poliklinik IGDK dan rentang tanggal.
- Lihat implementasi muat data di method [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12593-L12674).

## Alur Kerja Kunci
- Inisialisasi: initComponents → initIGD → setup tabel/kolom, input bounds, listener pencarian, timer jam.
- Penentuan jam registrasi menggunakan [jam](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12716-L12768) dengan Timer interval 1 detik.
- Pemilihan pasien via DlgPasien, lalu validasi catatan/tagihan dan set field pasien dengan [isPas](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12770-L12802) dan [isCekPasien](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12804-L12857).
- Toggle form input (expand/collapse) dengan [isForm](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12868-L12879).
- Aksi simpan registrasi melalui handler [BtnSimpanActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L5131-L5240) dan refresh data dengan [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12593-L12674).

## Validasi & Aturan
- Saat validasiregistrasi aktif: pasien dengan status bayar “Belum Bayar” pada kunjungan sebelumnya diblokir registrasi (minta closing ke kasir).
- Saat validasicatatan aktif: jika ada catatan pasien, dialog catatan ditampilkan sebelum melanjutkan.
- Batasan input diterapkan via fungsi batasInput (panjang karakter tiap field).

## Integrasi & Menu Terkait
- Rekam medis: puluhan komponen RM* (penilaian awal IGD, triase IGD, checklist anestesi, skrining, monitoring, edukasi, operasi, dll.).
- Bridging: BPJS (SEP/PRB/SPRI/Surat Kontrol), ICare, INACBG, Inhealth, PCare, Sisrute.
- Penunjang: DlgPermintaanLaboratorium, DlgPermintaanRadiologi, DlgPermintaanRanap, DlgPermintaanPelayananInformasiObat.
- Keuangan: DlgBilingRalan, DlgBilingParsialRalan, DlgLhtPiutang.

## Pencetakan
- Kendali printer dot-matrix menggunakan ESC/P: pengaturan bold, italic, condensed, ukuran font (5–12 CPI), tinggi font, line spacing, form feed, margin unit.
- Variabel kontrol printing: BOLD_ON/OFF, CONDENSED_ON/OFF, SIZE_*_CPI, SPACING_* dll.

## Catatan Implementasi
- Koneksi DB melalui koneksiDB.condb(), utilitas query via sekuel, validasi via validasi.
- Render tabel menggunakan WarnaTable untuk warna baris/sel.
- Pengambilan data pasien (alamat lengkap, penjamin, umur dalam Th/Bl/Hr) mencakup join kelurahan/kecamatan/kabupaten.
- Rute poliklinik IGD di-hardcode sebagai ‘IGDK’ dalam filter query.

## Referensi Kode
- Muat data: [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12593-L12674)
- Jam registrasi: [jam](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12716-L12768)
- Validasi pasien: [isPas](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12770-L12802)
- Detail pasien: [isCekPasien](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12804-L12857)
- Toggle form: [isForm](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12868-L12879)
- Simpan registrasi: [BtnSimpanActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L5131-L5240)

