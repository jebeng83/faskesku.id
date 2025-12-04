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
        if (Schema::hasTable('resep_dokter')) {
            Schema::table('resep_dokter', function (Blueprint $table) {
                $table->foreign(['no_resep'], 'resep_dokter_ibfk_1')->references(['no_resep'])->on('resep_obat')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'resep_dokter_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('resep_dokter')) {
            Schema::table('resep_dokter', function (Blueprint $table) {
                $table->dropForeign('resep_dokter_ibfk_1');
                $table->dropForeign('resep_dokter_ibfk_2');
            });
        }
    }
};
