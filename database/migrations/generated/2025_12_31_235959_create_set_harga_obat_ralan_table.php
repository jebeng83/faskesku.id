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
        if (! Schema::hasTable('set_harga_obat_ralan')) {
            Schema::create('set_harga_obat_ralan', function (Blueprint $table) {
                $table->char('kd_pj', 3)->primary();
                $table->double('hargajual');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_harga_obat_ralan');
    }
};
