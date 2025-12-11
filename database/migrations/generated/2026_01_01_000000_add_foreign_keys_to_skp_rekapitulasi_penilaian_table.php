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
        if (Schema::hasTable('skp_rekapitulasi_penilaian')) {
            Schema::table('skp_rekapitulasi_penilaian', function (Blueprint $table) {
                $table->foreign(['nik_dinilai'], 'skp_rekapitulasi_penilaian_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nik_penilai'], 'skp_rekapitulasi_penilaian_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('skp_rekapitulasi_penilaian')) {
            Schema::table('skp_rekapitulasi_penilaian', function (Blueprint $table) {
                $table->dropForeign('skp_rekapitulasi_penilaian_ibfk_1');
                $table->dropForeign('skp_rekapitulasi_penilaian_ibfk_2');
            });
        }
    }
};
