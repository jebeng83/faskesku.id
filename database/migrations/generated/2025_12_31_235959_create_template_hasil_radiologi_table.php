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
        if (! Schema::hasTable('template_hasil_radiologi')) {
            Schema::create('template_hasil_radiologi', function (Blueprint $table) {
                $table->string('no_template', 5)->primary();
                $table->string('nama_pemeriksaan', 80)->nullable();
                $table->text('template_hasil_radiologi')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_hasil_radiologi');
    }
};
