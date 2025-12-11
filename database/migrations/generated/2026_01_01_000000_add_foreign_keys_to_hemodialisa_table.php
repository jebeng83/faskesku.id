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
        if (Schema::hasTable('hemodialisa')) {
            Schema::table('hemodialisa', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'hemodialisa_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_penyakit'], 'hemodialisa_ibfk_2')->references(['kd_penyakit'])->on('penyakit')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_dokter'], 'hemodialisa_ibfk_3')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('hemodialisa')) {
            Schema::table('hemodialisa', function (Blueprint $table) {
                $table->dropForeign('hemodialisa_ibfk_1');
                $table->dropForeign('hemodialisa_ibfk_2');
                $table->dropForeign('hemodialisa_ibfk_3');
            });
        }
    }
};
