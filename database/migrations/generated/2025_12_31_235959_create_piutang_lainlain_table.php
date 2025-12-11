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
        if (!Schema::hasTable('piutang_lainlain')) {
            Schema::create('piutang_lainlain', function (Blueprint $table) {
                $table->string('nota_piutang', 20)->primary();
                $table->date('tgl_piutang')->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
                $table->string('kode_peminjam', 5)->nullable()->index('kode_peminjam');
                $table->string('kd_rek', 15)->index('kd_rek');
                $table->string('nama_bayar', 50)->nullable()->index('nama_bayar');
                $table->string('keterangan', 100)->nullable();
                $table->date('tgltempo');
                $table->double('nominal');
                $table->double('sisapiutang');
                $table->enum('status', ['Sudah Lunas', 'Belum Lunas']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('piutang_lainlain');
    }
};
