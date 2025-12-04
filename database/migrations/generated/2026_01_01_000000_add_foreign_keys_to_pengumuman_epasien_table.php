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
        if (Schema::hasTable('pengumuman_epasien')) {
            Schema::table('pengumuman_epasien', function (Blueprint $table) {
                $table->foreign(['nik'], 'pengumuman_epasien_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pengumuman_epasien')) {
            Schema::table('pengumuman_epasien', function (Blueprint $table) {
                $table->dropForeign('pengumuman_epasien_ibfk_1');
            });
        }
    }
};
