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
        if (Schema::hasTable('set_harga_obat_ranap')) {
            Schema::table('set_harga_obat_ranap', function (Blueprint $table) {
                $table->foreign(['kd_pj'], 'set_harga_obat_ranap_ibfk_1')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_harga_obat_ranap')) {
            Schema::table('set_harga_obat_ranap', function (Blueprint $table) {
                $table->dropForeign('set_harga_obat_ranap_ibfk_1');
            });
        }
    }
};
