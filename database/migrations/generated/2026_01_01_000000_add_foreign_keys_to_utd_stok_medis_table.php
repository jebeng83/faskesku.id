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
        if (Schema::hasTable('utd_stok_medis')) {
            Schema::table('utd_stok_medis', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'utd_stok_medis_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_stok_medis')) {
            Schema::table('utd_stok_medis', function (Blueprint $table) {
                $table->dropForeign('utd_stok_medis_ibfk_1');
            });
        }
    }
};
