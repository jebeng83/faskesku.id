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
        if (Schema::hasTable('evaluasi_kinerja_pegawai')) {
            Schema::table('evaluasi_kinerja_pegawai', function (Blueprint $table) {
                $table->foreign(['id'], 'evaluasi_kinerja_pegawai_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_evaluasi'], 'evaluasi_kinerja_pegawai_ibfk_2')->references(['kode_evaluasi'])->on('evaluasi_kinerja')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('evaluasi_kinerja_pegawai')) {
            Schema::table('evaluasi_kinerja_pegawai', function (Blueprint $table) {
                $table->dropForeign('evaluasi_kinerja_pegawai_ibfk_1');
                $table->dropForeign('evaluasi_kinerja_pegawai_ibfk_2');
            });
        }
    }
};
