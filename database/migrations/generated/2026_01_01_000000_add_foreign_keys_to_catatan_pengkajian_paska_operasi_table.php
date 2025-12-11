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
        if (Schema::hasTable('catatan_pengkajian_paska_operasi')) {
            Schema::table('catatan_pengkajian_paska_operasi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'catatan_pengkajian_paska_operasi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'catatan_pengkajian_paska_operasi_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('catatan_pengkajian_paska_operasi')) {
            Schema::table('catatan_pengkajian_paska_operasi', function (Blueprint $table) {
                $table->dropForeign('catatan_pengkajian_paska_operasi_ibfk_1');
                $table->dropForeign('catatan_pengkajian_paska_operasi_ibfk_2');
            });
        }
    }
};
