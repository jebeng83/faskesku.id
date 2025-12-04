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
        if (Schema::hasTable('catatan_pasien')) {
            Schema::table('catatan_pasien', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'catatan_pasien_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('catatan_pasien')) {
            Schema::table('catatan_pasien', function (Blueprint $table) {
                $table->dropForeign('catatan_pasien_ibfk_1');
            });
        }
    }
};
