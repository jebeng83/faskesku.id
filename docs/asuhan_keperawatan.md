-- ===================== TABEL REFERENSI =====================

-- 1. Tabel Pasien (harus ada sebelum asuhan_keperawatan)
CREATE TABLE IF NOT EXISTS pasien (
    no_rkm_medis VARCHAR(15) PRIMARY KEY NOT NULL,
    nm_pasien VARCHAR(50) NOT NULL,
    jk ENUM('Laki-laki', 'Perempuan') NOT NULL,
    tgl_lahir DATE NOT NULL,
    alamat TEXT,
    no_tlp VARCHAR(15),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabel Petugas (ganti dari perawat ke petugas)
CREATE TABLE IF NOT EXISTS petugas (
    nip VARCHAR(20) PRIMARY KEY NOT NULL,
    nama_petugas VARCHAR(50) NOT NULL,
    jabatan VARCHAR(30),
    ruangan VARCHAR(30),
    status ENUM('Aktif', 'Non-Aktif') DEFAULT 'Aktif',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================== TABEL UTAMA =====================

CREATE TABLE asuhan_keperawatan (
    -- ===================== PRIMARY KEY & IDENTIFIKASI =====================
    no_rawat VARCHAR(17) PRIMARY KEY NOT NULL,
    no_rkm_medis VARCHAR(15) NOT NULL,
    
    -- ===================== METADATA PENGKAJIAN =====================
    tgl_pengkajian DATETIME DEFAULT CURRENT_TIMESTAMP,
    tgl_perubahan DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    nip_perawat VARCHAR(20) NOT NULL,
    ruangan VARCHAR(30) NOT NULL,
    jenis_pengkajian ENUM('Awal', 'Berkelanjutan', 'Rujukan') DEFAULT 'Awal',
    
    -- ===================== RIWAYAT KESEHATAN KOMPREHENSIF =====================
    -- Keluhan Utama & Alasan Masuk
    keluhan_utama TEXT NOT NULL,
    onset_keluhan DATETIME,
    durasi_keluhan VARCHAR(50),
    lokasi_keluhan TEXT,
    kualitas_keluhan TEXT,
    faktor_pemicu TEXT,
    faktor_pereda TEXT,
    skala_keluhan INT CHECK (skala_keluhan BETWEEN 0 AND 10),
    
    -- Riwayat Penyakit Sekarang (PQRST Format)
    riwayat_penyakit_sekarang TEXT,
    provokatif_palliatif TEXT,
    kualitas_gejala TEXT,
    region_radiasi TEXT,
    severity_gejala TEXT,
    time_pattern TEXT,
    
    -- Riwayat Penyakit Dahulu
    riwayat_penyakit_kronis TEXT,
    riwayat_operasi TEXT,
    riwayat_rawat_inap TEXT,
    riwayat_trauma TEXT,
    riwayat_transfusi ENUM('Ya', 'Tidak', 'Tidak Tahu'),
    tgl_transfusi_terakhir DATE,
    
    -- Riwayat Pengobatan
    pengobatan_rutin TEXT,
    pengobatan_herbal_suplemen TEXT,
    riwayat_alergi_obat TEXT,
    reaksi_alergi TEXT,
    riwayat_alergi_makanan TEXT,
    riwayat_alergi_lainnya TEXT,
    
    -- Riwayat Kesehatan Keluarga (Family History)
    riwayat_keluarga_penyakit_kardiovaskular TEXT,
    riwayat_keluarga_diabetes TEXT,
    riwayat_keluarga_kanker TEXT,
    riwayat_keluarga_hipertensi TEXT,
    riwayat_keluarga_penyakit_mental TEXT,
    riwayat_keluarga_penyakit_genetik TEXT,
    
    -- Genogram (Pendekatan Sistem)
    genogram_data JSON COMMENT 'Struktur keluarga JSON: { "ayah": {...}, "ibu": {...}, "anak": [...] }',
    genogram_path VARCHAR(255) COMMENT 'Path file gambar genogram',
    genogram_deskripsi TEXT,
    genogram_keluarga_inti TEXT,
    genogram_hubungan_keluarga TEXT,
    
    -- Riwayat Kesehatan Lingkungan
    lingkungan_tinggal ENUM('Rumah sendiri', 'Kontrak', 'Keluarga', 'Lainnya'),
    kondisi_lingkungan TEXT,
    akses_air_bersih ENUM('Ya', 'Tidak'),
    sanitasi ENUM('MCK sendiri', 'MCK bersama', 'Tidak ada'),
    paparan_polusi ENUM('Tidak', 'Polusi udara', 'Polusi suara', 'Kimia', 'Lainnya'),
    paparan_bahan_berbahaya TEXT,
    pekerjaan_terakhir VARCHAR(100),
    lingkungan_kerja TEXT,
    lama_kerja VARCHAR(50),
    
    -- Riwayat Psikososial
    status_ekonomi ENUM('Baik', 'Cukup', 'Kurang'),
    stresor_psikososial TEXT,
    dukungan_sosial_tersedia TEXT,
    kebiasaan_menetap TEXT,
    
    -- Riwayat Perkembangan (Untuk Pasien Anak)
    riwayat_kehamilan_ibu TEXT COMMENT 'Riwayat kehamilan ibu pasien (untuk pasien anak)',
    riwayat_persalinan_ibu TEXT COMMENT 'Riwayat persalinan ibu pasien (untuk pasien anak)',
    riwayat_imunisasi TEXT,
    milestone_perkembangan TEXT,
    
    -- ===================== A. PENGKAJIAN AWAL (11 Pola Gordon + Fisik) =====================
    
    -- 1. POLA PERSEPSI-PEMELIHARAAN KESEHATAN
    persepsi_kesehatan TEXT,
    keb_olahraga_frekuensi ENUM('Tidak pernah', '<1x/minggu', '1-3x/minggu', '>3x/minggu'),
    keb_olahraga_jenis VARCHAR(100),
    cek_kesehatan_rutin BOOLEAN DEFAULT FALSE,
    penggunaan_obat TEXT,
    penggunaan_rokok ENUM('Tidak', 'Ya <10batang/hari', 'Ya 10-20batang/hari', 'Ya >20batang/hari'),
    penggunaan_alkohol ENUM('Tidak', 'Ya kadang', 'Ya rutin'),
    zat_adiktif_lainnya TEXT,
    
    -- 2. POLA NUTRISI-METABOLIK
    pola_makan_harian TEXT,
    nafsu_makan ENUM('Baik', 'Cukup', 'Kurang', 'Tidak ada') DEFAULT 'Baik',
    kesulitan_mengunyah BOOLEAN DEFAULT FALSE,
    alergi_makanan TEXT,
    bb_sebelum DECIMAL(5,2),
    bb_sekarang DECIMAL(5,2),
    perubahan_bb_6bln DECIMAL(4,2) COMMENT '+/- kg dalam 6 bulan',
    mual_muntah BOOLEAN DEFAULT FALSE,
    diare BOOLEAN DEFAULT FALSE,
    konstipasi BOOLEAN DEFAULT FALSE,
    kebiasaan_minum_perhari DECIMAL(4,2) COMMENT 'dalam liter',
    suplemen_vitamin TEXT,
    
    -- 3. POLA ELIMINASI
    eliminasi_bak_frekuensi INT,
    eliminasi_bak_warna VARCHAR(20),
    eliminasi_bak_jumlah DECIMAL(5,2) COMMENT 'cc/hari',
    keluhan_bak TEXT,
    eliminasi_bab_frekuensi INT,
    eliminasi_bab_konsistensi ENUM('Padat', 'Lunak', 'Cair', 'Keras'),
    eliminasi_bab_warna VARCHAR(20),
    keluhan_bab TEXT,
    keringat ENUM('Normal', 'Berlebihan', 'Tidak ada') DEFAULT 'Normal',
    
    -- 4. POLA AKTIVITAS-LATIHAN
    aktivitas_sebelum_sakit TEXT,
    mobilitas ENUM('Mandiri', 'Dengan bantuan', 'Tirah baring') DEFAULT 'Mandiri',
    kendala_aktivitas TEXT,
    jam_tidur_mulai TIME,
    jam_tidur_bangun TIME,
    kualitas_tidur ENUM('Nyenyak', 'Sering terbangun', 'Insomnia') DEFAULT 'Nyenyak',
    adl_makan ENUM('Mandiri', 'Dibantu', 'Bergantung') DEFAULT 'Mandiri',
    adl_mandi ENUM('Mandiri', 'Dibantu', 'Bergantung') DEFAULT 'Mandiri',
    adl_berpakaian ENUM('Mandiri', 'Dibantu', 'Bergantung') DEFAULT 'Mandiri',
    adl_toileting ENUM('Mandiri', 'Dibantu', 'Bergantung') DEFAULT 'Mandiri',
    
    -- 5. POLA TIDUR-ISTIRAHAT
    tidur_siang_durasi INT COMMENT 'dalam menit',
    kesulitan_tidur BOOLEAN DEFAULT FALSE,
    faktor_pengganggu_tidur TEXT,
    perasaan_bangun ENUM('Segar', 'Lelah', 'Sangat lelah') DEFAULT 'Segar',
    obat_bantu_tidur BOOLEAN DEFAULT FALSE,
    kebiasaan_sebelum_tidur TEXT,
    
    -- 6. POLA KOGNITIF-PERSEPTUAL
    kesadaran ENUM('Compos mentis', 'Apatis', 'Somnolen', 'Delirium') DEFAULT 'Compos mentis',
    orientasi_orang BOOLEAN DEFAULT TRUE,
    orientasi_tempat BOOLEAN DEFAULT TRUE,
    orientasi_waktu BOOLEAN DEFAULT TRUE,
    memori_jpendek ENUM('Baik', 'Terganggu') DEFAULT 'Baik',
    memori_jpanjang ENUM('Baik', 'Terganggu') DEFAULT 'Baik',
    pengambilan_keputusan ENUM('Baik', 'Terganggu') DEFAULT 'Baik',
    pengetahuan_penyakit ENUM('Baik', 'Cukup', 'Kurang') DEFAULT 'Baik',
    penglihatan ENUM('Normal', 'Rabun', 'Buta', 'Kacamata') DEFAULT 'Normal',
    pendengaran ENUM('Normal', 'Tuli', 'Alat bantu') DEFAULT 'Normal',
    penciuman ENUM('Normal', 'Terganggu') DEFAULT 'Normal',
    pengecapan ENUM('Normal', 'Terganggu') DEFAULT 'Normal',
    peraba ENUM('Normal', 'Terganggu') DEFAULT 'Normal',
    
    -- 7. POLA PERSEPSI DIRI-KONSEP DIRI
    perasaan_diri TEXT,
    citra_tubuh TEXT,
    harga_diri ENUM('Baik', 'Cukup', 'Rendah') DEFAULT 'Baik',
    perasaan_cemas BOOLEAN DEFAULT FALSE,
    perasaan_takut BOOLEAN DEFAULT FALSE,
    perasaan_sedih BOOLEAN DEFAULT FALSE,
    perasaan_marah BOOLEAN DEFAULT FALSE,
    mekanisme_koping TEXT,
    harapan_masa_depan TEXT,
    
    -- 8. POLA PERAN-HUBUNGAN
    status_perkawinan ENUM('Menikah', 'Belum menikah', 'Cerai', 'Duda/Janda'),
    jumlah_anak INT DEFAULT 0,
    hubungan_keluarga ENUM('Harmonis', 'Kurang harmonis') DEFAULT 'Harmonis',
    hubungan_teman TEXT,
    peran_di_keluarga TEXT,
    peran_di_masyarakat TEXT,
    dukungan_sosial TEXT,
    kebiasaan_komunikasi TEXT,
    
    -- 9. POLA SEKSUAL-REPRODUKSI
    menarche_usia INT COMMENT 'Untuk perempuan',
    siklus_haid_hari INT,
    lama_haid_hari INT,
    pms BOOLEAN DEFAULT FALSE,
    menopause_usia INT,
    riwayat_kehamilan TEXT COMMENT 'Riwayat kehamilan pasien sendiri (untuk pasien perempuan dewasa)',
    kontrasepsi TEXT,
    masalah_seksual TEXT,
    kepuasan_seksual ENUM('Puas', 'Cukup', 'Kurang') DEFAULT 'Puas',
    riwayat_ims BOOLEAN DEFAULT FALSE,
    
    -- 10. POLA KOPING-TOLERANSI TERHADAP STRES
    sumber_stres TEXT,
    tanda_stres_fisik TEXT,
    tanda_stres_emosional TEXT,
    mekanisme_koping_stres TEXT,
    efektivitas_koping ENUM('Efektif', 'Cukup', 'Tidak efektif') DEFAULT 'Efektif',
    dukungan_diinginkan TEXT,
    pengalaman_stres TEXT,
    
    -- 11. POLA NILAI-KEYAKINAN
    keyakinan_agama VARCHAR(50),
    aktivitas_ibadah TEXT,
    sumber_kekuatan_spiritual TEXT,
    nilai_kehidupan TEXT,
    hubungan_keyakinan_kesehatan TEXT,
    kepercayaan_budaya TEXT,
    praktik_tradisional TEXT,
    
    -- PEMERIKSAAN FISIK & TANDA VITAL
    td_sistolik INT,
    td_diastolik INT,
    nadi INT,
    rr INT,
    suhu DECIMAL(3,1),
    nyeri_skala INT CHECK (nyeri_skala BETWEEN 0 AND 10),
    nyeri_lokasi TEXT,
    fisik_head_to_toe TEXT,
    tinggi_badan DECIMAL(5,2),
    berat_badan DECIMAL(5,2),
    imt DECIMAL(4,2),
    lingkar_lengan DECIMAL(5,2),
    
    -- PENILAIAN KHUSUS (Skala & Skor)
    skor_nyeri_total INT,
    skor_risiko_jatuh ENUM('Rendah', 'Sedang', 'Tinggi'),
    skor_braden DECIMAL(4,2),
    skor_norton DECIMAL(4,2),
    skor_glasgow INT,
    tanda_tanda_vital_lain TEXT,
    
    -- ===================== B. DIAGNOSIS KEPERAWATAN (SDKI) =====================
    diagnosa1_kode_sdki VARCHAR(10),
    diagnosa1_label TEXT,
    diagnosa1_etiologi TEXT,
    diagnosa1_gejala TEXT,
    
    diagnosa2_kode_sdki VARCHAR(10),
    diagnosa2_label TEXT,
    diagnosa2_etiologi TEXT,
    diagnosa2_gejala TEXT,
    
    diagnosa3_kode_sdki VARCHAR(10),
    diagnosa3_label TEXT,
    diagnosa3_etiologi TEXT,
    diagnosa3_gejala TEXT,
    
    -- ===================== C. TUJUAN KEPERAWATAN (SLKI) =====================
    tujuan1_kode_slki VARCHAR(10),
    tujuan1_label TEXT,
    tujuan1_kriteria TEXT,
    tujuan1_target_tgl DATE,
    
    tujuan2_kode_slki VARCHAR(10),
    tujuan2_label TEXT,
    tujuan2_kriteria TEXT,
    tujuan2_target_tgl DATE,
    
    -- ===================== D. INTERVENSI KEPERAWATAN (SIKI) =====================
    intervensi1_kode_siki VARCHAR(10),
    intervensi1_label TEXT,
    intervensi1_aktivitas TEXT,
    intervensi1_rasional TEXT,
    
    intervensi2_kode_siki VARCHAR(10),
    intervensi2_label TEXT,
    intervensi2_aktivitas TEXT,
    intervensi2_rasional TEXT,
    
    intervensi3_kode_siki VARCHAR(10),
    intervensi3_label TEXT,
    intervensi3_aktivitas TEXT,
    intervensi3_rasional TEXT,
    
    -- ===================== E. EVALUASI & MONITORING =====================
    evaluasi_hasil TEXT,
    evaluasi_status ENUM('Tercapai seluruhnya', 'Tercapai sebagian', 'Belum tercapai', 'Dalam proses'),
    evaluasi_tgl DATETIME,
    evaluator_nip VARCHAR(20),
    
    -- ===================== F. STATUS REKAM & AUDIT =====================
    status_rekam ENUM('Aktif', 'Arsip', 'Dihapus') DEFAULT 'Aktif',
    asal_rujukan VARCHAR(100),
    tujuan_rujukan VARCHAR(100),
    catatan_khusus TEXT,
    
    -- ===================== INDEX & FOREIGN KEY =====================
    INDEX idx_no_rkm_medis (no_rkm_medis),
    INDEX idx_tgl_pengkajian (tgl_pengkajian),
    INDEX idx_nip_perawat (nip_perawat),
    INDEX idx_ruangan (ruangan),
    INDEX idx_status_rekam (status_rekam),
    INDEX idx_keluhan_utama (keluhan_utama(255)),
    INDEX idx_diagnosa_aktif (diagnosa1_kode_sdki, diagnosa2_kode_sdki, diagnosa3_kode_sdki),
    
    FOREIGN KEY (no_rkm_medis) REFERENCES pasien(no_rkm_medis),
    FOREIGN KEY (nip_perawat) REFERENCES petugas(nip)  -- Diubah dari perawat ke petugas
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabel utama asuhan keperawatan dengan riwayat kesehatan lengkap';