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
        if (Schema::hasTable('jawaban_pio_apoteker')) {
            Schema::table('jawaban_pio_apoteker', function (Blueprint $table) {
                $table->foreign(['nip'], 'jawaban_pio_apoteker_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_permintaan'], 'jawaban_pio_apoteker_ibfk_2')->references(['no_permintaan'])->on('pelayanan_informasi_obat')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('jawaban_pio_apoteker')) {
            Schema::table('jawaban_pio_apoteker', function (Blueprint $table) {
                $table->dropForeign('jawaban_pio_apoteker_ibfk_1');
                $table->dropForeign('jawaban_pio_apoteker_ibfk_2');
            });
        }
    }
};
