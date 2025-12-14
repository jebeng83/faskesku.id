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
        if (! Schema::hasTable('inhealth_maping_dokter')) {
            Schema::create('inhealth_maping_dokter', function (Blueprint $table) {
                $table->string('kd_dokter', 20)->primary();
                $table->string('kd_inhealth', 20)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inhealth_maping_dokter');
    }
};
