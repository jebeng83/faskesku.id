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
        if (Schema::hasTable('berkas_digital_perawatan')) {
            Schema::table('berkas_digital_perawatan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'berkas_digital_perawatan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode'], 'berkas_digital_perawatan_ibfk_2')->references(['kode'])->on('master_berkas_digital')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('berkas_digital_perawatan')) {
            Schema::table('berkas_digital_perawatan', function (Blueprint $table) {
                $table->dropForeign('berkas_digital_perawatan_ibfk_1');
                $table->dropForeign('berkas_digital_perawatan_ibfk_2');
            });
        }
    }
};
