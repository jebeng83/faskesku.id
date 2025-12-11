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
        if (Schema::hasTable('layanan_kedokteran_fisik_rehabilitasi')) {
            Schema::table('layanan_kedokteran_fisik_rehabilitasi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'layanan_kedokteran_fisik_rehabilitasi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'layanan_kedokteran_fisik_rehabilitasi_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('layanan_kedokteran_fisik_rehabilitasi')) {
            Schema::table('layanan_kedokteran_fisik_rehabilitasi', function (Blueprint $table) {
                $table->dropForeign('layanan_kedokteran_fisik_rehabilitasi_ibfk_1');
                $table->dropForeign('layanan_kedokteran_fisik_rehabilitasi_ibfk_2');
            });
        }
    }
};
