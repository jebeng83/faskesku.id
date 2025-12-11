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
        if (Schema::hasTable('angsuran_koperasi')) {
            Schema::table('angsuran_koperasi', function (Blueprint $table) {
                $table->foreign(['id'], 'angsuran_koperasi_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('angsuran_koperasi')) {
            Schema::table('angsuran_koperasi', function (Blueprint $table) {
                $table->dropForeign('angsuran_koperasi_ibfk_1');
            });
        }
    }
};
