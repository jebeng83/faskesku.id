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
        if (! Schema::hasTable('pengajuan_barang_nonmedis')) {
            Schema::create('pengajuan_barang_nonmedis', function (Blueprint $table) {
                $table->string('no_pengajuan', 20)->primary();
                $table->string('nip', 20)->nullable()->index('nip');
                $table->date('tanggal')->nullable();
                $table->enum('status', ['Proses Pengajuan', 'Disetujui', 'Ditolak'])->nullable();
                $table->string('keterangan', 150)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuan_barang_nonmedis');
    }
};
