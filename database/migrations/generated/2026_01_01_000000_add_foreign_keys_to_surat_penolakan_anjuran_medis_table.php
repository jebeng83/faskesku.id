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
        if (Schema::hasTable('surat_penolakan_anjuran_medis')) {
            Schema::table('surat_penolakan_anjuran_medis', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'surat_penolakan_anjuran_medis_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_penolakan'], 'surat_penolakan_anjuran_medis_ibfk_2')->references(['kode_penolakan'])->on('master_menolak_anjuran_medis')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nik'], 'surat_penolakan_anjuran_medis_ibfk_3')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_penolakan_anjuran_medis')) {
            Schema::table('surat_penolakan_anjuran_medis', function (Blueprint $table) {
                $table->dropForeign('surat_penolakan_anjuran_medis_ibfk_1');
                $table->dropForeign('surat_penolakan_anjuran_medis_ibfk_2');
                $table->dropForeign('surat_penolakan_anjuran_medis_ibfk_3');
            });
        }
    }
};
