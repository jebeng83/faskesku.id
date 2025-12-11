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
        if (!Schema::hasTable('bridging_dukcapil')) {
            Schema::create('bridging_dukcapil', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15)->primary();
                $table->string('no_id', 10)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bridging_dukcapil');
    }
};
