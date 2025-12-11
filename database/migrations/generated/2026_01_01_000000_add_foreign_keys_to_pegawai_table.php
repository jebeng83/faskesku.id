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
        if (Schema::hasTable('pegawai')) {
            Schema::table('pegawai', function (Blueprint $table) {
                $table->foreign(['jnj_jabatan'], 'pegawai_ibfk_1')->references(['kode'])->on('jnj_jabatan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_kelompok'], 'pegawai_ibfk_10')->references(['kode_kelompok'])->on('kelompok_jabatan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_resiko'], 'pegawai_ibfk_11')->references(['kode_resiko'])->on('resiko_kerja')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['departemen'], 'pegawai_ibfk_2')->references(['dep_id'])->on('departemen')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['bidang'], 'pegawai_ibfk_3')->references(['nama'])->on('bidang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['stts_wp'], 'pegawai_ibfk_4')->references(['stts'])->on('stts_wp')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['stts_kerja'], 'pegawai_ibfk_5')->references(['stts'])->on('stts_kerja')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['pendidikan'], 'pegawai_ibfk_6')->references(['tingkat'])->on('pendidikan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['indexins'], 'pegawai_ibfk_7')->references(['dep_id'])->on('departemen')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['bpd'], 'pegawai_ibfk_8')->references(['namabank'])->on('bank')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_emergency'], 'pegawai_ibfk_9')->references(['kode_emergency'])->on('emergency_index')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pegawai')) {
            Schema::table('pegawai', function (Blueprint $table) {
                $table->dropForeign('pegawai_ibfk_1');
                $table->dropForeign('pegawai_ibfk_10');
                $table->dropForeign('pegawai_ibfk_11');
                $table->dropForeign('pegawai_ibfk_2');
                $table->dropForeign('pegawai_ibfk_3');
                $table->dropForeign('pegawai_ibfk_4');
                $table->dropForeign('pegawai_ibfk_5');
                $table->dropForeign('pegawai_ibfk_6');
                $table->dropForeign('pegawai_ibfk_7');
                $table->dropForeign('pegawai_ibfk_8');
                $table->dropForeign('pegawai_ibfk_9');
            });
        }
    }
};
