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
        if (! Schema::hasTable('parkir_jenis')) {
            Schema::create('parkir_jenis', function (Blueprint $table) {
                $table->char('kd_parkir', 5)->primary();
                $table->string('jns_parkir', 50);
                $table->double('biaya');
                $table->enum('jenis', ['Harian', 'Jam']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parkir_jenis');
    }
};
