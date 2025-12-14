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
        if (! Schema::hasTable('inhealth_tindakan_radiologi')) {
            Schema::create('inhealth_tindakan_radiologi', function (Blueprint $table) {
                $table->string('kd_jenis_prw', 15)->primary();
                $table->string('kd_inhealth', 20)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inhealth_tindakan_radiologi');
    }
};
