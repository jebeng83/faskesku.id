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
        if (Schema::hasTable('detailpiutang')) {
            Schema::table('detailpiutang', function (Blueprint $table) {
                $table->foreign(['nota_piutang'], 'detailpiutang_ibfk_1')->references(['nota_piutang'])->on('piutang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'detailpiutang_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_sat'], 'detailpiutang_ibfk_3')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detailpiutang')) {
            Schema::table('detailpiutang', function (Blueprint $table) {
                $table->dropForeign('detailpiutang_ibfk_1');
                $table->dropForeign('detailpiutang_ibfk_2');
                $table->dropForeign('detailpiutang_ibfk_3');
            });
        }
    }
};
