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
        if (Schema::hasTable('jadwal_tambahan')) {
            Schema::table('jadwal_tambahan', function (Blueprint $table) {
                $table->foreign(['id'], 'jadwal_tambahan_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('jadwal_tambahan')) {
            Schema::table('jadwal_tambahan', function (Blueprint $table) {
                $table->dropForeign('jadwal_tambahan_ibfk_1');
            });
        }
    }
};
