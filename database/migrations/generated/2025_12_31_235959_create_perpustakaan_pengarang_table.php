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
        if (!Schema::hasTable('perpustakaan_pengarang')) {
            Schema::create('perpustakaan_pengarang', function (Blueprint $table) {
                $table->string('kode_pengarang', 7)->primary();
                $table->string('nama_pengarang', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perpustakaan_pengarang');
    }
};
