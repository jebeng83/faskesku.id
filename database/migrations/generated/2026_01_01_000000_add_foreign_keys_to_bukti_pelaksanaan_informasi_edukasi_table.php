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
        if (Schema::hasTable('bukti_pelaksanaan_informasi_edukasi')) {
            Schema::table('bukti_pelaksanaan_informasi_edukasi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'bukti_pelaksanaan_informasi_edukasi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bukti_pelaksanaan_informasi_edukasi')) {
            Schema::table('bukti_pelaksanaan_informasi_edukasi', function (Blueprint $table) {
                $table->dropForeign('bukti_pelaksanaan_informasi_edukasi_ibfk_1');
            });
        }
    }
};
