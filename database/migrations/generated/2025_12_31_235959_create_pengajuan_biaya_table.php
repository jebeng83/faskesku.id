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
        if (!Schema::hasTable('pengajuan_biaya')) {
            Schema::create('pengajuan_biaya', function (Blueprint $table) {
                $table->string('no_pengajuan', 20)->primary();
                $table->date('tanggal');
                $table->string('nik', 20)->index('nik');
                $table->enum('urgensi', ['Cito', 'Emergensi', 'Biasa']);
                $table->string('uraian_latar_belakang', 200);
                $table->string('tujuan_pengajuan', 200);
                $table->string('target_sasaran', 70);
                $table->string('lokasi_kegiatan', 70);
                $table->double('jumlah');
                $table->double('harga');
                $table->double('total');
                $table->string('keterangan', 70);
                $table->string('nik_pj', 20)->index('nik_pj');
                $table->enum('status', ['Proses Pengajuan', 'Disetujui', 'Ditolak', 'Divalidasi']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuan_biaya');
    }
};
