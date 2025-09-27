<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Pastikan tabel pegawai sudah ada sebelum menambahkan foreign key
        if (Schema::hasTable('pegawai') && Schema::hasTable('dokter')) {
            Schema::table('dokter', function (Blueprint $table) {
                // Tambahkan foreign key constraint
                $table->foreign('kd_dokter')->references('nik')->on('pegawai')->onDelete('cascade')->onUpdate('cascade');
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('dokter')) {
            Schema::table('dokter', function (Blueprint $table) {
                // Hapus foreign key constraint
                $table->dropForeign(['kd_dokter']);
            });
        }
    }
};