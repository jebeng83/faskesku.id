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
        if (! Schema::hasTable('diet')) {
            Schema::create('diet', function (Blueprint $table) {
                $table->string('kd_diet', 3)->primary();
                $table->string('nama_diet', 50)->index('nama_diet');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diet');
    }
};
