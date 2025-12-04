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
        if (Schema::hasTable('akun_bayar_hutang')) {
            Schema::table('akun_bayar_hutang', function (Blueprint $table) {
                $table->foreign(['kd_rek'], 'akun_bayar_hutang_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('akun_bayar_hutang')) {
            Schema::table('akun_bayar_hutang', function (Blueprint $table) {
                $table->dropForeign('akun_bayar_hutang_ibfk_1');
            });
        }
    }
};
