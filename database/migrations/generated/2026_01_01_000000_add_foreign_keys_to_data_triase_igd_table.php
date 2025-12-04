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
        if (Schema::hasTable('data_triase_igd')) {
            Schema::table('data_triase_igd', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'data_triase_igd_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_kasus'], 'data_triase_igd_ibfk_2')->references(['kode_kasus'])->on('master_triase_macam_kasus')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('data_triase_igd')) {
            Schema::table('data_triase_igd', function (Blueprint $table) {
                $table->dropForeign('data_triase_igd_ibfk_1');
                $table->dropForeign('data_triase_igd_ibfk_2');
            });
        }
    }
};
