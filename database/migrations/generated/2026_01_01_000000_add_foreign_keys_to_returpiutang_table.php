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
        if (Schema::hasTable('returpiutang')) {
            Schema::table('returpiutang', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'returpiutang_ibfk_4')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_bangsal'], 'returpiutang_ibfk_5')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'returpiutang_ibfk_6')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('returpiutang')) {
            Schema::table('returpiutang', function (Blueprint $table) {
                $table->dropForeign('returpiutang_ibfk_4');
                $table->dropForeign('returpiutang_ibfk_5');
                $table->dropForeign('returpiutang_ibfk_6');
            });
        }
    }
};
