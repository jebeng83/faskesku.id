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
        if (Schema::hasTable('bukti_persetujuan_transfer_pasien_antar_ruang')) {
            Schema::table('bukti_persetujuan_transfer_pasien_antar_ruang', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'bukti_persetujuan_transfer_pasien_antar_ruang_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bukti_persetujuan_transfer_pasien_antar_ruang')) {
            Schema::table('bukti_persetujuan_transfer_pasien_antar_ruang', function (Blueprint $table) {
                $table->dropForeign('bukti_persetujuan_transfer_pasien_antar_ruang_ibfk_1');
            });
        }
    }
};
