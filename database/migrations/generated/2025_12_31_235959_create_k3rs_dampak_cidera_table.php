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
        if (!Schema::hasTable('k3rs_dampak_cidera')) {
            Schema::create('k3rs_dampak_cidera', function (Blueprint $table) {
                $table->string('kode_dampak', 5)->primary();
                $table->string('dampak_cidera', 150)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('k3rs_dampak_cidera');
    }
};
