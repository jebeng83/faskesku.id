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
        if (!Schema::hasTable('temporary_surveilens_penyakit')) {
            Schema::create('temporary_surveilens_penyakit', function (Blueprint $table) {
                $table->string('kd_penyakit', 15)->index('kd_penyakit');
                $table->string('kd_penyakit2', 15)->index('kd_penyakit2');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temporary_surveilens_penyakit');
    }
};
