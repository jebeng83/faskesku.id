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
        if (Schema::hasTable('penilaian_korban_kekerasan')) {
            Schema::table('penilaian_korban_kekerasan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'penilaian_korban_kekerasan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'penilaian_korban_kekerasan_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('penilaian_korban_kekerasan')) {
            Schema::table('penilaian_korban_kekerasan', function (Blueprint $table) {
                $table->dropForeign('penilaian_korban_kekerasan_ibfk_1');
                $table->dropForeign('penilaian_korban_kekerasan_ibfk_2');
            });
        }
    }
};
