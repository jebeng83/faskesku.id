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
        if (Schema::hasTable('permintaan_perbaikan_inventaris')) {
            Schema::table('permintaan_perbaikan_inventaris', function (Blueprint $table) {
                $table->foreign(['no_inventaris'], 'permintaan_perbaikan_inventaris_ibfk_1')->references(['no_inventaris'])->on('inventaris')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nik'], 'permintaan_perbaikan_inventaris_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('permintaan_perbaikan_inventaris')) {
            Schema::table('permintaan_perbaikan_inventaris', function (Blueprint $table) {
                $table->dropForeign('permintaan_perbaikan_inventaris_ibfk_1');
                $table->dropForeign('permintaan_perbaikan_inventaris_ibfk_2');
            });
        }
    }
};
