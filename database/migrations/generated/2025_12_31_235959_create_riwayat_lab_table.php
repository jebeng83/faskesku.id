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
        if (!Schema::hasTable('riwayat_lab')) {
            Schema::create('riwayat_lab', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('no_rawat', 17);
                $table->string('no_rkm_medis', 15);
                $table->string('kd_jenis_prw', 15);
                $table->dateTime('tgl_periksa');
                $table->text('hasil_pemeriksaan');
                $table->string('dokter_pj')->nullable();
                $table->string('petugas_lab')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_lab');
    }
};
