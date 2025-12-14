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
        if (! Schema::hasTable('catatan_observasi_restrain_nonfarma')) {
            Schema::create('catatan_observasi_restrain_nonfarma', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->enum('tangan_kiri', ['Ya', 'Tidak'])->nullable();
                $table->enum('tangan_kanan', ['Ya', 'Tidak'])->nullable();
                $table->enum('kaki_kiri', ['Ya', 'Tidak'])->nullable();
                $table->enum('kaki_kanan', ['Ya', 'Tidak'])->nullable();
                $table->enum('badan', ['Ya', 'Tidak'])->nullable();
                $table->enum('edema', ['Ya', 'Tidak'])->nullable();
                $table->enum('iritasi', ['Ya', 'Tidak'])->nullable();
                $table->enum('sirkulasi', ['Ya', 'Tidak'])->nullable();
                $table->string('kondisi_keterangan', 100)->nullable();
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tgl_perawatan', 'jam_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_observasi_restrain_nonfarma');
    }
};
