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
        if (!Schema::hasTable('satu_sehat_mapping_lokasi_ruanglabmb')) {
            Schema::create('satu_sehat_mapping_lokasi_ruanglabmb', function (Blueprint $table) {
                $table->string('id_organisasi_satusehat', 40)->nullable()->index('id_organisasi_satusehat');
                $table->string('id_lokasi_satusehat', 40)->primary();
                $table->string('longitude', 30);
                $table->string('latitude', 30);
                $table->string('altittude', 30);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_mapping_lokasi_ruanglabmb');
    }
};
