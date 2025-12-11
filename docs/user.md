 # Panduan User (Legacy Desktop Java)
 
 Dokumen ini merangkum cara kerja modul user berbasis Swing/Java di aplikasi legacy, serta rekomendasi pengembangan lanjutan (termasuk arah integrasi ke web).
 
 Ringkasan cepat:
 - Pembuatan user dilakukan di DlgUser (BtnSimpan) dengan penyimpanan id_user dan password menggunakan AES_ENCRYPT.
 - Hak akses disimpan sebagai ratusan kolom boolean di tabel user, default false saat user dibuat.
 - Pengaturan hak akses dilakukan lewat DlgUpdateUser; hak akses ditampilkan sebagai daftar modul yang bisa dicentang dan disimpan.
 - Tersedia fitur Copy Hak Akses untuk menyalin hak akses dari satu user ke user lain.
 
 1. Komponen dan peran
 - DlgUser.java/.form
   - Dialog utama manajemen user: buat, edit, hapus, cari, cetak, copy hak akses, buka pengaturan detail user.
   - Field utama:
     - TKd: ID User (username). Biasanya diambil dari dialog dokter/petugas.
     - TNmUser: Nama user (ditampilkan di tabel, diisi dari master dokter/petugas).
     - TPass: Password (plaintext di UI; disimpan terenkripsi di DB).
     - Jabatan: Jabatan/posisi dari entitas yang dipilih (dokter/petugas), untuk konteks tampilan.
   - Tabel tbUser: baris berisi satu user, kolom-kolom sesudah “Password” adalah flag boolean untuk tiap modul/fitur (misal registrasi, tindakan ralan, billing, BPJS, bridging, laporan, grafik, dsb).
   - Aksi penting:
     - BtnSimpanActionPerformed: membuat user baru di tabel user, menyetel semua hak akses ke false.
     - BtnEditActionPerformed: memperbarui id_user, password, dan seluruh kolom hak akses untuk baris yang dipilih.
     - BtnHapusActionPerformed: menghapus user berdasarkan id_user terenkripsi.
     - MnCopyHakAksesActionPerformed: menandai user sumber untuk proses “copy”.
     - tbUserMouseClicked: saat copy aktif, menyalin semua hak akses dari user sumber ke user tujuan.
     - MnSetUserActionPerformed: membuka DlgUpdateUser untuk mengatur hak akses via daftar modul.
     - Fungsi pencarian dan cetak (tampil, TCari, BtnCari, BtnAll, BtnPrint).
 
 - DlgUpdateUser.java/.form
   - Dialog pengaturan hak akses per user (per modul). Dipanggil dari DlgUser (menu “Set User”).
   - Metode isUser(User, Nama, Password): mengisi identitas user di header dan menampilkan daftar modul/hak akses milik user tersebut.
   - Tabel tbUser: menampilkan baris-baris modul dengan kolom centang (boolean) untuk akses.
   - Aksi penting:
     - BtnSimpanActionPerformed: memanggil Simpan(), Simpan2(), Simpan3() untuk menyimpan perubahan hak akses (UPDATE tabel user per kolom yang relevan).
     - ppSemua/ppBersihkan: bantuan untuk mencentang atau mengosongkan seluruh baris sekaligus, termasuk varian untuk kolom tertentu.
     - Pencarian TCari: memfilter daftar modul berdasarkan kata kunci.
 
 2. Penyimpanan data dan enkripsi
 - Tabel user (diakses lewat kelas utilitas fungsi.sekuel):
   - id_user disimpan dengan AES_ENCRYPT(TKd, 'nur').
   - password disimpan dengan AES_ENCRYPT(TPass, 'windi').
   - Ratusan kolom boolean untuk hak akses (contoh: jadwal_praktek, registrasi, tindakan_ralan, kamar_inap, permintaan_lab, bpjs_cek_sep, dsb).
 - Konsekuensi desain saat ini:
   - id_user dan password harus selalu di-query menggunakan ekspresi AES_ENCRYPT di WHERE clause. Contoh: WHERE id_user = AES_ENCRYPT(?, 'nur').
   - Nama user (TNmUser) dan Jabatan ditampilkan di UI dari master dokter/petugas. Kolom-kolom ini bukan sumber kebenaran di tabel user (tabel user fokus pada kredensial dan hak akses).
   - Default hak akses saat pembuatan user adalah false (semua tidak aktif).
 
 3. Alur kerja membuat user (Desktop Java)
 - Buka DlgUser.
 - Isi TKd (ID User) dan TNmUser (Nama User). Umumnya gunakan tombol:
   - BtnSeek (dokter) dan BtnSeek1 (petugas) untuk memilih dari master sehingga TKd, TNmUser, dan Jabatan terisi otomatis.
 - Isi TPass (password).
 - Klik Simpan:
   - Sistem menjalankan INSERT ke tabel user:
     - id_user terenkripsi (AES_ENCRYPT dengan kunci 'nur').
     - password terenkripsi (AES_ENCRYPT dengan kunci 'windi').
     - seluruh kolom hak akses disetel ke 'false'.
 - Setelah user masuk ke daftar, atur hak akses detail:
   - Klik menu “Set User” untuk membuka DlgUpdateUser.
   - Cari modul yang diinginkan dengan TCari (opsional).
   - Centang modul-modul yang harus diaktifkan.
   - Klik Simpan (menyimpan perubahan via Simpan(), Simpan2(), Simpan3()).
 
 4. Mengedit atau menghapus user
 - Edit:
   - Pilih baris user di tbUser.
   - Ubah TKd atau TPass (opsional).
   - Klik Edit: sistem menjalankan UPDATE yang menulis id_user, password, dan seluruh hak akses sesuai nilai di tabel UI.
 - Hapus:
   - Pilih user (TPass tidak kosong).
   - Klik Hapus: sistem menjalankan DELETE FROM user WHERE id_user = AES_ENCRYPT(TKd, 'nur').
 
 5. Copy Hak Akses
 - Di DlgUser:
   - Pilih user sumber, klik “Copy Hak Akses”.
   - Pilih user tujuan di tabel.
   - Konfirmasi dialog, sistem menyalin semua kolom hak akses dari user sumber ke user tujuan (UPDATE besar terhadap seluruh flag).
 - Catatan:
   - Proses ini mempermudah provisioning untuk user baru yang membutuhkan template hak akses yang sama seperti user lain.
 
 6. Pencarian dan laporan
 - Pencarian:
   - TCari + BtnCari untuk memfilter daftar user.
   - BtnAll untuk mengosongkan filter dan menampilkan semua.
 - Laporan:
   - BtnPrintActionPerformed di DlgUser melakukan generate laporan user dengan menyimpan data sementara lalu menggunakan Valid.MyReportqry (JasperReports).
 
 7. Menambah modul/hak akses baru (di legacy)
 - Tambahkan kolom boolean baru di tabel user.
 - DlgUser:
   - Tambahkan label kolom pada array header tabMode (bagian initComponents).
   - Pastikan kolom baru ikut tersisip “false” di INSERT default pada BtnSimpanActionPerformed.
   - Lengkapi logika BtnEditActionPerformed untuk mengikutsertakan kolom tersebut.
   - Lengkapi logika copy hak akses (tbUserMouseClicked) agar kolom ikut tersalin.
 - DlgUpdateUser:
   - Deklarasikan boolean untuk modul baru.
   - Tambahkan baris modul di metode tampil(User) agar muncul di tbUser.
   - Tambahkan UPDATE di Simpan() / Simpan2() / Simpan3() untuk menulis kolom baru tersebut.
 
 8. Catatan keamanan
 - Password disimpan dengan AES_ENCRYPT, bukan password hashing. Untuk keamanan modern, sangat disarankan:
   - Ganti AES_ENCRYPT untuk password dengan hashing adaptif seperti BCrypt/Argon2.
   - Simpan username/id_user dalam plaintext terstandardisasi (unik), bukan AES_ENCRYPT, supaya index dan join lebih sehat.
   - Simpan kunci enkripsi (bila tetap dibutuhkan) di konfigurasi lingkungan, bukan hard-coded di source.
 
 9. Rekomendasi arsitektur pengembangan lanjutan (web)
 - Migrasi ke RBAC (Role-Based Access Control):
   - users: id, username, password_hash, doctor_id/petugas_id (opsional), job_title, is_active, created_at.
   - roles: id, name, description.
   - permissions: id, code, name, description.
   - role_permissions: role_id, permission_id.
   - user_roles: user_id, role_id.
   - user_permissions (opsional untuk override).
   - Keuntungan: tidak perlu ratusan kolom di tabel users; hak akses menjadi entitas yang fleksibel.
 - Pola layanan web (contoh endpoint):
   - POST /api/users: buat user baru, password di-hash.
   - GET /api/users: list/filter user.
   - GET /api/users/{id}: detail user.
   - PUT /api/users/{id}: update profil dasar.
   - DELETE /api/users/{id}: nonaktifkan atau hapus.
   - GET /api/users/{id}/permissions: daftar permission user.
   - PUT /api/users/{id}/permissions: set langsung (opsional).
   - POST /api/users/{id}/roles: assign role ke user.
   - DELETE /api/users/{id}/roles/{roleId}: cabut role.
   - POST /api/users/{id}/copy-permissions: salin hak akses dari user lain.
 - Single source of truth:
   - Web service menjadi pusat manajemen user/hak akses.
   - Aplikasi desktop legacy mengambil hak akses via API (bila masih dipertahankan).
 - Observabilitas dan audit:
   - Log perubahan hak akses per user (who, when, what).
   - Audit trail untuk compliance.
 
 10. Strategi migrasi bertahap
 - Fase 1: Hardening keamanan di legacy
   - Ganti penyimpanan password ke BCrypt (paralel kolom baru, migrasi per login).
   - Dokumentasikan peta hak akses yang paling sering dipakai (untuk definisi role awal).
 - Fase 2: Tambahkan lapisan API
   - Buat service user dan permission di backend web.
   - Sinkronkan hak akses dari legacy ke service baru (one-way).
 - Fase 3: RBAC penuh
   - Pindahkan manajemen hak akses ke tabel roles/permissions.
   - Legacy hanya membaca keputusan akses (allow/deny) dari API.
 
 11. Tips operasional sehari-hari (legacy)
 - Gunakan fitur “Copy Hak Akses” untuk membuat user baru dengan cepat.
 - Setelah membuat user, segera buka “Set User” dan aktifkan modul yang diperlukan saja.
 - Manfaatkan TCari di DlgUpdateUser untuk memfilter modul saat mengatur hak akses.
 - Lakukan pencetakan laporan berkala untuk memverifikasi siapa yang memiliki akses ke modul-modul sensitif.
 
 12. Istilah tag modul di UI
 - Banyak label modul diawali tag seperti [A], [J], [K], [T], [I], [D], [E], [G], [H], dll.
 - Tag ini menunjukkan kelompok/jenis modul (administrasi, jurnal, keuangan, tarif, inventaris, dsb). Tidak mempengaruhi logika penyimpanan; semua tetap kolom boolean di tabel user.
 
 13. FAQ singkat
 - Bisakah nama user diubah?
   - Nama yang ditampilkan di DlgUser mengambil referensi dari master dokter/petugas. Identitas otentikasi adalah id_user (TKd) dan password. Perubahan nama dilakukan di modul master terkait.
 - Apakah hak akses default bisa diatur?
   - Saat ini default di-hardcode sebagai false di BtnSimpanActionPerformed. Dapat diubah bila diperlukan (disarankan pindahkan ke konfigurasi).
 - Apakah proses “copy hak akses” juga mengubah password?
   - Implementasi copy saat ini melakukan UPDATE besar; pastikan operasional mengikuti kebijakan internal. Untuk best practice, salin hanya flag hak akses, jangan mengganti password target.
 
 14. Referensi lokasi kode
 - DlgUser.java: BtnSimpanActionPerformed, BtnEditActionPerformed, BtnHapusActionPerformed, MnCopyHakAksesActionPerformed, MnSetUserActionPerformed, tbUserMouseClicked, fungsi pencarian dan cetak.
 - DlgUpdateUser.java: isUser(), tampil(User), Simpan(), Simpan2(), Simpan3(), ppSemua/ppBersihkan, TCari.
 
 Catatan akhir:
 - Dokumen ini berfokus pada pemahaman desain yang ada agar tim dapat menjaga operasional sekaligus menyiapkan jalur migrasi ke arsitektur yang lebih modern dan aman.
 
