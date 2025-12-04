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
        if (Schema::hasTable('inventaris_pemesanan')) {
            Schema::table('inventaris_pemesanan', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'inventaris_pemesanan_ibfk_1')->references(['kode_suplier'])->on('inventaris_suplier')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'inventaris_pemesanan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inventaris_pemesanan')) {
            Schema::table('inventaris_pemesanan', function (Blueprint $table) {
                $table->dropForeign('inventaris_pemesanan_ibfk_1');
                $table->dropForeign('inventaris_pemesanan_ibfk_2');
            });
        }
    }
};
