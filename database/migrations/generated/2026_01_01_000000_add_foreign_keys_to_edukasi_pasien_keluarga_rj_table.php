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
        if (Schema::hasTable('edukasi_pasien_keluarga_rj')) {
            Schema::table('edukasi_pasien_keluarga_rj', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'edukasi_pasien_keluarga_rj_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'edukasi_pasien_keluarga_rj_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('edukasi_pasien_keluarga_rj')) {
            Schema::table('edukasi_pasien_keluarga_rj', function (Blueprint $table) {
                $table->dropForeign('edukasi_pasien_keluarga_rj_ibfk_1');
                $table->dropForeign('edukasi_pasien_keluarga_rj_ibfk_2');
            });
        }
    }
};
