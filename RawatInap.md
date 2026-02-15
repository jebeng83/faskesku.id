# Catatan Pengembangan: Rawat Inap

## Konteks
- Aplikasi Java desktop (SIMRS Khanza) mengelola rawat inap lewat dialog [DlgKamarInap.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java) yang memegang peran “orchestrator” untuk banyak proses ranap.
- Aplikasi web saat ini sudah punya listing ranap (Inertia/React) dan endpoint baca via [RawatInapController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/RawatInapController.php), tetapi belum punya modul operasional lengkap seperti check-in/out, pindah kamar, gabung ibu-bayi, dan billing ranap end-to-end.

## Ringkasan Peran DlgKamarInap (Java)
- Menampilkan daftar pasien ranap (aktif & historis) dengan filter tanggal/status dan pencarian, lewat query join `kamar_inap` + `reg_periksa` + `pasien` + `kamar` + `bangsal` + `dokter` + `penjab`.
- Menjalankan proses inti: check-in (masuk kamar), check-out (pulang), pindah kamar, gabung ranap (ibu-bayi), hapus data salah.
- Menjadi “hub” untuk membuka banyak sub-modul dari popup menu: billing ranap, pemberian obat, lab/radiologi, operasi, DPJP, berkas, BPJS bridging, dan ratusan form rekam medis.

## Data Model & Tabel yang Terlibat (dari kode Java)

## Tabel operasional utama
- `kamar_inap`: riwayat pemakaian kamar per `no_rawat`.
- `kamar`: master kamar + status okupansi (`ISI`/`KOSONG`).
- `bangsal`: master bangsal/ruangan.
- `reg_periksa`: registrasi pasien, termasuk `status_lanjut` (Ralan/Ranap) dan status bayar.
- `pasien`, `dokter`, `penjab`.

## Tabel pendukung yang terlihat digunakan/dirujuk
- `set_harga_kamar`: override tarif kamar per penjamin (`kd_pj`).
- `ranap_gabung`: relasi gabung ibu-bayi (`no_rawat` ibu, `no_rawat2` bayi).
- `dpjp_ranap`: filter/akses DPJP untuk daftar ranap (dipakai saat “kunci dokter ranap” aktif).
- Tabel lain muncul dari menu/aksi (indikatif scope modul ranap): `stok_obat_pasien`, `operasi`, `beri_obat_operasi`, `laporan_operasi`, dll.

## Alur Listing Ranap (tampil)
- Sumber utama: method [tampil()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19009-L19128).
- Filter mode:
- Mode aktif (`R1`): `kamar_inap.stts_pulang='-'`.
- Mode masuk rentang tanggal (`R2`): `kamar_inap.tgl_masuk between ...`.
- Mode keluar rentang tanggal (`R3`): `kamar_inap.tgl_keluar between ...`.
- Filter tambahan:
- `status_bayar` dari `reg_periksa`.
- Optional filter bangsal.
- Optional filter text (`TCari`) yang meng-OR banyak kolom (no_rawat, no_rm, nama, alamat, kamar, bangsal, diagnosa, tgl, dokter, penjab, agama).
- DPJP-locking:
- Jika “kunci dokter ranap” aktif, query ditambah join `dpjp_ranap` dan filter `dpjp_ranap.kd_dokter=...`.
- Ranap gabung (ibu-bayi):
- Setelah publish baris ibu, code melakukan query tambahan ke `ranap_gabung` untuk menambahkan 1 baris “bayi” di bawahnya.
- Baris bayi sengaja memakai `no_rawat` kosong (`""`) agar tampil sebagai “sub-row”, serta tarif/total dikalikan `persenbayi/100`.

## Alur Check-in (Masuk/Check In)
- Trigger: tombol Simpan saat `norawat` editable, lihat [BtnSimpanActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L5834-L5865).
- Validasi inti:
- pasien (`TPasien`) harus ada.
- kamar dipilih (`TKdBngsal`/`kdkamar`).
- diagnosa awal wajib.
- kamar harus berstatus `KOSONG`.
- Side effect DB yang dilakukan:
- Insert `kamar_inap` (tgl/jam masuk, tgl/jam keluar default `0000-00-00`/`00:00:00`, `stts_pulang='-'`).
- Update `reg_periksa.status_lanjut='Ranap'`.
- Update `kamar.status='ISI'`.

