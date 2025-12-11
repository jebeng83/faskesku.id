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
        if (!Schema::hasTable('bayar_beban_hutang_lain')) {
            Schema::create('bayar_beban_hutang_lain', function (Blueprint $table) {
                $table->date('tgl_bayar');
                $table->string('kode_pemberi_hutang', 5)->index('kode_pemberi_hutang');
                $table->double('besar_cicilan');
                $table->string('keterangan', 100);
                $table->string('no_hutang', 15)->index('no_hutang');
                $table->string('kd_rek', 15)->index('kd_rek');
                $table->string('nama_bayar', 50)->index('nama_bayar');
                $table->string('no_bukti', 30);

                $table->primary(['tgl_bayar', 'kode_pemberi_hutang', 'no_hutang', 'kd_rek', 'nama_bayar']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_beban_hutang_lain');
    }
};
