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
        if (Schema::hasTable('obat_penyakit')) {
            Schema::table('obat_penyakit', function (Blueprint $table) {
                $table->foreign(['kd_penyakit'], 'obat_penyakit_ibfk_1')->references(['kd_penyakit'])->on('penyakit')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_brng'], 'obat_penyakit_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('obat_penyakit')) {
            Schema::table('obat_penyakit', function (Blueprint $table) {
                $table->dropForeign('obat_penyakit_ibfk_1');
                $table->dropForeign('obat_penyakit_ibfk_2');
            });
        }
    }
};
