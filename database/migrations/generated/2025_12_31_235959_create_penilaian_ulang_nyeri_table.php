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
        if (!Schema::hasTable('penilaian_ulang_nyeri')) {
            Schema::create('penilaian_ulang_nyeri', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('nyeri', ['Tidak Ada Nyeri', 'Nyeri Akut', 'Nyeri Kronis']);
                $table->enum('provokes', ['Proses Penyakit', 'Benturan', 'Lain-lain', '-']);
                $table->string('ket_provokes', 40);
                $table->enum('quality', ['Seperti Tertusuk', 'Berdenyut', 'Teriris', 'Tertindih', 'Tertiban', 'Lain-lain', '-']);
                $table->string('ket_quality', 50);
                $table->string('lokasi', 50);
                $table->enum('menyebar', ['Tidak', 'Ya']);
                $table->enum('skala_nyeri', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
                $table->string('durasi', 25);
                $table->enum('nyeri_hilang', ['Istirahat', 'Medengar Musik', 'Minum Obat', '-']);
                $table->string('ket_nyeri', 40);
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_ulang_nyeri');
    }
};
