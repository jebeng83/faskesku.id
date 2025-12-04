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
        if (Schema::hasTable('inventaris_barang')) {
            Schema::table('inventaris_barang', function (Blueprint $table) {
                $table->foreign(['kode_produsen'], 'inventaris_barang_ibfk_5')->references(['kode_produsen'])->on('inventaris_produsen')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['id_merk'], 'inventaris_barang_ibfk_6')->references(['id_merk'])->on('inventaris_merk')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['id_kategori'], 'inventaris_barang_ibfk_7')->references(['id_kategori'])->on('inventaris_kategori')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['id_jenis'], 'inventaris_barang_ibfk_8')->references(['id_jenis'])->on('inventaris_jenis')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inventaris_barang')) {
            Schema::table('inventaris_barang', function (Blueprint $table) {
                $table->dropForeign('inventaris_barang_ibfk_5');
                $table->dropForeign('inventaris_barang_ibfk_6');
                $table->dropForeign('inventaris_barang_ibfk_7');
                $table->dropForeign('inventaris_barang_ibfk_8');
            });
        }
    }
};
