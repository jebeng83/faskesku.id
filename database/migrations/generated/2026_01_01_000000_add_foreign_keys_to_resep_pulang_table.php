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
        if (Schema::hasTable('resep_pulang')) {
            Schema::table('resep_pulang', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'resep_pulang_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'resep_pulang_ibfk_3')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_bangsal'], 'resep_pulang_ibfk_4')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('resep_pulang')) {
            Schema::table('resep_pulang', function (Blueprint $table) {
                $table->dropForeign('resep_pulang_ibfk_2');
                $table->dropForeign('resep_pulang_ibfk_3');
                $table->dropForeign('resep_pulang_ibfk_4');
            });
        }
    }
};
