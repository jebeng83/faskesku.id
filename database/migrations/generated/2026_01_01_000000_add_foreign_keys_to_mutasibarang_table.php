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
        if (Schema::hasTable('mutasibarang')) {
            Schema::table('mutasibarang', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'mutasibarang_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsaldari'], 'mutasibarang_ibfk_2')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsalke'], 'mutasibarang_ibfk_3')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('mutasibarang')) {
            Schema::table('mutasibarang', function (Blueprint $table) {
                $table->dropForeign('mutasibarang_ibfk_1');
                $table->dropForeign('mutasibarang_ibfk_2');
                $table->dropForeign('mutasibarang_ibfk_3');
            });
        }
    }
};
