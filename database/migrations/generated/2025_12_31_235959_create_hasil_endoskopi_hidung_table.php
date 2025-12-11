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
        if (!Schema::hasTable('hasil_endoskopi_hidung')) {
            Schema::create('hasil_endoskopi_hidung', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('diagnosa_klinis', 50);
                $table->string('kiriman_dari', 50);
                $table->enum('kondisi_hidung_kanan', ['Lapang', 'Sempit', 'Mukosa Edema'])->nullable();
                $table->enum('kondisi_hidung_kiri', ['Lapang', 'Sempit', 'Mukosa Edema'])->nullable();
                $table->enum('kavum_nasi_kanan', ['Mukosa Pucat', 'Mukosa Hiperemis', 'Massa', 'Polip'])->nullable();
                $table->enum('kavum_nasi_kiri', ['Mukosa Pucat', 'Mukosa Hiperemis', 'Massa', 'Polip'])->nullable();
                $table->enum('konka_inferior_kanan', ['Eutrofi', 'Hipertrofi', 'Atrofi'])->nullable();
                $table->enum('konka_inferior_kiri', ['Eutrofi', 'Hipertrofi', 'Atrofi'])->nullable();
                $table->enum('meatus_medius_kanan', ['Terbuka', 'Tertutup', 'Mukosa Edema', 'Polip', 'Sekret'])->nullable();
                $table->enum('meatus_medius_kiri', ['Terbuka', 'Tertutup', 'Mukosa Edema', 'Polip', 'Sekret'])->nullable();
                $table->enum('septum_kanan', ['Lurus', 'Deviasi', 'Spina'])->nullable();
                $table->enum('septum_kiri', ['Lurus', 'Deviasi', 'Spina'])->nullable();
                $table->enum('nasofaring_kanan', ['Normal', 'Adenoid', 'Keradangan', 'Massa'])->nullable();
                $table->enum('nasofaring_kiri', ['Normal', 'Adenoid', 'Keradangan', 'Massa'])->nullable();
                $table->string('lainlain_kanan', 100)->nullable();
                $table->string('lainlain_kiri', 100)->nullable();
                $table->string('kesimpulan', 300)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_endoskopi_hidung');
    }
};
