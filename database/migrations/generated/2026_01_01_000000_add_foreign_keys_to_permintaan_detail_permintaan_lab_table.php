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
        if (Schema::hasTable('permintaan_detail_permintaan_lab')) {
            Schema::table('permintaan_detail_permintaan_lab', function (Blueprint $table) {
                $table->foreign(['kd_jenis_prw'], 'permintaan_detail_permintaan_lab_ibfk_2')->references(['kd_jenis_prw'])->on('jns_perawatan_lab')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['id_template'], 'permintaan_detail_permintaan_lab_ibfk_3')->references(['id_template'])->on('template_laboratorium')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['noorder'], 'permintaan_detail_permintaan_lab_ibfk_4')->references(['noorder'])->on('permintaan_lab')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('permintaan_detail_permintaan_lab')) {
            Schema::table('permintaan_detail_permintaan_lab', function (Blueprint $table) {
                $table->dropForeign('permintaan_detail_permintaan_lab_ibfk_2');
                $table->dropForeign('permintaan_detail_permintaan_lab_ibfk_3');
                $table->dropForeign('permintaan_detail_permintaan_lab_ibfk_4');
            });
        }
    }
};
