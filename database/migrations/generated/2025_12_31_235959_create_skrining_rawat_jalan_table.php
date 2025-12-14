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
        if (! Schema::hasTable('skrining_rawat_jalan')) {
            Schema::create('skrining_rawat_jalan', function (Blueprint $table) {
                $table->date('tanggal');
                $table->time('jam');
                $table->string('no_rkm_medis', 15)->index('no_rkm_medis');
                $table->enum('geriatri', ['Ya', 'Tidak'])->nullable();
                $table->enum('kesadaran', ['Sadar penuh', 'Tampak mengantuk/gelisah bicara tidak jelas', 'Tidak sadar', 'Batuk > 2 minggu'])->nullable();
                $table->enum('pernapasan', ['Nafas normal', 'Tampak sesak', 'Tidak bernafas'])->nullable();
                $table->enum('nyeri_dada', ['Tidak ada', 'Ada (Tingkat sedang)', 'Nyeri dada kiri tembus punggung'])->nullable();
                $table->enum('skala_nyeri', ['Tidak sakit', 'Sedikit sakit', 'Agak mengganggu', 'Mengganggu aktivitas', 'Sangat mengganggu', 'Tak tertahankan'])->nullable();
                $table->enum('batuk', ['Tidak', 'Ya < 2 minggu', 'Ya > 2 minggu']);
                $table->enum('risiko_jatuh', ['Tidak', 'Ya']);
                $table->enum('keputusan', ['Sesuai antrian', 'IGD'])->nullable();
                $table->string('nip', 20)->nullable()->index('nip');

                $table->primary(['tanggal', 'jam', 'no_rkm_medis']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_rawat_jalan');
    }
};
