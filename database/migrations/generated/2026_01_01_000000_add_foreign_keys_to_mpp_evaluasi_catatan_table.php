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
        if (Schema::hasTable('mpp_evaluasi_catatan')) {
            Schema::table('mpp_evaluasi_catatan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'mpp_evaluasi_catatan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'mpp_evaluasi_catatan_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('mpp_evaluasi_catatan')) {
            Schema::table('mpp_evaluasi_catatan', function (Blueprint $table) {
                $table->dropForeign('mpp_evaluasi_catatan_ibfk_1');
                $table->dropForeign('mpp_evaluasi_catatan_ibfk_2');
            });
        }
    }
};
