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
        if (Schema::hasTable('detail_periksa_labpa')) {
            Schema::table('detail_periksa_labpa', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'detail_periksa_labpa_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_jenis_prw'], 'detail_periksa_labpa_ibfk_2')->references(['kd_jenis_prw'])->on('jns_perawatan_lab')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_periksa_labpa')) {
            Schema::table('detail_periksa_labpa', function (Blueprint $table) {
                $table->dropForeign('detail_periksa_labpa_ibfk_1');
                $table->dropForeign('detail_periksa_labpa_ibfk_2');
            });
        }
    }
};
