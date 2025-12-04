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
        if (Schema::hasTable('detail_pemberian_obat')) {
            Schema::table('detail_pemberian_obat', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'detail_pemberian_obat_ibfk_3')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'detail_pemberian_obat_ibfk_4')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsal'], 'detail_pemberian_obat_ibfk_5')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_pemberian_obat')) {
            Schema::table('detail_pemberian_obat', function (Blueprint $table) {
                $table->dropForeign('detail_pemberian_obat_ibfk_3');
                $table->dropForeign('detail_pemberian_obat_ibfk_4');
                $table->dropForeign('detail_pemberian_obat_ibfk_5');
            });
        }
    }
};
