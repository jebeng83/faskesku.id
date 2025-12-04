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
        if (Schema::hasTable('peminjaman_koperasi')) {
            Schema::table('peminjaman_koperasi', function (Blueprint $table) {
                $table->foreign(['id'], 'peminjaman_koperasi_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('peminjaman_koperasi')) {
            Schema::table('peminjaman_koperasi', function (Blueprint $table) {
                $table->dropForeign('peminjaman_koperasi_ibfk_1');
            });
        }
    }
};
