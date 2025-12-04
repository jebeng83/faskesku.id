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
        if (Schema::hasTable('uji_fungsi_kfr')) {
            Schema::table('uji_fungsi_kfr', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'uji_fungsi_kfr_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_dokter'], 'uji_fungsi_kfr_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('uji_fungsi_kfr')) {
            Schema::table('uji_fungsi_kfr', function (Blueprint $table) {
                $table->dropForeign('uji_fungsi_kfr_ibfk_1');
                $table->dropForeign('uji_fungsi_kfr_ibfk_2');
            });
        }
    }
};
