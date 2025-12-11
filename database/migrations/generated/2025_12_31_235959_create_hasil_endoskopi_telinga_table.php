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
        if (!Schema::hasTable('hasil_endoskopi_telinga')) {
            Schema::create('hasil_endoskopi_telinga', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('diagnosa_klinis', 50);
                $table->string('kiriman_dari', 50);
                $table->enum('bentuk_liang_telinga_kanan', ['Lapang', 'Sempit', 'Destruksi'])->nullable();
                $table->enum('bentuk_liang_telinga_kiri', ['Lapang', 'Sempit', 'Destruksi'])->nullable();
                $table->enum('kondisi_liang_telinga_kanan', ['Serumen', 'Sekret', 'Jamur', 'Kolesteatoma', 'Massa/Jaringan', 'Benda Asing', 'Lainnya'])->nullable();
                $table->string('keterangan_kondisi_liang_telinga_kanan', 30)->nullable();
                $table->enum('kondisi_liang_telinga_kiri', ['Serumen', 'Sekret', 'Jamur', 'Kolesteatoma', 'Massa/Jaringan', 'Benda Asing', 'Lainnya'])->nullable();
                $table->string('keterangan_kondisi_liang_telinga_kiri', 30)->nullable();
                $table->enum('membran_timpani_intak_kanan', ['Normal', 'Hiperemis', 'Bulging', 'Retraksi', 'Sklerotik'])->nullable();
                $table->enum('membran_timpani_intak_kiri', ['Normal', 'Hiperemis', 'Bulging', 'Retraksi', 'Sklerotik'])->nullable();
                $table->enum('membran_timpani_perforasi_kanan', ['Sentral', 'Atik', 'Marginal', 'Lainnya'])->nullable();
                $table->string('keterangan_membran_timpani_perforasi_kanan', 30)->nullable();
                $table->enum('membran_timpani_perforasi_kiri', ['Sentral', 'Atik', 'Marginal', 'Lainnya'])->nullable();
                $table->string('keterangan_membran_timpani_perforasi_kiri', 30)->nullable();
                $table->string('kavum_timpani_mukosa_kanan', 40)->nullable();
                $table->string('kavum_timpani_mukosa_kiri', 40)->nullable();
                $table->string('kavum_timpani_osikel_kanan', 40)->nullable();
                $table->string('kavum_timpani_osikel_kiri', 40)->nullable();
                $table->string('kavum_timpani_isthmus_kanan', 40)->nullable();
                $table->string('kavum_timpani_isthmus_kiri', 40)->nullable();
                $table->string('kavum_timpani_anterior_kanan', 40)->nullable();
                $table->string('kavum_timpani_anterior_kiri', 40)->nullable();
                $table->string('kavum_timpani_posterior_kanan', 40)->nullable();
                $table->string('kavum_timpani_posterior_kiri', 40)->nullable();
                $table->string('lainlain_kanan', 100)->nullable();
                $table->string('lainlain_kiri', 100)->nullable();
                $table->string('kesimpulan', 300)->nullable();
                $table->string('anjuran', 300)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_endoskopi_telinga');
    }
};
