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
        if (! Schema::hasTable('set_lokasi')) {
            Schema::create('set_lokasi', function (Blueprint $table) {
                $table->char('kd_bangsal', 5)->index('kd_bangsal');
                $table->enum('asal_stok', ['Gunakan Stok Utama Obat', 'Gunakan Stok Bangsal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_lokasi');
    }
};
