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
        if (Schema::hasTable('ipsrspemesanan')) {
            Schema::table('ipsrspemesanan', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'ipsrspemesanan_ibfk_1')->references(['kode_suplier'])->on('ipsrssuplier')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'ipsrspemesanan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ipsrspemesanan')) {
            Schema::table('ipsrspemesanan', function (Blueprint $table) {
                $table->dropForeign('ipsrspemesanan_ibfk_1');
                $table->dropForeign('ipsrspemesanan_ibfk_2');
            });
        }
    }
};
