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
        if (!Schema::hasTable('parkir_barcode')) {
            Schema::create('parkir_barcode', function (Blueprint $table) {
                $table->string('kode_barcode', 15)->primary();
                $table->string('nomer_kartu', 5)->unique('no_card');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parkir_barcode');
    }
};
