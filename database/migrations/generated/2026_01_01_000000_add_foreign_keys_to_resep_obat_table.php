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
        if (Schema::hasTable('resep_obat')) {
            Schema::table('resep_obat', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'resep_obat_ibfk_3')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_dokter'], 'resep_obat_ibfk_4')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('resep_obat')) {
            Schema::table('resep_obat', function (Blueprint $table) {
                $table->dropForeign('resep_obat_ibfk_3');
                $table->dropForeign('resep_obat_ibfk_4');
            });
        }
    }
};
