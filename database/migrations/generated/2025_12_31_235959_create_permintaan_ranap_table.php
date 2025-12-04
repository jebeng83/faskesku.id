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
        if (!Schema::hasTable('permintaan_ranap')) {
            Schema::create('permintaan_ranap', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->date('tanggal');
                $table->string('kd_kamar', 15)->index('kd_kamar');
                $table->string('diagnosa', 50)->nullable();
                $table->string('catatan', 50)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_ranap');
    }
};
