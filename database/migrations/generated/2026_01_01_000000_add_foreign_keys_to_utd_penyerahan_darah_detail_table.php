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
        if (Schema::hasTable('utd_penyerahan_darah_detail')) {
            Schema::table('utd_penyerahan_darah_detail', function (Blueprint $table) {
                $table->foreign(['no_penyerahan'], 'utd_penyerahan_darah_detail_ibfk_1')->references(['no_penyerahan'])->on('utd_penyerahan_darah')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_kantong'], 'utd_penyerahan_darah_detail_ibfk_2')->references(['no_kantong'])->on('utd_stok_darah')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_penyerahan_darah_detail')) {
            Schema::table('utd_penyerahan_darah_detail', function (Blueprint $table) {
                $table->dropForeign('utd_penyerahan_darah_detail_ibfk_1');
                $table->dropForeign('utd_penyerahan_darah_detail_ibfk_2');
            });
        }
    }
};
