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
        if (! Schema::hasTable('maping_poli_bpjs')) {
            Schema::create('maping_poli_bpjs', function (Blueprint $table) {
                $table->string('kd_poli_rs', 5)->primary();
                $table->string('kd_poli_bpjs', 15)->unique('kd_poli_bpjs');
                $table->string('nm_poli_bpjs', 40);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maping_poli_bpjs');
    }
};
