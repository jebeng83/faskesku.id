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
        if (Schema::hasTable('temporary_presensi')) {
            Schema::table('temporary_presensi', function (Blueprint $table) {
                $table->foreign(['id'], 'temporary_presensi_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('temporary_presensi')) {
            Schema::table('temporary_presensi', function (Blueprint $table) {
                $table->dropForeign('temporary_presensi_ibfk_1');
            });
        }
    }
};
