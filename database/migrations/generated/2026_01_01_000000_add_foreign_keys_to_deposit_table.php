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
        if (Schema::hasTable('deposit')) {
            Schema::table('deposit', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'deposit_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'deposit_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'deposit_ibfk_3')->references(['nama_bayar'])->on('akun_bayar')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('deposit')) {
            Schema::table('deposit', function (Blueprint $table) {
                $table->dropForeign('deposit_ibfk_1');
                $table->dropForeign('deposit_ibfk_2');
                $table->dropForeign('deposit_ibfk_3');
            });
        }
    }
};
