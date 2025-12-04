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
        if (Schema::hasTable('pcare_obat_diberikan')) {
            Schema::table('pcare_obat_diberikan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'pcare_obat_diberikan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'pcare_obat_diberikan_ibfk_2')->references(['kode_brng'])->on('maping_obat_pcare')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pcare_obat_diberikan')) {
            Schema::table('pcare_obat_diberikan', function (Blueprint $table) {
                $table->dropForeign('pcare_obat_diberikan_ibfk_1');
                $table->dropForeign('pcare_obat_diberikan_ibfk_2');
            });
        }
    }
};
