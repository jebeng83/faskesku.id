<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Cek apakah tabel sudah ada sebelum membuatnya
        if (!Schema::hasTable('pegawai')) {
            Schema::create('pegawai', function (Blueprint $table) {
                $table->string('nik', 20)->primary();
                $table->string('nama', 50);
                $table->enum('jk', ['Pria', 'Wanita']);
                $table->string('jbtn', 25)->nullable(); // jabatan
                $table->string('jnj_jabatan', 5)->nullable();
                $table->string('kode_kelompok', 3)->nullable();
                $table->string('kode_resiko', 3)->nullable();
                $table->string('kode_emergency', 3)->nullable();
                $table->string('departemen', 25)->nullable();
                $table->string('bidang', 15)->nullable();
                $table->string('stts_wp', 5)->nullable();
                $table->string('stts_kerja', 3)->nullable();
                $table->string('npwp', 15)->nullable();
                $table->string('pendidikan', 4)->nullable();
                $table->double('gapok', 15, 2)->nullable();
                $table->string('tmp_lahir', 15)->nullable();
                $table->date('tgl_lahir')->nullable();
                $table->string('alamat', 200)->nullable();
                $table->string('kota', 20)->nullable();
                $table->date('mulai_kerja')->nullable();
                $table->string('ms_kerja', 3)->nullable();
                $table->string('indexins', 4)->nullable();
                $table->string('bpd', 8)->nullable();
                $table->string('rekening', 25)->nullable();
                $table->string('no_telp', 15)->nullable();
                $table->string('email', 50)->nullable();
                $table->enum('stts_aktif', ['AKTIF', 'NONAKTIF'])->default('AKTIF');
                $table->integer('wajibmasuk')->default(0);
                $table->double('pengurang', 15, 2)->default(0);
                $table->integer('indek')->default(0);
                $table->date('mulai_kontrak')->nullable();
                $table->integer('cuti_diambil')->default(0);
                $table->double('dankes', 15, 2)->default(0);
                $table->string('photo')->nullable();
                $table->string('no_ktp', 20)->nullable();
                // $table->date('tgl_masuk')->nullable(); // dihapus karena tidak ada di tabel
                $table->date('tgl_keluar')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('pegawai');
    }
};