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
        if (!Schema::hasTable('surat_klasifikasi')) {
            Schema::create('surat_klasifikasi', function (Blueprint $table) {
                $table->string('kd', 5)->primary();
                $table->string('klasifikasi', 50);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_klasifikasi');
    }
};
