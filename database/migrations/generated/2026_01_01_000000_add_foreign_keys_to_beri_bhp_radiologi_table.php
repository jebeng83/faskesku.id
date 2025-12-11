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
        if (Schema::hasTable('beri_bhp_radiologi')) {
            Schema::table('beri_bhp_radiologi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'beri_bhp_radiologi_ibfk_4')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_brng'], 'beri_bhp_radiologi_ibfk_5')->references(['kode_brng'])->on('ipsrsbarang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_sat'], 'beri_bhp_radiologi_ibfk_6')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('beri_bhp_radiologi')) {
            Schema::table('beri_bhp_radiologi', function (Blueprint $table) {
                $table->dropForeign('beri_bhp_radiologi_ibfk_4');
                $table->dropForeign('beri_bhp_radiologi_ibfk_5');
                $table->dropForeign('beri_bhp_radiologi_ibfk_6');
            });
        }
    }
};
