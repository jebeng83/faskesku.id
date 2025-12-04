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
        if (Schema::hasTable('utd_penyerahan_darah')) {
            Schema::table('utd_penyerahan_darah', function (Blueprint $table) {
                $table->foreign(['nip_cross'], 'utd_penyerahan_darah_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_rek'], 'utd_penyerahan_darah_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_penyerahan_darah')) {
            Schema::table('utd_penyerahan_darah', function (Blueprint $table) {
                $table->dropForeign('utd_penyerahan_darah_ibfk_1');
                $table->dropForeign('utd_penyerahan_darah_ibfk_2');
            });
        }
    }
};
