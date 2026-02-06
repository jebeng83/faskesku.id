<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (! Schema::hasTable('template_pemeriksaan_dokter_detail')) {
            Schema::create('template_pemeriksaan_dokter_detail', function (Blueprint $table) {
                $table->engine = 'InnoDB';
                $table->charset = 'latin1';
                $table->collation = 'latin1_swedish_ci';

                $table->string('no_template', 20)->primary();
                $table->string('nm_template', 25);
                $table->string('suhu', 5)->nullable();
                $table->string('tensi', 8)->nullable();
                $table->string('nadi', 3)->nullable();
                $table->string('respirasi', 3)->nullable();
                $table->string('spo2', 3)->nullable();
                $table->string('gcs', 3)->nullable();
                $table->string('tinggi', 5)->nullable();
                $table->string('berat', 5)->nullable();
                $table->string('lingkar_perut', 5)->nullable();
                $table->dateTime('created_at')->nullable();

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
