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
        if (Schema::hasTable('tokobarang')) {
            Schema::table('tokobarang', function (Blueprint $table) {
                $table->foreign(['kode_sat'], 'tokobarang_ibfk_1')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['jenis'], 'tokobarang_ibfk_2')->references(['kd_jenis'])->on('tokojenisbarang')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tokobarang')) {
            Schema::table('tokobarang', function (Blueprint $table) {
                $table->dropForeign('tokobarang_ibfk_1');
                $table->dropForeign('tokobarang_ibfk_2');
            });
        }
    }
};
