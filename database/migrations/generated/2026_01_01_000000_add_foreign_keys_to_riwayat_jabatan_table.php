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
        if (Schema::hasTable('riwayat_jabatan')) {
            Schema::table('riwayat_jabatan', function (Blueprint $table) {
                $table->foreign(['id'], 'riwayat_jabatan_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('riwayat_jabatan')) {
            Schema::table('riwayat_jabatan', function (Blueprint $table) {
                $table->dropForeign('riwayat_jabatan_ibfk_1');
            });
        }
    }
};
