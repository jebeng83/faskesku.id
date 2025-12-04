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
        if (Schema::hasTable('riwayat_surat_peringatan')) {
            Schema::table('riwayat_surat_peringatan', function (Blueprint $table) {
                $table->foreign(['id'], 'riwayat_surat_peringatan_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('riwayat_surat_peringatan')) {
            Schema::table('riwayat_surat_peringatan', function (Blueprint $table) {
                $table->dropForeign('riwayat_surat_peringatan_ibfk_1');
            });
        }
    }
};
