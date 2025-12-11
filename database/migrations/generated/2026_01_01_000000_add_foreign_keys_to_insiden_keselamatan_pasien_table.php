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
        if (Schema::hasTable('insiden_keselamatan_pasien')) {
            Schema::table('insiden_keselamatan_pasien', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'insiden_keselamatan_pasien_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_insiden'], 'insiden_keselamatan_pasien_ibfk_2')->references(['kode_insiden'])->on('insiden_keselamatan')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'insiden_keselamatan_pasien_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('insiden_keselamatan_pasien')) {
            Schema::table('insiden_keselamatan_pasien', function (Blueprint $table) {
                $table->dropForeign('insiden_keselamatan_pasien_ibfk_1');
                $table->dropForeign('insiden_keselamatan_pasien_ibfk_2');
                $table->dropForeign('insiden_keselamatan_pasien_ibfk_3');
            });
        }
    }
};
