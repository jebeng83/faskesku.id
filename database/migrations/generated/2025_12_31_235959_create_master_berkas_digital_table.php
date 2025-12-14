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
        if (! Schema::hasTable('master_berkas_digital')) {
            Schema::create('master_berkas_digital', function (Blueprint $table) {
                $table->string('kode', 10)->primary();
                $table->string('nama', 100)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_berkas_digital');
    }
};
