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
        if (Schema::hasTable('pengajuan_biaya')) {
            Schema::table('pengajuan_biaya', function (Blueprint $table) {
                $table->foreign(['nik'], 'pengajuan_biaya_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nik_pj'], 'pengajuan_biaya_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pengajuan_biaya')) {
            Schema::table('pengajuan_biaya', function (Blueprint $table) {
                $table->dropForeign('pengajuan_biaya_ibfk_1');
                $table->dropForeign('pengajuan_biaya_ibfk_2');
            });
        }
    }
};
