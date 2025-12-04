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
        if (Schema::hasTable('keanggotaan')) {
            Schema::table('keanggotaan', function (Blueprint $table) {
                $table->foreign(['id'], 'keanggotaan_ibfk_3')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['koperasi'], 'keanggotaan_ibfk_4')->references(['stts'])->on('koperasi')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['jamsostek'], 'keanggotaan_ibfk_5')->references(['stts'])->on('jamsostek')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['bpjs'], 'keanggotaan_ibfk_6')->references(['stts'])->on('bpjs')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('keanggotaan')) {
            Schema::table('keanggotaan', function (Blueprint $table) {
                $table->dropForeign('keanggotaan_ibfk_3');
                $table->dropForeign('keanggotaan_ibfk_4');
                $table->dropForeign('keanggotaan_ibfk_5');
                $table->dropForeign('keanggotaan_ibfk_6');
            });
        }
    }
};
