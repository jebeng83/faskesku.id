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
        if (Schema::hasTable('catatan_keseimbangan_cairan')) {
            Schema::table('catatan_keseimbangan_cairan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'catatan_keseimbangan_cairan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'catatan_keseimbangan_cairan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('catatan_keseimbangan_cairan')) {
            Schema::table('catatan_keseimbangan_cairan', function (Blueprint $table) {
                $table->dropForeign('catatan_keseimbangan_cairan_ibfk_1');
                $table->dropForeign('catatan_keseimbangan_cairan_ibfk_2');
            });
        }
    }
};
