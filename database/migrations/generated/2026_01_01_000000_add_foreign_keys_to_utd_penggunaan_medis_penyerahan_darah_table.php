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
        if (Schema::hasTable('utd_penggunaan_medis_penyerahan_darah')) {
            Schema::table('utd_penggunaan_medis_penyerahan_darah', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'utd_penggunaan_medis_penyerahan_darah_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_penyerahan'], 'utd_penggunaan_medis_penyerahan_darah_ibfk_2')->references(['no_penyerahan'])->on('utd_penyerahan_darah')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_penggunaan_medis_penyerahan_darah')) {
            Schema::table('utd_penggunaan_medis_penyerahan_darah', function (Blueprint $table) {
                $table->dropForeign('utd_penggunaan_medis_penyerahan_darah_ibfk_1');
                $table->dropForeign('utd_penggunaan_medis_penyerahan_darah_ibfk_2');
            });
        }
    }
};
