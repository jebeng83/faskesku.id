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
        if (Schema::hasTable('peminjaman_berkas')) {
            Schema::table('peminjaman_berkas', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'peminjaman_berkas_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'peminjaman_berkas_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['id_ruang'], 'peminjaman_berkas_ibfk_3')->references(['id_ruang'])->on('inventaris_ruang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('peminjaman_berkas')) {
            Schema::table('peminjaman_berkas', function (Blueprint $table) {
                $table->dropForeign('peminjaman_berkas_ibfk_1');
                $table->dropForeign('peminjaman_berkas_ibfk_2');
                $table->dropForeign('peminjaman_berkas_ibfk_3');
            });
        }
    }
};
