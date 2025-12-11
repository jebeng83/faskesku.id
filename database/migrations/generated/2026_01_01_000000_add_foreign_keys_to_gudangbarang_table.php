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
        if (Schema::hasTable('gudangbarang')) {
            Schema::table('gudangbarang', function (Blueprint $table) {
                $table->foreign(['kd_bangsal'], 'gudangbarang_ibfk_1')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'gudangbarang_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('gudangbarang')) {
            Schema::table('gudangbarang', function (Blueprint $table) {
                $table->dropForeign('gudangbarang_ibfk_1');
                $table->dropForeign('gudangbarang_ibfk_2');
            });
        }
    }
};
