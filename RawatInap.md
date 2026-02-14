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

