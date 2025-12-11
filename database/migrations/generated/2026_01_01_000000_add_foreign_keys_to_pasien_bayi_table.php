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
        if (Schema::hasTable('pasien_bayi')) {
            Schema::table('pasien_bayi', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'pasien_bayi_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['penolong'], 'pasien_bayi_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pasien_bayi')) {
            Schema::table('pasien_bayi', function (Blueprint $table) {
                $table->dropForeign('pasien_bayi_ibfk_1');
                $table->dropForeign('pasien_bayi_ibfk_2');
            });
        }
    }
};
