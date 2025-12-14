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
        if (! Schema::hasTable('master_menolak_anjuran_medis')) {
            Schema::create('master_menolak_anjuran_medis', function (Blueprint $table) {
                $table->string('kode_penolakan', 3)->primary();
                $table->string('nama_penolakan', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_menolak_anjuran_medis');
    }
};
