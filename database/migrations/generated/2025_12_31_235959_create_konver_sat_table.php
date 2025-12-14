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
        if (! Schema::hasTable('konver_sat')) {
            Schema::create('konver_sat', function (Blueprint $table) {
                $table->double('nilai')->index('nilai');
                $table->char('kode_sat', 4)->default('')->index('kode_sat');
                $table->double('nilai_konversi')->index('nilai_konversi');
                $table->char('sat_konversi', 4)->default('');

                $table->primary(['nilai', 'kode_sat', 'nilai_konversi', 'sat_konversi']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konver_sat');
    }
};
