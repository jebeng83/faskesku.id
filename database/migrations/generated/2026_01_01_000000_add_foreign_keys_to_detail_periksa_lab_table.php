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
        if (Schema::hasTable('detail_periksa_lab')) {
            Schema::table('detail_periksa_lab', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'detail_periksa_lab_ibfk_10')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_jenis_prw'], 'detail_periksa_lab_ibfk_11')->references(['kd_jenis_prw'])->on('jns_perawatan_lab')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['id_template'], 'detail_periksa_lab_ibfk_12')->references(['id_template'])->on('template_laboratorium')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_periksa_lab')) {
            Schema::table('detail_periksa_lab', function (Blueprint $table) {
                $table->dropForeign('detail_periksa_lab_ibfk_10');
                $table->dropForeign('detail_periksa_lab_ibfk_11');
                $table->dropForeign('detail_periksa_lab_ibfk_12');
            });
        }
    }
};
