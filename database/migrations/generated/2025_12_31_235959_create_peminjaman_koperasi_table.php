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
        if (! Schema::hasTable('peminjaman_koperasi')) {
            Schema::create('peminjaman_koperasi', function (Blueprint $table) {
                $table->integer('id');
                $table->date('tanggal');
                $table->double('pinjaman');
                $table->integer('banyak_angsur');
                $table->double('pokok');
                $table->double('jasa');
                $table->enum('status', ['Lunas', 'Belum Lunas']);

                $table->primary(['id', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjaman_koperasi');
    }
};
