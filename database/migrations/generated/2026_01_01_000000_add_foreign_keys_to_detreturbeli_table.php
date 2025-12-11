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
        if (Schema::hasTable('detreturbeli')) {
            Schema::table('detreturbeli', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'detreturbeli_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_retur_beli'], 'detreturbeli_ibfk_3')->references(['no_retur_beli'])->on('returbeli')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'detreturbeli_ibfk_4')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detreturbeli')) {
            Schema::table('detreturbeli', function (Blueprint $table) {
                $table->dropForeign('detreturbeli_ibfk_2');
                $table->dropForeign('detreturbeli_ibfk_3');
                $table->dropForeign('detreturbeli_ibfk_4');
            });
        }
    }
};
