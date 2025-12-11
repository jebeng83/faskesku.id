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
        if (Schema::hasTable('pcare_kunjungan_umum')) {
            Schema::table('pcare_kunjungan_umum', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'pcare_kunjungan_umum_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pcare_kunjungan_umum')) {
            Schema::table('pcare_kunjungan_umum', function (Blueprint $table) {
                $table->dropForeign('pcare_kunjungan_umum_ibfk_1');
            });
        }
    }
};
