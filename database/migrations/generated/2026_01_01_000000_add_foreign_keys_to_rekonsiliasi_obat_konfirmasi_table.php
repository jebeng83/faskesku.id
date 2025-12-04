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
        if (Schema::hasTable('rekonsiliasi_obat_konfirmasi')) {
            Schema::table('rekonsiliasi_obat_konfirmasi', function (Blueprint $table) {
                $table->foreign(['no_rekonsiliasi'], 'rekonsiliasi_obat_konfirmasi_ibfk_1')->references(['no_rekonsiliasi'])->on('rekonsiliasi_obat')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'rekonsiliasi_obat_konfirmasi_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('rekonsiliasi_obat_konfirmasi')) {
            Schema::table('rekonsiliasi_obat_konfirmasi', function (Blueprint $table) {
                $table->dropForeign('rekonsiliasi_obat_konfirmasi_ibfk_1');
                $table->dropForeign('rekonsiliasi_obat_konfirmasi_ibfk_2');
            });
        }
    }
};
