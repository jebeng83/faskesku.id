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
        if (Schema::hasTable('detailhibah_obat_bhp')) {
            Schema::table('detailhibah_obat_bhp', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'detailhibah_obat_bhp_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_sat'], 'detailhibah_obat_bhp_ibfk_2')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_hibah'], 'detailhibah_obat_bhp_ibfk_3')->references(['no_hibah'])->on('hibah_obat_bhp')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detailhibah_obat_bhp')) {
            Schema::table('detailhibah_obat_bhp', function (Blueprint $table) {
                $table->dropForeign('detailhibah_obat_bhp_ibfk_1');
                $table->dropForeign('detailhibah_obat_bhp_ibfk_2');
                $table->dropForeign('detailhibah_obat_bhp_ibfk_3');
            });
        }
    }
};
