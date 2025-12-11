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
        if (!Schema::hasTable('inhealth_maping_poli')) {
            Schema::create('inhealth_maping_poli', function (Blueprint $table) {
                $table->string('kd_poli_rs', 5)->primary();
                $table->string('kd_poli_inhealth', 15)->nullable();
                $table->string('nm_poli_inhealth', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inhealth_maping_poli');
    }
};
