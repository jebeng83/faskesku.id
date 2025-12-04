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
        if (Schema::hasTable('jadwal_pegawai')) {
            Schema::table('jadwal_pegawai', function (Blueprint $table) {
                $table->foreign(['id'], 'jadwal_pegawai_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('jadwal_pegawai')) {
            Schema::table('jadwal_pegawai', function (Blueprint $table) {
                $table->dropForeign('jadwal_pegawai_ibfk_1');
            });
        }
    }
};
