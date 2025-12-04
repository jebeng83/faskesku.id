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
        if (Schema::hasTable('template_pemeriksaan_dokter_tindakan')) {
            Schema::table('template_pemeriksaan_dokter_tindakan', function (Blueprint $table) {
                $table->foreign(['kd_jenis_prw'], 'template_pemeriksaan_dokter_tindakan_ibfk_1')->references(['kd_jenis_prw'])->on('jns_perawatan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_template'], 'template_pemeriksaan_dokter_tindakan_ibfk_2')->references(['no_template'])->on('template_pemeriksaan_dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('template_pemeriksaan_dokter_tindakan')) {
            Schema::table('template_pemeriksaan_dokter_tindakan', function (Blueprint $table) {
                $table->dropForeign('template_pemeriksaan_dokter_tindakan_ibfk_1');
                $table->dropForeign('template_pemeriksaan_dokter_tindakan_ibfk_2');
            });
        }
    }
};
