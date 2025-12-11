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
        if (!Schema::hasTable('ipsrsjenisbarang')) {
            Schema::create('ipsrsjenisbarang', function (Blueprint $table) {
                $table->char('kd_jenis', 5)->primary();
                $table->string('nm_jenis', 50)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ipsrsjenisbarang');
    }
};
