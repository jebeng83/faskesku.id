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
        if (!Schema::hasTable('set_alamat_pasien')) {
            Schema::create('set_alamat_pasien', function (Blueprint $table) {
                $table->enum('kelurahan', ['true', 'false'])->nullable();
                $table->enum('kecamatan', ['true', 'false'])->nullable();
                $table->enum('kabupaten', ['true', 'false'])->nullable();
                $table->enum('propinsi', ['true', 'false']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_alamat_pasien');
    }
};
