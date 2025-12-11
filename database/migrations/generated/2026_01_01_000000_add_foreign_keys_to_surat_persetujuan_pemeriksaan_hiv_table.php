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
        if (Schema::hasTable('surat_persetujuan_pemeriksaan_hiv')) {
            Schema::table('surat_persetujuan_pemeriksaan_hiv', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'surat_persetujuan_pemeriksaan_hiv_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nik'], 'surat_persetujuan_pemeriksaan_hiv_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_persetujuan_pemeriksaan_hiv')) {
            Schema::table('surat_persetujuan_pemeriksaan_hiv', function (Blueprint $table) {
                $table->dropForeign('surat_persetujuan_pemeriksaan_hiv_ibfk_1');
                $table->dropForeign('surat_persetujuan_pemeriksaan_hiv_ibfk_2');
            });
        }
    }
};
