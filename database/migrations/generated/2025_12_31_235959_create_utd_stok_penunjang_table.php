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
        if (! Schema::hasTable('utd_stok_penunjang')) {
            Schema::create('utd_stok_penunjang', function (Blueprint $table) {
                $table->string('kode_brng', 15)->default('')->primary();
                $table->double('stok')->nullable();
                $table->double('hargaterakhir')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utd_stok_penunjang');
    }
};
