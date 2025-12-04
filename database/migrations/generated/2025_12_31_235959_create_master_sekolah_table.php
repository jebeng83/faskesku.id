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
        if (!Schema::hasTable('master_sekolah')) {
            Schema::create('master_sekolah', function (Blueprint $table) {
                $table->string('kd_sekolah', 5)->primary();
                $table->string('nm_sekolah', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_sekolah');
    }
};
