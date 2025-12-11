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
        if (Schema::hasTable('bukti_pemesanan_dapur')) {
            Schema::table('bukti_pemesanan_dapur', function (Blueprint $table) {
                $table->foreign(['no_faktur'], 'bukti_pemesanan_dapur_ibfk_1')->references(['no_faktur'])->on('dapurpemesanan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bukti_pemesanan_dapur')) {
            Schema::table('bukti_pemesanan_dapur', function (Blueprint $table) {
                $table->dropForeign('bukti_pemesanan_dapur_ibfk_1');
            });
        }
    }
};
