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
        if (Schema::hasTable('permintaan_dapur')) {
            Schema::table('permintaan_dapur', function (Blueprint $table) {
                $table->foreign(['nip'], 'permintaan_dapur_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('permintaan_dapur')) {
            Schema::table('permintaan_dapur', function (Blueprint $table) {
                $table->dropForeign('permintaan_dapur_ibfk_1');
            });
        }
    }
};
