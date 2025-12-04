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
        if (!Schema::hasTable('hasil_endoskopi_faring_laring')) {
            Schema::create('hasil_endoskopi_faring_laring', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('diagnosa_klinis', 50);
                $table->string('kiriman_dari', 50);
                $table->string('faring_uvula', 50)->nullable();
                $table->string('faring_arkus_faring', 50)->nullable();
                $table->string('faring_dinding_posterior', 50)->nullable();
                $table->string('faring_tonsil', 50)->nullable();
                $table->string('laring_tonsil_lingual', 50)->nullable();
                $table->string('laring_valekula', 50)->nullable();
                $table->string('laring_sinus_piriformis', 50)->nullable();
                $table->string('laring_epiglotis', 50)->nullable();
                $table->string('laring_arytenoid', 50)->nullable();
                $table->string('laring_plika_ventrikularis', 50)->nullable();
                $table->string('laring_pita_suara', 50)->nullable();
                $table->string('laring_rima_vocalis', 50)->nullable();
                $table->string('laring_lainlain', 100)->nullable();
                $table->string('kesan', 300)->nullable();
                $table->string('saran', 300)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_endoskopi_faring_laring');
    }
};
