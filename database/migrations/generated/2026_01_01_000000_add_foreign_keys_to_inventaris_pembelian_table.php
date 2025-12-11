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
        if (Schema::hasTable('inventaris_pembelian')) {
            Schema::table('inventaris_pembelian', function (Blueprint $table) {
                $table->foreign(['nip'], 'inventaris_pembelian_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'inventaris_pembelian_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_suplier'], 'inventaris_pembelian_ibfk_3')->references(['kode_suplier'])->on('inventaris_suplier')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek_aset'], 'inventaris_pembelian_ibfk_4')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inventaris_pembelian')) {
            Schema::table('inventaris_pembelian', function (Blueprint $table) {
                $table->dropForeign('inventaris_pembelian_ibfk_1');
                $table->dropForeign('inventaris_pembelian_ibfk_2');
                $table->dropForeign('inventaris_pembelian_ibfk_3');
                $table->dropForeign('inventaris_pembelian_ibfk_4');
            });
        }
    }
};
