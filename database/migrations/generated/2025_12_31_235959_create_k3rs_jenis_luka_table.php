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
        if (!Schema::hasTable('k3rs_jenis_luka')) {
            Schema::create('k3rs_jenis_luka', function (Blueprint $table) {
                $table->string('kode_luka', 5)->primary();
                $table->string('jenis_luka', 150)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('k3rs_jenis_luka');
    }
};
