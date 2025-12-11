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
        if (Schema::hasTable('utd_pengambilan_medis')) {
            Schema::table('utd_pengambilan_medis', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'utd_pengambilan_medis_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsal_dr'], 'utd_pengambilan_medis_ibfk_2')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_pengambilan_medis')) {
            Schema::table('utd_pengambilan_medis', function (Blueprint $table) {
                $table->dropForeign('utd_pengambilan_medis_ibfk_1');
                $table->dropForeign('utd_pengambilan_medis_ibfk_2');
            });
        }
    }
};
