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
        if (Schema::hasTable('tokopenjualan')) {
            Schema::table('tokopenjualan', function (Blueprint $table) {
                $table->foreign(['no_member'], 'tokopenjualan_ibfk_1')->references(['no_member'])->on('tokomember')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'tokopenjualan_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'tokopenjualan_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'tokopenjualan_ibfk_4')->references(['nama_bayar'])->on('akun_bayar')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tokopenjualan')) {
            Schema::table('tokopenjualan', function (Blueprint $table) {
                $table->dropForeign('tokopenjualan_ibfk_1');
                $table->dropForeign('tokopenjualan_ibfk_2');
                $table->dropForeign('tokopenjualan_ibfk_3');
                $table->dropForeign('tokopenjualan_ibfk_4');
            });
        }
    }
};
