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
        if (! Schema::hasTable('surat_pulang_atas_permintaan_sendiri_saksi_keluarga')) {
            Schema::create('surat_pulang_atas_permintaan_sendiri_saksi_keluarga', function (Blueprint $table) {
                $table->string('no_surat', 20)->primary();
                $table->string('photo', 500)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_pulang_atas_permintaan_sendiri_saksi_keluarga');
    }
};
