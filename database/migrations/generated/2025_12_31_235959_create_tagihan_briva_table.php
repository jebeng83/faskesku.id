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
        if (!Schema::hasTable('tagihan_briva')) {
            Schema::create('tagihan_briva', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15)->nullable()->index('no_rkm_medis');
                $table->string('nm_pasien', 40)->nullable();
                $table->string('alamat', 200)->nullable();
                $table->enum('jk', ['L', 'P'])->nullable();
                $table->date('tgl_lahir');
                $table->date('tgl_registrasi')->nullable();
                $table->string('no_tagihan', 17);
                $table->double('besar_bayar')->nullable();
                $table->string('keterangan')->nullable();
                $table->enum('status_tagihan', ['Ranap', 'Ralan', 'Jual Bebas', 'Deposit', 'Bayar Piutang']);
                $table->date('tgl_closing')->nullable();
                $table->enum('status_bayar', ['Sudah', 'Pending'])->nullable();
                $table->string('kasir', 50)->nullable();
                $table->dateTime('diupdatebank')->nullable();
                $table->string('referensi', 30);

                $table->primary(['no_tagihan', 'status_tagihan']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihan_briva');
    }
};
