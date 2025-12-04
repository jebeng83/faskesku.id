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
        if (Schema::hasTable('pemeriksaan_ranap')) {
            Schema::table('pemeriksaan_ranap', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'pemeriksaan_ranap_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'pemeriksaan_ranap_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pemeriksaan_ranap')) {
            Schema::table('pemeriksaan_ranap', function (Blueprint $table) {
                $table->dropForeign('pemeriksaan_ranap_ibfk_1');
                $table->dropForeign('pemeriksaan_ranap_ibfk_2');
            });
        }
    }
};
