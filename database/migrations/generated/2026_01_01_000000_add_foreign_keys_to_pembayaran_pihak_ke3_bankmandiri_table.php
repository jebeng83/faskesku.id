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
        if (Schema::hasTable('pembayaran_pihak_ke3_bankmandiri')) {
            Schema::table('pembayaran_pihak_ke3_bankmandiri', function (Blueprint $table) {
                $table->foreign(['kode_metode'], 'pembayaran_pihak_ke3_bankmandiri_ibfk_1')->references(['kode_metode'])->on('metode_pembayaran_bankmandiri')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_bank'], 'pembayaran_pihak_ke3_bankmandiri_ibfk_2')->references(['kode_bank'])->on('bank_tujuan_transfer_bankmandiri')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pembayaran_pihak_ke3_bankmandiri')) {
            Schema::table('pembayaran_pihak_ke3_bankmandiri', function (Blueprint $table) {
                $table->dropForeign('pembayaran_pihak_ke3_bankmandiri_ibfk_1');
                $table->dropForeign('pembayaran_pihak_ke3_bankmandiri_ibfk_2');
            });
        }
    }
};
