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
        if (Schema::hasTable('rujukan_internal_poli')) {
            Schema::table('rujukan_internal_poli', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'rujukan_internal_poli_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'rujukan_internal_poli_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_poli'], 'rujukan_internal_poli_ibfk_3')->references(['kd_poli'])->on('poliklinik')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('rujukan_internal_poli')) {
            Schema::table('rujukan_internal_poli', function (Blueprint $table) {
                $table->dropForeign('rujukan_internal_poli_ibfk_1');
                $table->dropForeign('rujukan_internal_poli_ibfk_2');
                $table->dropForeign('rujukan_internal_poli_ibfk_3');
            });
        }
    }
};
