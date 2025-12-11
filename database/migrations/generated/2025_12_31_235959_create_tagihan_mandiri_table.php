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
        if (!Schema::hasTable('tagihan_mandiri')) {
            Schema::create('tagihan_mandiri', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15)->nullable()->index('no_rkm_medis');
                $table->string('nm_pasien', 40)->nullable();
                $table->string('alamat', 200)->nullable();
                $table->enum('jk', ['L', 'P'])->nullable();
                $table->date('tgl_lahir');
                $table->string('umurdaftar', 7)->nullable();
                $table->date('tgl_registrasi')->nullable();
                $table->string('no_nota', 17)->primary();
                $table->double('besar_bayar')->nullable();
                $table->string('no_rawat', 17)->nullable();
                $table->string('no_id', 17);
                $table->enum('status_lanjut', ['Ranap', 'Ralan', 'Jual Bebas', 'Deposit', 'Bayar Piutang'])->nullable();
                $table->dateTime('tgl_closing')->nullable();
                $table->enum('status_bayar', ['Sudah', 'Pending'])->nullable();
                $table->enum('pembatalan', ['Belum Dibatalkan', 'Sudah Dibatalkan', ''])->nullable();
                $table->enum('dibatalkan_oleh', ['MHAS', 'Faskes', ''])->nullable();
                $table->double('besar_batal')->nullable();
                $table->string('kasir', 50)->nullable();
                $table->string('tambahan1', 75)->nullable();
                $table->string('tambahan2', 75)->nullable();
                $table->string('tambahan3', 75)->nullable();
                $table->dateTime('diupdatebank')->nullable();
                $table->string('referensi', 30);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihan_mandiri');
    }
};
