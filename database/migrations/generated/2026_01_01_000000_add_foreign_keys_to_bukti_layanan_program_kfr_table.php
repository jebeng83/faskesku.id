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
        if (Schema::hasTable('bukti_layanan_program_kfr')) {
            Schema::table('bukti_layanan_program_kfr', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'bukti_layanan_program_kfr_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bukti_layanan_program_kfr')) {
            Schema::table('bukti_layanan_program_kfr', function (Blueprint $table) {
                $table->dropForeign('bukti_layanan_program_kfr_ibfk_1');
            });
        }
    }
};
