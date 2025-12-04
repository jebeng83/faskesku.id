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
        if (Schema::hasTable('detailjual')) {
            Schema::table('detailjual', function (Blueprint $table) {
                $table->foreign(['nota_jual'], 'detailjual_ibfk_1')->references(['nota_jual'])->on('penjualan')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'detailjual_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_sat'], 'detailjual_ibfk_3')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detailjual')) {
            Schema::table('detailjual', function (Blueprint $table) {
                $table->dropForeign('detailjual_ibfk_1');
                $table->dropForeign('detailjual_ibfk_2');
                $table->dropForeign('detailjual_ibfk_3');
            });
        }
    }
};
