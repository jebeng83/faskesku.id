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
        if (Schema::hasTable('skrining_rawat_jalan')) {
            Schema::table('skrining_rawat_jalan', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'skrining_rawat_jalan_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'skrining_rawat_jalan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('skrining_rawat_jalan')) {
            Schema::table('skrining_rawat_jalan', function (Blueprint $table) {
                $table->dropForeign('skrining_rawat_jalan_ibfk_1');
                $table->dropForeign('skrining_rawat_jalan_ibfk_2');
            });
        }
    }
};
