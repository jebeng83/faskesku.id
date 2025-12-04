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
        if (!Schema::hasTable('surat_sub_klasifikasi')) {
            Schema::create('surat_sub_klasifikasi', function (Blueprint $table) {
                $table->string('kd', 10)->primary();
                $table->string('kd_klasifikasi', 5)->index('surat_sub_klasifikasi_ibfk_1');
                $table->string('sub_klasifikasi', 50);
                $table->integer('no_bulanan')->nullable();
                $table->integer('no_tahunan')->nullable();
                $table->integer('bulan');
                $table->integer('tahun');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_sub_klasifikasi');
    }
};
