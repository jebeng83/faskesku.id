<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('asuhan_keperawatan')) {
            return;
        }

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `keluhan_utama` TEXT NOT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `lokasi_keluhan` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kualitas_keluhan` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `faktor_pemicu` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `faktor_pereda` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_penyakit_sekarang` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `provokatif_palliatif` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kualitas_gejala` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `region_radiasi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `severity_gejala` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `time_pattern` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_penyakit_kronis` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_operasi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_rawat_inap` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_trauma` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `pengobatan_rutin` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `pengobatan_herbal_suplemen` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_alergi_obat` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `reaksi_alergi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_alergi_makanan` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_alergi_lainnya` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_penyakit_kardiovaskular` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_diabetes` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_kanker` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_hipertensi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_penyakit_mental` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_penyakit_genetik` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `genogram_deskripsi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `genogram_keluarga_inti` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `genogram_hubungan_keluarga` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kondisi_lingkungan` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `paparan_bahan_berbahaya` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `lingkungan_kerja` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `stresor_psikososial` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `dukungan_sosial_tersedia` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kebiasaan_menetap` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_kehamilan_ibu` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_persalinan_ibu` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_imunisasi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `milestone_perkembangan` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `persepsi_kesehatan` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `penggunaan_obat` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `zat_adiktif_lainnya` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `alergi_makanan` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `keluhan_bak` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `keluhan_bab` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `aktivitas_sebelum_sakit` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kendala_aktivitas` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `faktor_pengganggu_tidur` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kebiasaan_sebelum_tidur` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `perasaan_diri` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `citra_tubuh` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `mekanisme_koping` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `harapan_masa_depan` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `hubungan_teman` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `peran_di_keluarga` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `peran_di_masyarakat` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `dukungan_sosial` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kebiasaan_komunikasi` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_kehamilan` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kontrasepsi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `masalah_seksual` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `sumber_stres` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tanda_stres_fisik` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tanda_stres_emosional` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `mekanisme_koping_stres` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `dukungan_diinginkan` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `pengalaman_stres` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `aktivitas_ibadah` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `sumber_kekuatan_spiritual` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `nilai_kehidupan` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `hubungan_keyakinan_kesehatan` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kepercayaan_budaya` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `praktik_tradisional` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `nyeri_lokasi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `fisik_head_to_toe` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tanda_tanda_vital_lain` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa1_label` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa1_etiologi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa1_gejala` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa2_label` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa2_etiologi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa2_gejala` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa3_label` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa3_etiologi` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa3_gejala` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tujuan1_label` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tujuan1_kriteria` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tujuan2_label` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tujuan2_kriteria` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi1_label` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi1_aktivitas` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi1_rasional` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi2_label` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi2_aktivitas` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi2_rasional` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi3_label` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi3_aktivitas` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi3_rasional` TEXT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `evaluasi_hasil` TEXT NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `catatan_khusus` TEXT NULL");
    }

    public function down(): void
    {
        if (! Schema::hasTable('asuhan_keperawatan')) {
            return;
        }

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `keluhan_utama` VARCHAR(500) NOT NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `lokasi_keluhan` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kualitas_keluhan` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `faktor_pemicu` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `faktor_pereda` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_penyakit_sekarang` VARCHAR(500) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `provokatif_palliatif` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kualitas_gejala` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `region_radiasi` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `severity_gejala` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `time_pattern` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_penyakit_kronis` VARCHAR(200) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_operasi` VARCHAR(200) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_rawat_inap` VARCHAR(200) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_trauma` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `pengobatan_rutin` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `pengobatan_herbal_suplemen` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_alergi_obat` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `reaksi_alergi` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_alergi_makanan` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_alergi_lainnya` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_penyakit_kardiovaskular` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_diabetes` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_kanker` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_hipertensi` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_penyakit_mental` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_keluarga_penyakit_genetik` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `genogram_deskripsi` VARCHAR(200) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `genogram_keluarga_inti` VARCHAR(200) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `genogram_hubungan_keluarga` VARCHAR(200) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kondisi_lingkungan` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `paparan_bahan_berbahaya` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `lingkungan_kerja` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `stresor_psikososial` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `dukungan_sosial_tersedia` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kebiasaan_menetap` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_kehamilan_ibu` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_persalinan_ibu` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_imunisasi` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `milestone_perkembangan` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `persepsi_kesehatan` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `penggunaan_obat` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `zat_adiktif_lainnya` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `alergi_makanan` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `keluhan_bak` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `keluhan_bab` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `aktivitas_sebelum_sakit` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kendala_aktivitas` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `faktor_pengganggu_tidur` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kebiasaan_sebelum_tidur` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `perasaan_diri` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `citra_tubuh` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `mekanisme_koping` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `harapan_masa_depan` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `hubungan_teman` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `peran_di_keluarga` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `peran_di_masyarakat` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `dukungan_sosial` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kebiasaan_komunikasi` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `riwayat_kehamilan` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kontrasepsi` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `masalah_seksual` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `sumber_stres` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tanda_stres_fisik` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tanda_stres_emosional` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `mekanisme_koping_stres` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `dukungan_diinginkan` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `pengalaman_stres` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `aktivitas_ibadah` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `sumber_kekuatan_spiritual` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `nilai_kehidupan` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `hubungan_keyakinan_kesehatan` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `kepercayaan_budaya` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `praktik_tradisional` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `nyeri_lokasi` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `fisik_head_to_toe` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tanda_tanda_vital_lain` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa1_label` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa1_etiologi` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa1_gejala` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa2_label` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa2_etiologi` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa2_gejala` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa3_label` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa3_etiologi` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `diagnosa3_gejala` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tujuan1_label` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tujuan1_kriteria` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tujuan2_label` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `tujuan2_kriteria` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi1_label` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi1_aktivitas` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi1_rasional` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi2_label` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi2_aktivitas` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi2_rasional` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi3_label` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi3_aktivitas` VARCHAR(150) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `intervensi3_rasional` VARCHAR(150) NULL");

        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `evaluasi_hasil` VARCHAR(200) NULL");
        DB::statement("ALTER TABLE `asuhan_keperawatan` MODIFY COLUMN `catatan_khusus` VARCHAR(200) NULL");
    }
};
