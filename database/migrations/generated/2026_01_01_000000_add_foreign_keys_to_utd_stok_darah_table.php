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
        if (Schema::hasTable('utd_stok_darah')) {
            Schema::table('utd_stok_darah', function (Blueprint $table) {
                $table->foreign(['kode_komponen'], 'utd_stok_darah_ibfk_1')->references(['kode'])->on('utd_komponen_darah')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_stok_darah')) {
            Schema::table('utd_stok_darah', function (Blueprint $table) {
                $table->dropForeign('utd_stok_darah_ibfk_1');
            });
        }
    }
};
