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
        if (Schema::hasTable('pnm_tnj_harian')) {
            Schema::table('pnm_tnj_harian', function (Blueprint $table) {
                $table->foreign(['id'], 'pnm_tnj_harian_ibfk_5')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['id_tnj'], 'pnm_tnj_harian_ibfk_6')->references(['id'])->on('master_tunjangan_harian')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pnm_tnj_harian')) {
            Schema::table('pnm_tnj_harian', function (Blueprint $table) {
                $table->dropForeign('pnm_tnj_harian_ibfk_5');
                $table->dropForeign('pnm_tnj_harian_ibfk_6');
            });
        }
    }
};