## Alur Check-out (Pulang/Check Out)
- Trigger: tombol Simpan saat `norawat` tidak editable, lihat [BtnSimpanActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L5866-L5915).
- Validasi inti:
- status pulang harus dipilih.
- diagnosa akhir wajib.
- Side effect DB yang dilakukan:
- Update row `kamar_inap` yang spesifik (key: `no_rawat`, `kd_kamar`, `tgl_masuk`, `jam_masuk`) untuk mengisi:
- `tgl_keluar`, `jam_keluar`
- `stts_pulang`
- `diagnosa_akhir`
- `lama`, `trf_kamar`, `ttl_biaya`
- Set `kamar.status='KOSONG'` untuk kamar terakhir.
- Side effect proses lain berdasar status:
- Jika `stts_pulang='Meninggal'` membuka dialog input kematian.
- Jika `stts_pulang='Rujuk'` membuka dialog rujukan.

## Penentuan Tarif Kamar (per penjamin)
- Method [isKmr()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19183-L19283).
- Logika:
- Ambil `kd_pj` dari `reg_periksa`.
- Ambil tarif default dari `kamar.trf_kamar`.
- Jika ada override di `set_harga_kamar` (per `kd_kamar` + `kd_pj`), gunakan tarif tersebut.

## Perhitungan Total Biaya Kamar
- Method [isjml()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19285-L19299).
- Rumus: `ttl_biaya = lama * tarif`.

## Pindah Kamar
- Trigger: tombol simpan pada window pindah kamar, lihat [BtnSimpanpindahActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L7208-L7368).
- Konsep penting: pindah kamar itu bukan sekadar mengganti `kd_kamar`, tapi juga mengatur histori `kamar_inap` dan status okupansi kamar.
- Mode yang terlihat dari kode (radio `Rganti1..4`):
- Mode “ganti dengan delete lama” (`Rganti1`): insert record baru, set kamar baru `ISI`, lalu delete record lama, set kamar lama `KOSONG`.
- Mode “update record yang sama” (`Rganti2`): update `kamar_inap.kd_kamar` + biaya, set kamar baru `ISI`, set kamar lama `KOSONG`.
- Mode “tutup record lama & buat record baru” (`Rganti3`): update record lama (`tgl_keluar/jam_keluar`, `stts_pulang='Pindah Kamar'`), set kamar lama `KOSONG`, lalu insert record baru untuk kamar baru dan set `ISI`.
- Mode “tarif harian max saat pindah” (`Rganti4`): mirip `Rganti3`, tetapi `ttl_biaya` untuk masa sebelum pindah dihitung pakai tarif yang lebih tinggi (old vs new) untuk hari terakhir (indikasi aturan bisnis tertentu).

## Ranap Gabung (Ibu-Bayi)
- Trigger: klik pada tabel saat flag `gabungkan` aktif, lihat [tbKamInMouseClicked](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L6002-L6034).
- Side effect DB yang dilakukan saat confirm:
- Insert `ranap_gabung(no_rawat, no_rawat2)`.
- Update `kamar_inap` untuk rawat bayi: `stts_pulang='Pindah Kamar'` dan kemudian `no_rawat` bayi dipindah menjadi `no_rawat` ibu.
- Set kamar yang digabung jadi `KOSONG`.
- Update `reg_periksa.status_lanjut='Ranap'`.
- Implikasi: konsep “gabung tagihan” dilakukan dengan menyatukan `no_rawat` sehingga banyak modul downstream (billing, obat, tindakan) otomatis mengacu ke satu `no_rawat`.

## Hapus Data Salah (Admin)
- Menu: [MnHapusDataSalahActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L7374-L7410).
- Guardrail utama:
- Tidak boleh jika “billing sudah terverifikasi” (`Sequel.cariRegistrasi(no_rawat)>0`).
- Side effect DB yang dilakukan:
- Delete `kamar_inap` untuk key spesifik (no_rawat + kd_kamar + tgl/jam masuk).
- Set `kamar.status='KOSONG'`.
- Jika sudah tidak ada row `kamar_inap` untuk `no_rawat`, maka:
- `reg_periksa.status_lanjut='Ralan'`
- `reg_periksa.stts='Sudah'`

