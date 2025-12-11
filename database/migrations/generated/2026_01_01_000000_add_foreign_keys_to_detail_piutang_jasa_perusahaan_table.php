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
        if (Schema::hasTable('detail_piutang_jasa_perusahaan')) {
            Schema::table('detail_piutang_jasa_perusahaan', function (Blueprint $table) {
                $table->foreign(['no_piutang'], 'detail_piutang_jasa_perusahaan_ibfk_1')->references(['no_piutang'])->on('piutang_jasa_perusahaan')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_kategori'], 'detail_piutang_jasa_perusahaan_ibfk_2')->references(['kode_kategori'])->on('kategori_piutang_jasa_perusahaan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_piutang_jasa_perusahaan')) {
            Schema::table('detail_piutang_jasa_perusahaan', function (Blueprint $table) {
                $table->dropForeign('detail_piutang_jasa_perusahaan_ibfk_1');
                $table->dropForeign('detail_piutang_jasa_perusahaan_ibfk_2');
            });
        }
    }
};
