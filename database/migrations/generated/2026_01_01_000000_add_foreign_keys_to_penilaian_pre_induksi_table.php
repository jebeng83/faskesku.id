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
        if (Schema::hasTable('penilaian_pre_induksi')) {
            Schema::table('penilaian_pre_induksi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'penilaian_pre_induksi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'penilaian_pre_induksi_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('penilaian_pre_induksi')) {
            Schema::table('penilaian_pre_induksi', function (Blueprint $table) {
                $table->dropForeign('penilaian_pre_induksi_ibfk_1');
                $table->dropForeign('penilaian_pre_induksi_ibfk_2');
            });
        }
    }
};
