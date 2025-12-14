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
        if (! Schema::hasTable('laborat_kesling_pelanggan')) {
            Schema::create('laborat_kesling_pelanggan', function (Blueprint $table) {
                $table->string('kode_pelanggan', 5)->primary();
                $table->string('nama_pelanggan', 50)->nullable();
                $table->string('alamat', 50)->nullable();
                $table->string('kota', 20)->nullable();
                $table->string('no_telp', 13)->nullable();
                $table->string('kegiatan_usaha', 30)->nullable();
                $table->string('personal_dihubungi', 30)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laborat_kesling_pelanggan');
    }
};
