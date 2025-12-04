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
        if (Schema::hasTable('stok_obat_pasien')) {
            Schema::table('stok_obat_pasien', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'stok_obat_pasien_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsal'], 'stok_obat_pasien_ibfk_3')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_rawat'], 'stok_obat_pasien_ibfk_4')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('stok_obat_pasien')) {
            Schema::table('stok_obat_pasien', function (Blueprint $table) {
                $table->dropForeign('stok_obat_pasien_ibfk_2');
                $table->dropForeign('stok_obat_pasien_ibfk_3');
                $table->dropForeign('stok_obat_pasien_ibfk_4');
            });
        }
    }
};
