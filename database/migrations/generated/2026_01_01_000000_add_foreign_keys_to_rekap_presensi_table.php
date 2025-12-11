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
        if (Schema::hasTable('rekap_presensi')) {
            Schema::table('rekap_presensi', function (Blueprint $table) {
                $table->foreign(['id'], 'rekap_presensi_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('rekap_presensi')) {
            Schema::table('rekap_presensi', function (Blueprint $table) {
                $table->dropForeign('rekap_presensi_ibfk_1');
            });
        }
    }
};
