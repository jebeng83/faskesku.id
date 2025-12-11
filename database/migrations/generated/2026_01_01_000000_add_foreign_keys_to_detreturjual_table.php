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
        if (Schema::hasTable('detreturjual')) {
            Schema::table('detreturjual', function (Blueprint $table) {
                $table->foreign(['no_retur_jual'], 'detreturjual_ibfk_1')->references(['no_retur_jual'])->on('returjual')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'detreturjual_ibfk_3')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'detreturjual_ibfk_4')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detreturjual')) {
            Schema::table('detreturjual', function (Blueprint $table) {
                $table->dropForeign('detreturjual_ibfk_1');
                $table->dropForeign('detreturjual_ibfk_3');
                $table->dropForeign('detreturjual_ibfk_4');
            });
        }
    }
};
