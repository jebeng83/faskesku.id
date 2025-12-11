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
        if (Schema::hasTable('akun_piutang')) {
            Schema::table('akun_piutang', function (Blueprint $table) {
                $table->foreign(['kd_rek'], 'akun_piutang_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_pj'], 'akun_piutang_ibfk_2')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('akun_piutang')) {
            Schema::table('akun_piutang', function (Blueprint $table) {
                $table->dropForeign('akun_piutang_ibfk_1');
                $table->dropForeign('akun_piutang_ibfk_2');
            });
        }
    }
};
