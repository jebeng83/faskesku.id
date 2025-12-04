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
        if (Schema::hasTable('detail_pengeluaran_obat_bhp')) {
            Schema::table('detail_pengeluaran_obat_bhp', function (Blueprint $table) {
                $table->foreign(['no_keluar'], 'detail_pengeluaran_obat_bhp_ibfk_1')->references(['no_keluar'])->on('pengeluaran_obat_bhp')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'detail_pengeluaran_obat_bhp_ibfk_2')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_brng'], 'detail_pengeluaran_obat_bhp_ibfk_3')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_pengeluaran_obat_bhp')) {
            Schema::table('detail_pengeluaran_obat_bhp', function (Blueprint $table) {
                $table->dropForeign('detail_pengeluaran_obat_bhp_ibfk_1');
                $table->dropForeign('detail_pengeluaran_obat_bhp_ibfk_2');
                $table->dropForeign('detail_pengeluaran_obat_bhp_ibfk_3');
            });
        }
    }
};
