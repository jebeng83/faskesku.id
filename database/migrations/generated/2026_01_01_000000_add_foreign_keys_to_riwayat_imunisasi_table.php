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
        if (Schema::hasTable('riwayat_imunisasi')) {
            Schema::table('riwayat_imunisasi', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'riwayat_imunisasi_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_imunisasi'], 'riwayat_imunisasi_ibfk_2')->references(['kode_imunisasi'])->on('master_imunisasi')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('riwayat_imunisasi')) {
            Schema::table('riwayat_imunisasi', function (Blueprint $table) {
                $table->dropForeign('riwayat_imunisasi_ibfk_1');
                $table->dropForeign('riwayat_imunisasi_ibfk_2');
            });
        }
    }
};
