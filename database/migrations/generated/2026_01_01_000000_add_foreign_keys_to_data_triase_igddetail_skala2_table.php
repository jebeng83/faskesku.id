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
        if (Schema::hasTable('data_triase_igddetail_skala2')) {
            Schema::table('data_triase_igddetail_skala2', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'data_triase_igddetail_skala2_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_skala2'], 'data_triase_igddetail_skala2_ibfk_2')->references(['kode_skala2'])->on('master_triase_skala2')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('data_triase_igddetail_skala2')) {
            Schema::table('data_triase_igddetail_skala2', function (Blueprint $table) {
                $table->dropForeign('data_triase_igddetail_skala2_ibfk_1');
                $table->dropForeign('data_triase_igddetail_skala2_ibfk_2');
            });
        }
    }
};
