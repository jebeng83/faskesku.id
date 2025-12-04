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
        if (Schema::hasTable('ipsrspembelian')) {
            Schema::table('ipsrspembelian', function (Blueprint $table) {
                $table->foreign(['nip'], 'ipsrspembelian_ibfk_4')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'ipsrspembelian_ibfk_5')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_suplier'], 'ipsrspembelian_ibfk_6')->references(['kode_suplier'])->on('ipsrssuplier')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ipsrspembelian')) {
            Schema::table('ipsrspembelian', function (Blueprint $table) {
                $table->dropForeign('ipsrspembelian_ibfk_4');
                $table->dropForeign('ipsrspembelian_ibfk_5');
                $table->dropForeign('ipsrspembelian_ibfk_6');
            });
        }
    }
};
