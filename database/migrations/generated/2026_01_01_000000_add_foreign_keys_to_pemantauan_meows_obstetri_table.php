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
        if (Schema::hasTable('pemantauan_meows_obstetri')) {
            Schema::table('pemantauan_meows_obstetri', function (Blueprint $table) {
                $table->foreign(['nip'], 'pemantauan_meows_obstetri_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'pemantauan_meows_obstetri_ibfk_2')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pemantauan_meows_obstetri')) {
            Schema::table('pemantauan_meows_obstetri', function (Blueprint $table) {
                $table->dropForeign('pemantauan_meows_obstetri_ibfk_1');
                $table->dropForeign('pemantauan_meows_obstetri_ibfk_2');
            });
        }
    }
};
