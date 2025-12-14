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
        if (! Schema::hasTable('penilaian_pasien_keracunan')) {
            Schema::create('penilaian_pasien_keracunan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('hubungan', 30);
                $table->enum('tempat_kejadian', ['Rumah', 'Kantor', 'Tempat Kerja', 'Tempat Hiburan', 'Lain-lain'])->nullable();
                $table->string('keterangan_tempat_kejadian', 50)->nullable();
                $table->string('keluhan', 2000)->nullable();
                $table->string('riwayat_penyakit_sekarang', 2000)->nullable();
                $table->enum('hamil', ['Ya', 'Tidak'])->nullable();
                $table->enum('menyusui', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyebab', ['NAPZA', 'Obat', 'Obat Tradisional', 'Makanan/Minuman', 'Suplemen Makanan/Vitamin', 'Kosmetik', 'Bahan Kimia', 'Pestisida', 'Gigitan Ular', 'Binatang Selain Ular', 'Tumbuhan Beracun', 'Pencemar Lingkungan', 'Gas', 'Tidak Diketahui'])->nullable();
                $table->string('nama_bahan', 100)->nullable();
                $table->string('jumlah_bahan', 15)->nullable();
                $table->enum('tipe_pemaparan', ['Mulut', 'Mata', 'Gigitan', 'Injeksi', 'Inhalasi', 'Sengatan', 'Kulit', 'Lain-lain'])->nullable();
                $table->string('keterangan_tipe_pemaparan', 50)->nullable();
                $table->enum('tipe_kejadian', ['Tidak Disengaja', 'Disengaja', 'Tidak Diketahui'])->nullable();
                $table->enum('bau_bahan', ['Tidak Ada', 'Ada'])->nullable();
                $table->string('keterangan_bau_bahan', 30)->nullable();
                $table->enum('pupil', ['Normal', 'Isokor', 'Unisokor', 'Miosis', 'Midriasis', 'Lainnya'])->nullable();
                $table->string('keterangan_pupil', 30)->nullable();
                $table->enum('kesadaran', ['Compos Mentis', 'Apatis', 'Somnolen', 'Sopor', 'Koma']);
                $table->string('td', 8)->nullable();
                $table->string('nadi', 5)->nullable();
                $table->string('rr', 5);
                $table->string('suhu', 5)->nullable();
                $table->string('spo', 5);
                $table->string('urine', 5)->nullable();
                $table->string('pengobatan_sebelum_igd', 500)->nullable();
                $table->string('diagnosis', 500)->nullable();
                $table->string('pemeriksaan_penunjang', 500)->nullable();
                $table->string('penatalaksanaan_diberikan', 500)->nullable();
                $table->enum('tindak_lanjut', ['Rawat Jalan', 'Rawat Inap', 'Dirujuk', 'Pulang APS', 'Pulang Sembuh', 'Meninggal'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_pasien_keracunan');
    }
};
