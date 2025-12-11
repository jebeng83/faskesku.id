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
        if (Schema::hasTable('kategori_pemasukan_lain')) {
            Schema::table('kategori_pemasukan_lain', function (Blueprint $table) {
                $table->foreign(['kd_rek'], 'kategori_pemasukan_lain_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek2'], 'kategori_pemasukan_lain_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('kategori_pemasukan_lain')) {
            Schema::table('kategori_pemasukan_lain', function (Blueprint $table) {
                $table->dropForeign('kategori_pemasukan_lain_ibfk_1');
                $table->dropForeign('kategori_pemasukan_lain_ibfk_2');
            });
        }
    }
};
