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
        if (! Schema::hasTable('personal_pasien')) {
            Schema::create('personal_pasien', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15)->primary();
                $table->string('gambar', 1000)->nullable();
                $table->string('password', 1000)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_pasien');
    }
};
