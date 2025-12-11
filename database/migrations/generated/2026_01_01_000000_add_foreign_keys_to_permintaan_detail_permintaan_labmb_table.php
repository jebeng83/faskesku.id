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
        if (Schema::hasTable('permintaan_detail_permintaan_labmb')) {
            Schema::table('permintaan_detail_permintaan_labmb', function (Blueprint $table) {
                $table->foreign(['kd_jenis_prw'], 'permintaan_detail_permintaan_labmb_ibfk_1')->references(['kd_jenis_prw'])->on('jns_perawatan_lab')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['id_template'], 'permintaan_detail_permintaan_labmb_ibfk_2')->references(['id_template'])->on('template_laboratorium')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['noorder'], 'permintaan_detail_permintaan_labmb_ibfk_3')->references(['noorder'])->on('permintaan_labmb')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('permintaan_detail_permintaan_labmb')) {
            Schema::table('permintaan_detail_permintaan_labmb', function (Blueprint $table) {
                $table->dropForeign('permintaan_detail_permintaan_labmb_ibfk_1');
                $table->dropForeign('permintaan_detail_permintaan_labmb_ibfk_2');
                $table->dropForeign('permintaan_detail_permintaan_labmb_ibfk_3');
            });
        }
    }
};
