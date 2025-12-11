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
        if (Schema::hasTable('inventaris_detail_hibah')) {
            Schema::table('inventaris_detail_hibah', function (Blueprint $table) {
                $table->foreign(['kode_barang'], 'inventaris_detail_hibah_ibfk_1')->references(['kode_barang'])->on('inventaris_barang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_hibah'], 'inventaris_detail_hibah_ibfk_2')->references(['no_hibah'])->on('inventaris_hibah')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inventaris_detail_hibah')) {
            Schema::table('inventaris_detail_hibah', function (Blueprint $table) {
                $table->dropForeign('inventaris_detail_hibah_ibfk_1');
                $table->dropForeign('inventaris_detail_hibah_ibfk_2');
            });
        }
    }
};
