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
        if (! Schema::hasTable('penilaian_pre_induksi')) {
            Schema::create('penilaian_pre_induksi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('tensi', 8)->nullable();
                $table->string('nadi', 5)->nullable();
                $table->string('rr', 5)->nullable();
                $table->string('suhu', 5)->nullable();
                $table->string('ekg', 50)->nullable();
                $table->string('lain_lain', 50)->nullable();
                $table->enum('asesmen', ['Sesuai Asesmen Pre Sedasi/Anestesi', 'Tidak Sesuai Asesmen Pre Sedasi/Anestesi'])->nullable();
                $table->string('perencanaan', 300)->nullable();
                $table->string('infus_perifier', 300)->nullable();
                $table->string('cvc', 70)->nullable();
                $table->enum('posisi', ['Supine', 'Lithotomi', 'Lateral', 'Prone', 'Perlindungan Mata', 'Kanan', 'Kiri', 'Lain-lain'])->nullable();
                $table->enum('premedikasi', ['Oral', 'IM', 'IV'])->nullable();
                $table->string('premedikasi_keterangan', 50)->nullable();
                $table->enum('induksi', ['Intravena', 'Inhalasi'])->nullable();
                $table->string('induksi_keterangan', 70)->nullable();
                $table->string('face_mask_no', 20)->nullable();
                $table->string('nasopharing_no', 20)->nullable();
                $table->string('ett_no', 20)->nullable();
                $table->string('ett_jenis', 20)->nullable();
                $table->string('ett_viksasi', 25)->nullable();
                $table->string('lma_no', 20)->nullable();
                $table->string('lma_jenis', 20)->nullable();
                $table->string('tracheostomi', 60)->nullable();
                $table->string('bronchoscopi_fiberoptik', 60)->nullable();
                $table->string('glidescopi', 60)->nullable();
                $table->string('lain_lain_tatalaksana', 100)->nullable();
                $table->enum('intubasi_sesudah_tidur', ['Ya', 'Tidak'])->nullable();
                $table->enum('intubasi_oral', ['Ya', 'Tidak'])->nullable();
                $table->enum('intubasi_tracheostomi', ['Ya', 'Tidak'])->nullable();
                $table->string('intubasi_keterangan', 200)->nullable();
                $table->string('sulit_ventilasi', 100)->nullable();
                $table->string('sulit_intubasi', 100)->nullable();
                $table->string('ventilasi', 100)->nullable();
                $table->string('teknik_regional_jenis', 100)->nullable();
                $table->string('teknik_regional_lokasi', 40)->nullable();
                $table->string('teknik_regional_jenis_jarum', 30)->nullable();
                $table->enum('teknik_regional_kateter', ['Ya', 'Tidak'])->nullable();
                $table->string('teknik_regional_kateter_viksasi', 40)->nullable();
                $table->string('teknik_regional_obat_obatan', 400)->nullable();
                $table->string('teknik_regional_komplikasi', 200)->nullable();
                $table->string('teknik_regional_hasil', 100)->nullable();

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_pre_induksi');
    }
};
