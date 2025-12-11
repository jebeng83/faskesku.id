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
        if (Schema::hasTable('skp_detail_penilaian')) {
            Schema::table('skp_detail_penilaian', function (Blueprint $table) {
                $table->foreign(['nomor_penilaian'], 'skp_detail_penilaian_ibfk_1')->references(['nomor_penilaian'])->on('skp_penilaian')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_kriteria'], 'skp_detail_penilaian_ibfk_2')->references(['kode_kriteria'])->on('skp_kriteria_penilaian')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('skp_detail_penilaian')) {
            Schema::table('skp_detail_penilaian', function (Blueprint $table) {
                $table->dropForeign('skp_detail_penilaian_ibfk_1');
                $table->dropForeign('skp_detail_penilaian_ibfk_2');
            });
        }
    }
};
