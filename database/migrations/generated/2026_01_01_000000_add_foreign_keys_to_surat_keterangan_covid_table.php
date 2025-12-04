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
        if (Schema::hasTable('surat_keterangan_covid')) {
            Schema::table('surat_keterangan_covid', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'surat_keterangan_covid_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'surat_keterangan_covid_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'surat_keterangan_covid_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_keterangan_covid')) {
            Schema::table('surat_keterangan_covid', function (Blueprint $table) {
                $table->dropForeign('surat_keterangan_covid_ibfk_1');
                $table->dropForeign('surat_keterangan_covid_ibfk_2');
                $table->dropForeign('surat_keterangan_covid_ibfk_3');
            });
        }
    }
};
