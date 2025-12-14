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
        if (! Schema::hasTable('maping_tindakan_pcare')) {
            Schema::create('maping_tindakan_pcare', function (Blueprint $table) {
                $table->string('kd_jenis_prw', 15)->primary();
                $table->string('kd_tindakan_pcare', 15)->nullable();
                $table->string('nm_tindakan_pcare', 100)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maping_tindakan_pcare');
    }
};
