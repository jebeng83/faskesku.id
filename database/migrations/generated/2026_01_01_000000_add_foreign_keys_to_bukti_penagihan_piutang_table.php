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
        if (Schema::hasTable('bukti_penagihan_piutang')) {
            Schema::table('bukti_penagihan_piutang', function (Blueprint $table) {
                $table->foreign(['no_tagihan'], 'bukti_penagihan_piutang_ibfk_1')->references(['no_tagihan'])->on('penagihan_piutang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bukti_penagihan_piutang')) {
            Schema::table('bukti_penagihan_piutang', function (Blueprint $table) {
                $table->dropForeign('bukti_penagihan_piutang_ibfk_1');
            });
        }
    }
};
