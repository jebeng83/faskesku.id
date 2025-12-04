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
        if (Schema::hasTable('permintaan_non_medis')) {
            Schema::table('permintaan_non_medis', function (Blueprint $table) {
                $table->foreign(['nip'], 'permintaan_non_medis_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('permintaan_non_medis')) {
            Schema::table('permintaan_non_medis', function (Blueprint $table) {
                $table->dropForeign('permintaan_non_medis_ibfk_1');
            });
        }
    }
};
