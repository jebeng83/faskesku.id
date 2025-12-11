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
        if (Schema::hasTable('password_perusahaan_pasien')) {
            Schema::table('password_perusahaan_pasien', function (Blueprint $table) {
                $table->foreign(['kode_perusahaan'], 'password_perusahaan_pasien_ibfk_1')->references(['kode_perusahaan'])->on('perusahaan_pasien')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('password_perusahaan_pasien')) {
            Schema::table('password_perusahaan_pasien', function (Blueprint $table) {
                $table->dropForeign('password_perusahaan_pasien_ibfk_1');
            });
        }
    }
};
