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
        if (Schema::hasTable('konseling_farmasi')) {
            Schema::table('konseling_farmasi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'konseling_farmasi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'konseling_farmasi_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('konseling_farmasi')) {
            Schema::table('konseling_farmasi', function (Blueprint $table) {
                $table->dropForeign('konseling_farmasi_ibfk_1');
                $table->dropForeign('konseling_farmasi_ibfk_2');
            });
        }
    }
};
