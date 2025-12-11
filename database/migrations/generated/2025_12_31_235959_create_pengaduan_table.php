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
        if (!Schema::hasTable('pengaduan')) {
            Schema::create('pengaduan', function (Blueprint $table) {
                $table->string('id', 15)->primary();
                $table->dateTime('tanggal');
                $table->string('no_rkm_medis', 15)->index('no_rkm_medis');
                $table->string('pesan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaduan');
    }
};
