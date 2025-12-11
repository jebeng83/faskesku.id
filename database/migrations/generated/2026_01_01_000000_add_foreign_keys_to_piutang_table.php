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
        if (Schema::hasTable('piutang')) {
            Schema::table('piutang', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'piutang_ibfk_2')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_bangsal'], 'piutang_ibfk_3')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'piutang_ibfk_4')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('piutang')) {
            Schema::table('piutang', function (Blueprint $table) {
                $table->dropForeign('piutang_ibfk_2');
                $table->dropForeign('piutang_ibfk_3');
                $table->dropForeign('piutang_ibfk_4');
            });
        }
    }
};