## Keterkaitan dengan Modul Rawat Inap Web (Laravel + React)
- Listing ranap web ada di [RawatInap/Index.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatInap/Index.jsx) dan sumber datanya dari [RawatInapController::index](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/RawatInapController.php#L15-L109).
- Kemiripan utama:
- Sama-sama basisnya join `reg_periksa` + `kamar_inap`.
- Sama-sama sudah ada konsep `ranap_gabung` untuk menentukan role Ibu/Bayi (di web: `gabung_role` dan `gabung_pair_rawat`).
- Perbedaan/gap penting dibanding Java:
- Java menampilkan label kamar sebagai gabungan `kd_kamar + nm_bangsal`, sedangkan web saat ini hanya menampilkan `kd_kamar` sebagai “kamar”.
- Java menambahkan baris bayi sebagai sub-row dengan tarif persentase (`persenbayi`). Web belum punya konsep row tambahan & aturan persentase itu.
- Web belum mengimplementasikan operasi inti (create/store/update/destroy) untuk check-in/out, pindah kamar, gabung, hapus data salah.
- Java melakukan side effect pada `kamar.status` (ISI/KOSONG) dan `reg_periksa.status_lanjut`. Web belum.
- Layar lanjutan/canvas sudah ada: [RawatInapController::lanjutan](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/RawatInapController.php#L153-L216) dan [RawatInapController::canvas](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/RawatInapController.php#L218-L306).

## Rekomendasi Implementasi Lanjutan (Backlog Arsitektural)

## 1) Model & Relasi Eloquent yang dibutuhkan
- Buat model `KamarInap` dan relasi di `RegPeriksa` (saat ini relasi `kamarInap()` masih dikomentari di [RegPeriksa.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Models/RegPeriksa.php#L93-L111)).
- Buat model `RanapGabung` (untuk query gabung ibu-bayi secara eksplisit).
- Tambahkan model `Kamar` dan relasi ke `Bangsal` jika belum ada, agar UI web bisa menampilkan label kamar seperti di Java.

## 2) Endpoint Operasional yang menyamai Java
- Check-in ranap (setara insert `kamar_inap` + update `kamar` + update `reg_periksa`).
- Check-out ranap (update `kamar_inap` + set `kamar` kosong + validasi diagnosa akhir + status pulang).
- Pindah kamar (rekomendasi default: pola `Rganti3` agar histori rapi).
- Gabung ranap ibu-bayi (mencatat `ranap_gabung` dan menentukan strategi konsolidasi `no_rawat` secara aman).
- Hapus data salah (hanya role tertentu, dan harus ada guardrail “belum terverifikasi billing”).

## 3) Transaksi & Konsistensi Data (penting saat migrasi ke web)
- Semua operasi yang menyentuh `kamar_inap`, `kamar.status`, dan `reg_periksa.status_lanjut` sebaiknya dalam 1 transaksi DB.
- Perlu mekanisme pencegahan double-booking kamar:
- Validasi status kamar di awal.
- Lock row kamar saat update status (misalnya `SELECT ... FOR UPDATE`) agar dua user tidak mengisi kamar yang sama.

## 4) Billing Rawat Inap
- Dari sisi blueprint, ranap membutuhkan:
- Preview billing yang menggabungkan kamar + tindakan ranap (`rawat_inap_dr`) + obat + lab + radiologi.
- Snapshot ke tabel `billing`.
- Penerbitan `nota_inap`.
- Referensi status implementasi saat ini ada di [VERIFIKASI_ALUR_BILLING_END_TO_END.md](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/docs/VERIFIKASI_ALUR_BILLING_END_TO_END.md#L202-L258) dan [database.md](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/docs/database.md#L455-L490).

### Referensi Java: DlgBilingRanap
- Source utama: [DlgBilingRanap.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L67-L7761).
- Fungsi inti modul: kasir/billing ranap end-to-end (preview tagihan → cetak nota/kuitansi → snapshot `billing` + `nota_inap` → posting jurnal + piutang).
- Karakteristik penting: 1 layar menggabungkan agregasi layanan (kamar, tindakan, obat, operasi, dll) + mekanisme pembayaran multi-metode + piutang, dengan guardrail “data billing terverifikasi tidak boleh dihapus”.

### Mode Operasi (Preview vs Sudah Tersimpan)
- Penentu mode: `count(billing.no_rawat)` untuk `no_rawat` yang dipilih, lihat [isRawat()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L4968-L5103).
- Mode preview (`i<=0`):
  - Menghitung ulang item billing dari tabel operasional, lalu mengisi grid billing.
  - Deposit diambil dari `deposit` (bukan `nota_inap`), lihat [isRawat()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5028-L5063).
  - Memuat draft “akun bayar” dan “akun piutang” (pilihan metode pembayaran/piutang).
- Mode sudah tersimpan (`i>0`):
  - Memuat snapshot dari tabel `billing` (urut `noindex`) dan timestamp dari `nota_inap`, lihat [isRawat()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5063-L5098).
  - Deposit diambil dari `nota_inap.Uang_Muka`.
  - Memuat `detail_nota_inap` dan `detail_piutang_pasien` sebagai detail pembayaran/piutang yang sudah tersimpan.

### Sumber Data & Komponen Biaya (yang membentuk isi `billing`)
#### 1) Header kunjungan, deposit, registrasi
- Identitas pasien: `reg_periksa` → `pasien` (nama, jk, tgl lahir), lihat [isRawat()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L4988-L5026).
- Registrasi dan metadata rawat: query `reg_periksa` + `kamar_inap` untuk tanggal masuk/keluar dan lama, lalu menambahkan baris “No.Nota”, “Bangsal/Kamar”, “Registrasi”, lihat [prosesCariReg()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5136-L5318).
- Flag tampilan “administrasi/registrasi” di billing: `set_nota.tampilkan_administrasi_di_billingranap`, dibaca saat constructor, lihat [DlgBilingRanap()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L554-L665).

#### 2) Kamar inap & biaya harian
- Data kamar (timeline) dari `kamar_inap` + `kamar` + `bangsal`, termasuk fallback `tgl_keluar/jam_keluar` jika masih `0000-00-00`/`00:00:00`, lihat deklarasi SQL [sqlpskamarin](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L111-L118) dan implementasi [prosesCariKamar()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5529-L5686).
- Biaya kamar sekali: `biaya_sekali` per `kd_kamar`.
- Biaya kamar harian: `biaya_harian` per `kd_kamar`, dikali “lama”.
- Tambahan/potongan per item (tamkur): memakai `temporary_tambahan_potongan` sebagai override granular per nama item + status kategori (mis. “Kamar”, “Harian”), lihat penggunaan `sqlpstamkur` di [prosesCariKamar()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5538-L5658).
- Ranap gabung ibu-bayi: jika ada `norawatbayi` dan `persenbayi>0`, biaya kamar bayi dihitung persentase dari tarif ibu, lihat [prosesCariKamar()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5558-L5571).

#### 3) Tindakan (Ralan + Ranap) berbasis kategori perawatan
- Loop kategori: `kategori_perawatan` menjadi “section” di rincian biaya, lihat [prosesCariTindakan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L6019-L6467).
- Sumber tabel tindakan:
  - Ralan: `rawat_jl_dr`, `rawat_jl_drpr`, `rawat_jl_pr`.
  - Ranap: `rawat_inap_dr`, `rawat_inap_drpr`, `rawat_inap_pr`.
- Filter scope tindakan:
  - Checkbox “Ralan/Ranap” mempengaruhi query `status like ?` (untuk operasi/obat) dan memutuskan blok agregasi tindakan yang ditampilkan.
- Mode rincian dokter (tarif vs total):
  - `set_nota.rinciandokterranap=Yes` mengubah cara hitung: menampilkan tarif per dokter + akumulasi BHP/material/jasa sarpras sebagai baris terpisah (indikasi pembagian komponen biaya), lihat [prosesCariTindakan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L6089-L6136).

#### 4) Pemeriksaan Laborat & Radiologi
- Laborat:
  - Sumber tabel: `periksa_lab` + `jns_perawatan_lab`, dengan tambahan komponen item dari `detail_periksa_lab`, lihat [prosesCariTindakan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L6329-L6393).
  - Cara hitung: `periksa_lab.biaya` dikali jumlah tindakan + ditambah total `detail_periksa_lab.biaya_item` per jenis perawatan.
  - Filter status: mengikuti checkbox “Ralan/Ranap” (`periksa_lab.status like ?`).
- Radiologi:
  - Sumber tabel: `periksa_radiologi` + `jns_perawatan_radiologi`, lihat [prosesCariTindakan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L6395-L6458).
  - Mendukung tambahan/potongan per item via `temporary_tambahan_potongan` dengan status “Radiologi”.
  - Filter status: mengikuti checkbox “Ralan/Ranap” (`periksa_radiologi.status like ?`).

#### 5) Operasi
- Sumber tabel: `operasi` + `paket_operasi`, lihat [sqlpsoperasi](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L184-L200) dan implementasi [prosesCariOperasi()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L6470-L6630).
- Mode rincian operasi:
  - `set_nota.rincianoperasi=Yes` memecah operasi menjadi komponen biaya (operator/anestesi/akomodasi/dll) dan menjumlahkan `operasi.biaya` sebagai total.

#### 6) Obat & BHP + Retur + PPN
- Sumber utama:
  - Tagihan obat langsung: `tagihan_obat_langsung` (baris “Obat & BHP Langsung”), lihat [prosesCariObat()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5325-L5350).
  - Obat operasi: `beri_obat_operasi` + `obatbhp_ok`, lihat [sqlpsobatoperasi](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L100-L105) dan [prosesCariObat()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5366-L5403).
  - Pemberian obat: `detail_pemberian_obat` + `databarang` + `jenis` (menggabungkan total + embalase/tuslah), lihat [prosesCariObat()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5411-L5459).
  - Retur obat: `returjual` + `detreturjual` + `databarang` (nilai negatif), lihat [sqlpsreturobat](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L105-L110) dan [prosesCariObat()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5467-L5511).
- PPN obat:
  - Jika `set_nota.tampilkan_ppnobat_ranap=Yes`, sistem menambah baris “PPN Obat” (11%) berdasarkan (total obat + retur), lihat [prosesCariObat()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5513-L5519).
  - Akun PPN Keluaran diambil dari `set_akun.PPN_Keluaran` (fallback: akun obat), lihat [DlgBilingRanap()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L655-L660).

#### 7) Resep pulang
- Sumber tabel: `resep_pulang` + `databarang`, lihat [prosesResepPulang()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5688-L5744).
- Mendukung tambahan/potongan per item via `temporary_tambahan_potongan` dengan status “Resep Pulang”.

#### 8) Tambahan & potongan biaya
- Sumber tabel:
  - Tambahan: `tambahan_biaya`, lihat [prosesCariTambahan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L6632-L6668).
  - Potongan: `pengurangan_biaya`, lihat [prosesCariPotongan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L6670-L6690).
- Catatan penting: saat snapshot `billing` disimpan, sistem juga membuat sinkronisasi “tambahan/potongan per item” berbasis nilai kolom “Tambahan” pada baris billing (positif → `tambahan_biaya`, negatif → `pengurangan_biaya`), lihat [isSimpan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L7330-L7389).

#### 9) Service charge (biaya service ranap)
- Sumber konfigurasi: `set_service_ranap` atau `set_service_ranap_piutang` tergantung centang piutang, lihat [prosesCariService()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5746-L5829).
- Cara hitung: persen `set_service_*.besar/100` dikali subtotal kategori yang di-enable (`laborat`, `radiologi`, `obat`, `kamar`, dst), lalu di-rounding, kemudian ditambahkan sebagai baris “Service”.

### Tabel DB kunci (yang dipakai langsung oleh Java)
- Snapshot & invoice: `nota_inap`, `billing`.
- Detail pembayaran: `detail_nota_inap`, `akun_bayar`.
- Piutang: `piutang_pasien`, `detail_piutang_pasien`, `akun_piutang`.
- Sumber agregasi layanan: `kamar_inap`, `rawat_inap_*`, `rawat_jl_*`, `periksa_lab`, `detail_periksa_lab`, `periksa_radiologi`, `operasi`, `resep_pulang`, `tambahan_biaya`, `pengurangan_biaya`, `tagihan_obat_langsung`, `detail_pemberian_obat`, `returjual`, `detreturjual`, `beri_obat_operasi`.
- Konfigurasi & mapping akun: `set_nota`, `set_service_ranap`, `set_service_ranap_piutang`, `set_akun`, `set_akun_ranap`, `set_akun_ranap2`.
- Utility proses cetak & penyesuaian: `temporary_bayar_ranap`, `temporary_tambahan_potongan`, `tampjurnal`.

### Snapshot & Posting Akuntansi
#### 1) Penerbitan nota
- Nota ranap dibuat di `nota_inap` (no_rawat, no_nota, tanggal, jam, uang muka), lihat [isSimpan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L7273-L7324).
- Penomoran nota: `Valid.autoNomer3(..., YYYY/MM/DD/RI####)`, pola suffix `/RI` + 4 digit.

#### 2) Snapshot detail billing
- Sistem melakukan snapshot seluruh grid ke tabel `billing` baris-per-baris, lihat insert [sqlpsbiling](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L202-L210) dan loop insert di [isSimpan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L7330-L7390).
- Konsep kategori di kolom `billing.status` dipakai untuk rekap: “Obat”, “Operasi”, “Kamar”, “Registrasi”, “Service”, dll, dihitung oleh [isHitung()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L5831-L5904).

#### 3) Pembayaran multi-metode + piutang
- Detail pembayaran disimpan ke `detail_nota_inap` (akun bayar + nominal + PPN) dan menjadi basis jurnal, lihat [isSimpan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L7392-L7561).
- Detail piutang disimpan ke `detail_piutang_pasien`, dan jika ada piutang maka dibuat juga `piutang_pasien`, lihat [isSimpan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L7562-L7717).
- Integrasi tagihan eksternal:
  - `tagihan_sadewa` dicatat saat pelunasan/piutang (status “Sudah/Belum”), lihat [isSimpan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L7705-L7729).
  - Host-to-host bank (Jateng/Papua/Jabar/Mandiri) dan BRIVA dibuat berdasarkan akun bayar terpilih, lihat [isSimpan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L7412-L7555).

#### 4) Posting jurnal (tampjurnal → jurnal/detailjurnal)
- Pola: hapus `tampjurnal`, isi pasangan akun (Debet/Kredit) untuk pembayaran + piutang + kategori pendapatan + PPN + deposit + retur, lalu panggil `Jurnal.simpanJurnal(...)`, lihat [isSimpan()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L7392-L7733).
- Mapping rekening ranap diambil dari `set_akun_ranap` dan `set_akun_ranap2`, dibaca saat constructor, lihat [DlgBilingRanap()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L596-L665).

### Cetak Nota/Kwitansi (Java → Web)
- Java membuat dataset cetak ke `temporary_bayar_ranap` untuk item yang dicentang pada grid, lalu memanggil report PHP via URL (LaporanBilling2/3/4/8/11), lihat [BtnNotaActionPerformed()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L3868-L4054).
- Implikasi implementasi web:
  - Web perlu endpoint “render invoice” (HTML/PDF) yang setara dengan variasi Nota 1/Nota 2/Kwitansi/Kwitansi Piutang.
  - Web perlu meniru pilihan “item yang dicentang” (subset item) bila ingin parity fitur.

### Guardrail “Terverifikasi”
- Banyak aksi edit/hapus diblok bila billing sudah terverifikasi, memakai `Sequel.cariRegistrasi(no_rawat)>0` (konsep: sudah diposting/berkaitan dengan transaksi yang tidak boleh diubah), contoh pemakaian ada di beberapa menu seperti potongan, ubah lama inap, input obat, lihat potongan kode di [BtnSimpanActionPerformed()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L3578-L3640) dan [MnPotonganActionPerformed()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgBilingRanap.java#L3553-L3564).

### Rekomendasi Implementasi di Web (Parity dengan Java)
- Konsep API yang disarankan (mengikuti pola yang sudah dipakai di modul billing web):
  - Endpoint preview billing ranap yang mengagregasi tabel operasional (tanpa menulis `billing`).
  - Endpoint snapshot billing ranap yang melakukan transaksi atomik: buat `nota_inap` → insert `billing` → simpan detail bayar/piutang → posting jurnal → update `reg_periksa.status_bayar`.
  - Endpoint cetak invoice yang membaca dari snapshot `billing` + `nota_inap` (lebih stabil) dan tidak dari tabel operasional.
- Parity fitur yang perlu diputuskan sejak awal:
  - Apakah mendukung multi-metode bayar seperti Java (lebih dari 1 akun bayar).
  - Apakah mendukung service charge berbasis konfigurasi kategori seperti `set_service_ranap(_piutang)`.
  - Apakah mendukung PPN obat (11%) dan mapping akun PPN Keluaran.

## 5) Permission & Audit
- Java mengandalkan `akses.*` untuk enable/disable menu, lihat [isCek()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19385-L19610).
- Di web perlu pemetaan yang setara:
- Role-based permission untuk operasi check-in/out/pindah/hapus.
- Audit trail perubahan kamar (siapa, kapan, dari kamar apa ke kamar apa).

## 6) Penyeragaman Definisi “Status” di UI Web
- Di Java, “aktif dirawat” ditandai `kamar_inap.stts_pulang='-'` (bukan `tgl_keluar is null`).
- Di web saat ini filter “Pulang/Dirawat” masih campuran `tgl_keluar` dan `stts_pulang`.
- Untuk konsistensi dengan data Khanza, sebaiknya definisi status utama menuruti `stts_pulang`:
- Aktif: `stts_pulang='-'`.
- Pindah kamar: `stts_pulang='Pindah Kamar'` (historis, bukan discharge final).
- Discharge final: selain `'-'` dan selain `'Pindah Kamar'`.
