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
        if (!Schema::hasTable('permintaan_registrasi')) {
            Schema::create('permintaan_registrasi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->double('biaya');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_registrasi');
    }
};
