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
        if (Schema::hasTable('periksa_radiologi')) {
            Schema::table('periksa_radiologi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'periksa_radiologi_ibfk_4')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'periksa_radiologi_ibfk_5')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_jenis_prw'], 'periksa_radiologi_ibfk_6')->references(['kd_jenis_prw'])->on('jns_perawatan_radiologi')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_dokter'], 'periksa_radiologi_ibfk_7')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['dokter_perujuk'], 'periksa_radiologi_ibfk_8')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('periksa_radiologi')) {
            Schema::table('periksa_radiologi', function (Blueprint $table) {
                $table->dropForeign('periksa_radiologi_ibfk_4');
                $table->dropForeign('periksa_radiologi_ibfk_5');
                $table->dropForeign('periksa_radiologi_ibfk_6');
                $table->dropForeign('periksa_radiologi_ibfk_7');
                $table->dropForeign('periksa_radiologi_ibfk_8');
            });
        }
    }
};
