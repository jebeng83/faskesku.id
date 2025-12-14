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
        if (! Schema::hasTable('master_rencana_keperawatan_neonatus')) {
            Schema::create('master_rencana_keperawatan_neonatus', function (Blueprint $table) {
                $table->string('kode_masalah', 3)->index('kode_masalah');
                $table->string('kode_rencana', 3)->primary();
                $table->string('rencana_keperawatan', 1000);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_rencana_keperawatan_neonatus');
    }
};
