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
        if (Schema::hasTable('piutang_pasien')) {
            Schema::table('piutang_pasien', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'piutang_pasien_ibfk_2')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_rawat'], 'piutang_pasien_ibfk_3')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('piutang_pasien')) {
            Schema::table('piutang_pasien', function (Blueprint $table) {
                $table->dropForeign('piutang_pasien_ibfk_2');
                $table->dropForeign('piutang_pasien_ibfk_3');
            });
        }
    }
};
