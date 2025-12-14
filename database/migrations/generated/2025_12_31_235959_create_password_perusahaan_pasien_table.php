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
        if (! Schema::hasTable('password_perusahaan_pasien')) {
            Schema::create('password_perusahaan_pasien', function (Blueprint $table) {
                $table->string('kode_perusahaan', 15)->primary();
                $table->string('password', 1000)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('password_perusahaan_pasien');
    }
};
