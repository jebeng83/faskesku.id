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
        if (! Schema::hasTable('master_imunisasi')) {
            Schema::create('master_imunisasi', function (Blueprint $table) {
                $table->string('kode_imunisasi', 3)->primary();
                $table->string('nama_imunisasi', 100)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_imunisasi');
    }
};
