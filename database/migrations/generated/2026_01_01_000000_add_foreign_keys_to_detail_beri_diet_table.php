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
        if (Schema::hasTable('detail_beri_diet')) {
            Schema::table('detail_beri_diet', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'detail_beri_diet_ibfk_4')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_kamar'], 'detail_beri_diet_ibfk_5')->references(['kd_kamar'])->on('kamar')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_diet'], 'detail_beri_diet_ibfk_6')->references(['kd_diet'])->on('diet')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['waktu'], 'detail_beri_diet_ibfk_7')->references(['waktu'])->on('jam_diet_pasien')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_beri_diet')) {
            Schema::table('detail_beri_diet', function (Blueprint $table) {
                $table->dropForeign('detail_beri_diet_ibfk_4');
                $table->dropForeign('detail_beri_diet_ibfk_5');
                $table->dropForeign('detail_beri_diet_ibfk_6');
                $table->dropForeign('detail_beri_diet_ibfk_7');
            });
        }
    }
};
