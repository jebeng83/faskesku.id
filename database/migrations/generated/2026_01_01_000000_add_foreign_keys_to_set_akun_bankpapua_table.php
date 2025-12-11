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
        if (Schema::hasTable('set_akun_bankpapua')) {
            Schema::table('set_akun_bankpapua', function (Blueprint $table) {
                $table->foreign(['kd_rek'], 'set_akun_bankpapua_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_akun_bankpapua')) {
            Schema::table('set_akun_bankpapua', function (Blueprint $table) {
                $table->dropForeign('set_akun_bankpapua_ibfk_1');
            });
        }
    }
};
