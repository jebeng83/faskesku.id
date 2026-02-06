<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (! Schema::hasTable('template_pemeriksaan_dokter_detail')) {
            Schema::create('template_pemeriksaan_dokter_detail', function (Blueprint $table) {
                $table->string('no_template', 32)->primary();
                $table->string('nm_template', 255)->nullable();
                $table->string('suhu_tubuh', 50)->nullable();
                $table->string('tensi', 50)->nullable();
                $table->string('nadi', 50)->nullable();
                $table->string('respirasi', 50)->nullable();
                $table->string('spo2', 50)->nullable();
                $table->string('tinggi', 50)->nullable();
                $table->string('berat', 50)->nullable();
                $table->string('gcs', 50)->nullable();
                $table->string('lingkar_perut', 50)->nullable();

                $table->foreign('no_template')
                    ->references('no_template')
                    ->on('template_pemeriksaan_dokter')
                    ->cascadeOnUpdate()
                    ->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('template_pemeriksaan_dokter_detail');
    }
};

