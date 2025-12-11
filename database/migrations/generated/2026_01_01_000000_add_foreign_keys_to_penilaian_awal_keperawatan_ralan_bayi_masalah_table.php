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
        if (Schema::hasTable('penilaian_awal_keperawatan_ralan_bayi_masalah')) {
            Schema::table('penilaian_awal_keperawatan_ralan_bayi_masalah', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'penilaian_awal_keperawatan_ralan_bayi_masalah_ibfk_1')->references(['no_rawat'])->on('penilaian_awal_keperawatan_ralan_bayi')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_masalah'], 'penilaian_awal_keperawatan_ralan_bayi_masalah_ibfk_2')->references(['kode_masalah'])->on('master_masalah_keperawatan_anak')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('penilaian_awal_keperawatan_ralan_bayi_masalah')) {
            Schema::table('penilaian_awal_keperawatan_ralan_bayi_masalah', function (Blueprint $table) {
                $table->dropForeign('penilaian_awal_keperawatan_ralan_bayi_masalah_ibfk_1');
                $table->dropForeign('penilaian_awal_keperawatan_ralan_bayi_masalah_ibfk_2');
            });
        }
    }
};
