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
        if (Schema::hasTable('detreturpiutang')) {
            Schema::table('detreturpiutang', function (Blueprint $table) {
                $table->foreign(['no_retur_piutang'], 'detreturpiutang_ibfk_4')->references(['no_retur_piutang'])->on('returpiutang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'detreturpiutang_ibfk_5')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'detreturpiutang_ibfk_6')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detreturpiutang')) {
            Schema::table('detreturpiutang', function (Blueprint $table) {
                $table->dropForeign('detreturpiutang_ibfk_4');
                $table->dropForeign('detreturpiutang_ibfk_5');
                $table->dropForeign('detreturpiutang_ibfk_6');
            });
        }
    }
};
