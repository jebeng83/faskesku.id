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
        if (!Schema::hasTable('beban_hutang_lain')) {
            Schema::create('beban_hutang_lain', function (Blueprint $table) {
                $table->string('no_hutang', 20)->primary();
                $table->date('tgl_hutang')->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
                $table->string('kode_pemberi_hutang', 5)->nullable()->index('kode_pemberi_hutang');
                $table->string('kd_rek', 15)->index('kd_rek');
                $table->string('keterangan', 100)->nullable();
                $table->date('tgltempo');
                $table->double('nominal');
                $table->double('sisahutang');
                $table->enum('status', ['Sudah Lunas', 'Belum Lunas']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beban_hutang_lain');
    }
};
