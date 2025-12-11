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
        if (Schema::hasTable('skor_steward_pasca_anestesi')) {
            Schema::table('skor_steward_pasca_anestesi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'skor_steward_pasca_anestesi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'skor_steward_pasca_anestesi_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'skor_steward_pasca_anestesi_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('skor_steward_pasca_anestesi')) {
            Schema::table('skor_steward_pasca_anestesi', function (Blueprint $table) {
                $table->dropForeign('skor_steward_pasca_anestesi_ibfk_1');
                $table->dropForeign('skor_steward_pasca_anestesi_ibfk_2');
                $table->dropForeign('skor_steward_pasca_anestesi_ibfk_3');
            });
        }
    }
};
