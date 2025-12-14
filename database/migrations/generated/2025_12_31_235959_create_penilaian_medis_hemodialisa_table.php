<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('penilaian_medis_hemodialisa')) {
            Schema::create('penilaian_medis_hemodialisa', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal')->nullable();
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis'])->nullable();
                $table->string('hubungan', 30)->nullable();
                $table->string('ruangan', 50)->nullable();
                $table->string('alergi', 100)->nullable();
                $table->enum('nyeri', ['Tidak Nyeri', 'Nyeri Ringan', 'Nyeri Sedang', 'Nyeri Berat', 'Nyeri Sangat Berat', 'Nyeri Tak Tertahankan'])->nullable();
                $table->string('status_nutrisi', 100)->nullable();
                $table->enum('hipertensi', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_hipertensi', 30)->nullable();
                $table->enum('diabetes', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_diabetes', 30)->nullable();
                $table->enum('batu_saluran_kemih', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_batu_saluran_kemih', 30)->nullable();
                $table->enum('operasi_saluran_kemih', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_operasi_saluran_kemih', 30)->nullable();
                $table->enum('infeksi_saluran_kemih', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_infeksi_saluran_kemih', 30)->nullable();
                $table->enum('bengkak_seluruh_tubuh', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_bengkak_seluruh_tubuh', 30)->nullable();
                $table->enum('urin_berdarah', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_urin_berdarah', 30)->nullable();
                $table->enum('penyakit_ginjal_laom', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_penyakit_ginjal_laom', 30)->nullable();
                $table->enum('penyakit_lain', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_penyakit_lain', 30)->nullable();
                $table->enum('konsumsi_obat_nefro', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_konsumsi_obat_nefro', 30)->nullable();
                $table->date('dialisis_pertama');
                $table->enum('pernah_cpad', ['Tidak', 'Ya']);
                $table->date('tanggal_cpad');
                $table->enum('pernah_transplantasi', ['Tidak', 'Ya']);
                $table->date('tanggal_transplantasi');
                $table->enum('keadaan_umum', ['Sehat', 'Sakit Ringan', 'Sakit Sedang', 'Sakit Berat']);
                $table->enum('kesadaran', ['Compos Mentis', 'Apatis', 'Somnolen', 'Sopor', 'Koma']);
                $table->string('nadi', 5);
                $table->string('bb', 5);
                $table->string('td', 8);
                $table->string('suhu', 5);
                $table->string('napas', 5);
                $table->string('tb', 5);
                $table->enum('hepatomegali', ['Tidak', 'Ya']);
                $table->enum('splenomegali', ['Tidak', 'Ya']);
                $table->enum('ascites', ['Tidak', 'Ya']);
                $table->enum('edema', ['Tidak', 'Ya']);
                $table->enum('whezzing', ['Tidak', 'Ya']);
                $table->enum('ronchi', ['Tidak', 'Ya']);
                $table->enum('ikterik', ['Tidak', 'Ya']);
                $table->enum('tekanan_vena', ['Normal', 'Meningkat']);
                $table->enum('anemia', ['Tidak', 'Ya']);
                $table->enum('kardiomegali', ['Tidak', 'Ya']);
                $table->enum('bising', ['Tidak', 'Ya']);
                $table->enum('thorax', ['Tidak', 'Ya']);
                $table->date('tanggal_thorax');
                $table->enum('ekg', ['Tidak', 'Ya']);
                $table->date('tanggal_ekg');
                $table->enum('bno', ['Tidak', 'Ya']);
                $table->date('tanggal_bno');
                $table->enum('usg', ['Tidak', 'Ya']);
                $table->date('tanggal_usg');
                $table->enum('renogram', ['Tidak', 'Ya']);
                $table->date('tanggal_renogram');
                $table->enum('biopsi', ['Tidak', 'Ya']);
                $table->date('tanggal_biopsi');
                $table->enum('ctscan', ['Tidak', 'Ya']);
                $table->date('tanggal_ctscan');
                $table->enum('arteriografi', ['Tidak', 'Ya']);
                $table->date('tanggal_arteriografi');
                $table->enum('kultur_urin', ['Tidak', 'Ya']);
                $table->date('tanggal_kultur_urin');
                $table->enum('laborat', ['Tidak', 'Ya']);
                $table->date('tanggal_laborat');
                $table->string('hematokrit', 30);
                $table->string('hemoglobin', 30);
                $table->string('leukosit', 30);
                $table->string('trombosit', 30);
                $table->string('hitung_jenis', 30);
                $table->string('ureum', 30);
                $table->string('urin_lengkap', 30);
                $table->string('kreatinin', 30);
                $table->string('cct', 30);
                $table->string('sgot', 30);
                $table->string('sgpt', 30);
                $table->string('ct', 30);
                $table->string('asam_urat', 30);
                $table->enum('hbsag', ['Non Reaktif', 'Reaktif']);
                $table->enum('anti_hcv', ['Non Reaktif', 'Reaktif']);
                $table->string('edukasi', 1000);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_hemodialisa');
    }
};
