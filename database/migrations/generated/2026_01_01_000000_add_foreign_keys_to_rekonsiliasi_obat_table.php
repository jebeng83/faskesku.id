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
        if (Schema::hasTable('rekonsiliasi_obat')) {
            Schema::table('rekonsiliasi_obat', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'rekonsiliasi_obat_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'rekonsiliasi_obat_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('rekonsiliasi_obat')) {
            Schema::table('rekonsiliasi_obat', function (Blueprint $table) {
                $table->dropForeign('rekonsiliasi_obat_ibfk_1');
                $table->dropForeign('rekonsiliasi_obat_ibfk_2');
            });
        }
    }
};
