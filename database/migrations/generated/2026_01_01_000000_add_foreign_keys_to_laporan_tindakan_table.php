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
        if (Schema::hasTable('laporan_tindakan')) {
            Schema::table('laporan_tindakan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'laporan_tindakan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'laporan_tindakan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'laporan_tindakan_ibfk_3')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('laporan_tindakan')) {
            Schema::table('laporan_tindakan', function (Blueprint $table) {
                $table->dropForeign('laporan_tindakan_ibfk_1');
                $table->dropForeign('laporan_tindakan_ibfk_2');
                $table->dropForeign('laporan_tindakan_ibfk_3');
            });
        }
    }
};
