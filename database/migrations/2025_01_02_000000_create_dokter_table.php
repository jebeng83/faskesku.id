<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Cek apakah tabel sudah ada sebelum membuatnya
        if (! Schema::hasTable('dokter')) {
            Schema::create('dokter', function (Blueprint $table) {
                $table->string('kd_dokter', 20)->primary();
                $table->string('nm_dokter', 50);
                $table->enum('jk', ['L', 'P']);
                $table->string('tmp_lahir', 15);
                $table->date('tgl_lahir');
                $table->enum('gol_drh', ['A', 'B', 'O', 'AB', '-']);
                $table->string('agama', 12);
                $table->string('almt_tgl', 200);
                $table->string('no_telp', 40);
                $table->enum('stts_nikah', ['BELUM MENIKAH', 'MENIKAH', 'JANDA', 'DUDHA', 'JOMBLO']);
                $table->string('kd_sps', 5);
                $table->string('alumni', 60);
                $table->string('no_ijn_praktek', 40);
                $table->enum('status', ['0', '1'])->default('1');
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('dokter');
    }
};
