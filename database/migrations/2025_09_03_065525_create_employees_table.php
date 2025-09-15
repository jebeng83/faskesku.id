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
        if (!Schema::hasTable('employees')) {
            Schema::create('employees', function (Blueprint $table) {
                $table->id();
                $table->string('nip')->unique(); // Nomor Induk Pegawai
                $table->string('nama_lengkap');
                $table->string('nama_panggilan')->nullable();
                $table->enum('jenis_kelamin', ['L', 'P']);
                $table->string('tempat_lahir');
                $table->date('tanggal_lahir');
                $table->string('alamat');
                $table->string('no_telepon')->nullable();
                $table->string('email')->nullable();
                $table->string('jabatan');
                $table->string('departemen');
                $table->enum('status_karyawan', ['TETAP', 'KONTRAK', 'MAGANG', 'HONORER']);
                $table->date('tanggal_masuk');
                $table->date('tanggal_keluar')->nullable();
                $table->enum('status_aktif', ['AKTIF', 'NONAKTIF', 'CUTI', 'RESIGN']);
                $table->string('pendidikan_terakhir');
                $table->string('universitas')->nullable();
                $table->string('no_rekening')->nullable();
                $table->string('bank')->nullable();
                $table->string('nama_rekening')->nullable();
                $table->string('foto')->nullable();
                $table->text('catatan')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
