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
        if (Schema::hasTable('konsultasi_medik')) {
            Schema::table('konsultasi_medik', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'konsultasi_medik_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'konsultasi_medik_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter_dikonsuli'], 'konsultasi_medik_ibfk_3')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('konsultasi_medik')) {
            Schema::table('konsultasi_medik', function (Blueprint $table) {
                $table->dropForeign('konsultasi_medik_ibfk_1');
                $table->dropForeign('konsultasi_medik_ibfk_2');
                $table->dropForeign('konsultasi_medik_ibfk_3');
            });
        }
    }
};
