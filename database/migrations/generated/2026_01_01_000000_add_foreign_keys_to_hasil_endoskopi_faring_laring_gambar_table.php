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
        if (Schema::hasTable('hasil_endoskopi_faring_laring_gambar')) {
            Schema::table('hasil_endoskopi_faring_laring_gambar', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'hasil_endoskopi_faring_laring_gambar_ibfk_1')->references(['no_rawat'])->on('hasil_endoskopi_faring_laring')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('hasil_endoskopi_faring_laring_gambar')) {
            Schema::table('hasil_endoskopi_faring_laring_gambar', function (Blueprint $table) {
                $table->dropForeign('hasil_endoskopi_faring_laring_gambar_ibfk_1');
            });
        }
    }
};
