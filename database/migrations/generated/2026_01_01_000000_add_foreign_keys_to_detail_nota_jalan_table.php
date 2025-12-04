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
        if (Schema::hasTable('detail_nota_jalan')) {
            Schema::table('detail_nota_jalan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'detail_nota_jalan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'detail_nota_jalan_ibfk_2')->references(['nama_bayar'])->on('akun_bayar')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_nota_jalan')) {
            Schema::table('detail_nota_jalan', function (Blueprint $table) {
                $table->dropForeign('detail_nota_jalan_ibfk_1');
                $table->dropForeign('detail_nota_jalan_ibfk_2');
            });
        }
    }
};
