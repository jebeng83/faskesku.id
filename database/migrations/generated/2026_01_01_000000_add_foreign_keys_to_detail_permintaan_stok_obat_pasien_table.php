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
        if (Schema::hasTable('detail_permintaan_stok_obat_pasien')) {
            Schema::table('detail_permintaan_stok_obat_pasien', function (Blueprint $table) {
                $table->foreign(['no_permintaan'], 'detail_permintaan_stok_obat_pasien_ibfk_1')->references(['no_permintaan'])->on('permintaan_stok_obat_pasien')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'detail_permintaan_stok_obat_pasien_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_permintaan_stok_obat_pasien')) {
            Schema::table('detail_permintaan_stok_obat_pasien', function (Blueprint $table) {
                $table->dropForeign('detail_permintaan_stok_obat_pasien_ibfk_1');
                $table->dropForeign('detail_permintaan_stok_obat_pasien_ibfk_2');
            });
        }
    }
};
