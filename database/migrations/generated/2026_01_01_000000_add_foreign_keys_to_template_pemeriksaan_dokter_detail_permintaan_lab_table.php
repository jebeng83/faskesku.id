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
        if (Schema::hasTable('template_pemeriksaan_dokter_detail_permintaan_lab')) {
            Schema::table('template_pemeriksaan_dokter_detail_permintaan_lab', function (Blueprint $table) {
                $table->foreign(['no_template'], 'template_pemeriksaan_dokter_detail_permintaan_lab_ibfk_1')->references(['no_template'])->on('template_pemeriksaan_dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_jenis_prw'], 'template_pemeriksaan_dokter_detail_permintaan_lab_ibfk_2')->references(['kd_jenis_prw'])->on('jns_perawatan_lab')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['id_template'], 'template_pemeriksaan_dokter_detail_permintaan_lab_ibfk_3')->references(['id_template'])->on('template_laboratorium')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('template_pemeriksaan_dokter_detail_permintaan_lab')) {
            Schema::table('template_pemeriksaan_dokter_detail_permintaan_lab', function (Blueprint $table) {
                $table->dropForeign('template_pemeriksaan_dokter_detail_permintaan_lab_ibfk_1');
                $table->dropForeign('template_pemeriksaan_dokter_detail_permintaan_lab_ibfk_2');
                $table->dropForeign('template_pemeriksaan_dokter_detail_permintaan_lab_ibfk_3');
            });
        }
    }
};
