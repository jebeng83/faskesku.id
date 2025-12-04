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
        if (Schema::hasTable('penilaian_awal_keperawatan_kebidanan_ranap')) {
            Schema::table('penilaian_awal_keperawatan_kebidanan_ranap', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'penilaian_awal_keperawatan_kebidanan_ranap_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip1'], 'penilaian_awal_keperawatan_kebidanan_ranap_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip2'], 'penilaian_awal_keperawatan_kebidanan_ranap_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'penilaian_awal_keperawatan_kebidanan_ranap_ibfk_4')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('penilaian_awal_keperawatan_kebidanan_ranap')) {
            Schema::table('penilaian_awal_keperawatan_kebidanan_ranap', function (Blueprint $table) {
                $table->dropForeign('penilaian_awal_keperawatan_kebidanan_ranap_ibfk_1');
                $table->dropForeign('penilaian_awal_keperawatan_kebidanan_ranap_ibfk_2');
                $table->dropForeign('penilaian_awal_keperawatan_kebidanan_ranap_ibfk_3');
                $table->dropForeign('penilaian_awal_keperawatan_kebidanan_ranap_ibfk_4');
            });
        }
    }
};
