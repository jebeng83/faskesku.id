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
        if (! Schema::hasTable('inhealth_tindakan_operasi')) {
            Schema::create('inhealth_tindakan_operasi', function (Blueprint $table) {
                $table->string('kode_paket', 15)->primary();
                $table->string('kd_inhealth', 20)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inhealth_tindakan_operasi');
    }
};
