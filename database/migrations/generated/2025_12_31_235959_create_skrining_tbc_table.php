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
        if (! Schema::hasTable('skrining_tbc')) {
            Schema::create('skrining_tbc', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('berat_badan', 6)->nullable();
                $table->string('tinggi_badan', 8)->nullable();
                $table->string('imt', 6)->nullable();
                $table->enum('kasifikasi_imt', ['Berat Badan Kurang', 'Berat Badan Normal', 'Kelebihan Berat Badan', 'Obesitas I', 'Obesitas II'])->nullable();
                $table->string('lingkar_pinggang', 6)->nullable();
                $table->enum('risiko_lingkar_pinggang', ['Rendah', 'Cukup', 'Meningkat', 'Moderat', 'Berat', 'Sangat'])->nullable();
                $table->enum('riwayat_kontak_tbc', ['Ya', 'Tidak'])->nullable();
                $table->enum('jenis_kontak_tbc', ['Tidak', 'TBC Paru Bakteriologis', 'TBC Paru Klinis', 'TBC Paru Ekstraparu'])->nullable();
                $table->enum('faktor_resiko_pernah_terdiagnosa_tbc', ['Ya', 'Tidak'])->nullable();
                $table->string('keterangan_pernah_terdiagnosa', 40)->nullable();
                $table->enum('faktor_resiko_pernah_berobat_tbc', ['Ya', 'Tidak'])->nullable();
                $table->enum('faktor_resiko_malnutrisi', ['Ya', 'Tidak'])->nullable();
                $table->enum('faktor_resiko_merokok', ['Ya', 'Tidak'])->nullable();
                $table->enum('faktor_resiko_riwayat_dm', ['Ya', 'Tidak'])->nullable();
                $table->enum('faktor_resiko_odhiv', ['Ya', 'Tidak'])->nullable();
                $table->enum('faktor_resiko_lansia', ['Ya', 'Tidak'])->nullable();
                $table->enum('faktor_resiko_ibu_hamil', ['Ya', 'Tidak'])->nullable();
                $table->enum('faktor_resiko_wbp', ['Ya', 'Tidak'])->nullable();
                $table->enum('faktor_resiko_tinggal_diwilayah_padat_kumuh', ['Ya', 'Tidak'])->nullable();
                $table->enum('abnormalitas_tbc', ['Normal', 'Abnormalitas TBC', 'Abnormalitas Bukan TBC'])->nullable();
                $table->enum('gejala_tbc_batuk', ['Ya', 'Tidak'])->nullable();
                $table->enum('gejala_tbc_bb_turun', ['Ya', 'Tidak'])->nullable();
                $table->enum('gejala_tbc_demam', ['Ya', 'Tidak'])->nullable();
                $table->enum('gejala_tbc_berkeringat_malam_hari', ['Ya', 'Tidak'])->nullable();
                $table->string('keterangan_gejala_penyakit_lain', 30)->nullable();
                $table->enum('kesimpulan_skrining', ['Bukan Terduga TBC', 'Kontak Erat', 'Terduga TBC'])->nullable();
                $table->string('keterangan_hasil_skrining', 50)->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_tbc');
    }
};
