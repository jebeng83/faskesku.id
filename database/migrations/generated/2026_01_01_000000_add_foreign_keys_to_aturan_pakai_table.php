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
        if (Schema::hasTable('aturan_pakai')) {
            Schema::table('aturan_pakai', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'aturan_pakai_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'aturan_pakai_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('aturan_pakai')) {
            Schema::table('aturan_pakai', function (Blueprint $table) {
                $table->dropForeign('aturan_pakai_ibfk_1');
                $table->dropForeign('aturan_pakai_ibfk_2');
            });
        }
    }
};
