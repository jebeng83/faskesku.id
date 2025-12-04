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
        if (!Schema::hasTable('perkiraan_biaya_ranap')) {
            Schema::create('perkiraan_biaya_ranap', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->string('kd_penyakit', 15)->index('kd_penyakit');
                $table->double('tarif');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perkiraan_biaya_ranap');
    }
};
