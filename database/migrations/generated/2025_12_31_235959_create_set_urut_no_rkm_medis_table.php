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
        if (!Schema::hasTable('set_urut_no_rkm_medis')) {
            Schema::create('set_urut_no_rkm_medis', function (Blueprint $table) {
                $table->enum('urutan', ['Straight', 'Middle', 'Terminal'])->primary();
                $table->enum('tahun', ['Yes', 'No']);
                $table->enum('bulan', ['Yes', 'No']);
                $table->enum('posisi_tahun_bulan', ['Depan', 'Belakang'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_urut_no_rkm_medis');
    }
};
