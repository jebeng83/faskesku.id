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
        if (!Schema::hasTable('permintaan_pemeriksaan_labpa')) {
            Schema::create('permintaan_pemeriksaan_labpa', function (Blueprint $table) {
                $table->string('noorder', 15);
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');
                $table->enum('stts_bayar', ['Sudah', 'Belum'])->nullable();

                $table->primary(['noorder', 'kd_jenis_prw']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_pemeriksaan_labpa');
    }
};
