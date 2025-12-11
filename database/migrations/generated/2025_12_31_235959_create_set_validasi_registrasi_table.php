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
        if (!Schema::hasTable('set_validasi_registrasi')) {
            Schema::create('set_validasi_registrasi', function (Blueprint $table) {
                $table->enum('wajib_closing_kasir', ['Yes', 'No'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_validasi_registrasi');
    }
};
