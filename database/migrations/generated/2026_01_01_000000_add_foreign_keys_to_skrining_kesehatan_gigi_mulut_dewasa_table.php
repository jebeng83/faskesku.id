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
        if (Schema::hasTable('skrining_kesehatan_gigi_mulut_dewasa')) {
            Schema::table('skrining_kesehatan_gigi_mulut_dewasa', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'skrining_kesehatan_gigi_mulut_dewasa_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'skrining_kesehatan_gigi_mulut_dewasa_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('skrining_kesehatan_gigi_mulut_dewasa')) {
            Schema::table('skrining_kesehatan_gigi_mulut_dewasa', function (Blueprint $table) {
                $table->dropForeign('skrining_kesehatan_gigi_mulut_dewasa_ibfk_1');
                $table->dropForeign('skrining_kesehatan_gigi_mulut_dewasa_ibfk_2');
            });
        }
    }
};
