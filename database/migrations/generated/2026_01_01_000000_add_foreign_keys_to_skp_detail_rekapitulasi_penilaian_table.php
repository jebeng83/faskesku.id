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
        if (Schema::hasTable('skp_detail_rekapitulasi_penilaian')) {
            Schema::table('skp_detail_rekapitulasi_penilaian', function (Blueprint $table) {
                $table->foreign(['nomor_rekapitulasi'], 'skp_detail_rekapitulasi_penilaian_ibfk_1')->references(['nomor_rekapitulasi'])->on('skp_rekapitulasi_penilaian')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nomor_penilaian'], 'skp_detail_rekapitulasi_penilaian_ibfk_2')->references(['nomor_penilaian'])->on('skp_penilaian')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('skp_detail_rekapitulasi_penilaian')) {
            Schema::table('skp_detail_rekapitulasi_penilaian', function (Blueprint $table) {
                $table->dropForeign('skp_detail_rekapitulasi_penilaian_ibfk_1');
                $table->dropForeign('skp_detail_rekapitulasi_penilaian_ibfk_2');
            });
        }
    }
};
