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
        if (Schema::hasTable('sip_pegawai')) {
            Schema::table('sip_pegawai', function (Blueprint $table) {
                $table->foreign(['nik'], 'sip_pegawai_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('sip_pegawai')) {
            Schema::table('sip_pegawai', function (Blueprint $table) {
                $table->dropForeign('sip_pegawai_ibfk_1');
            });
        }
    }
};
