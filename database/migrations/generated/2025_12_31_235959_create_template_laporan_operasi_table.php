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
        if (! Schema::hasTable('template_laporan_operasi')) {
            Schema::create('template_laporan_operasi', function (Blueprint $table) {
                $table->string('no_template', 5)->primary();
                $table->string('nama_operasi', 100);
                $table->string('diagnosa_preop', 100);
                $table->string('diagnosa_postop', 100);
                $table->string('jaringan_dieksisi', 100);
                $table->enum('permintaan_pa', ['Ya', 'Tidak']);
                $table->text('laporan_operasi');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_laporan_operasi');
    }
};
