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
        if (!Schema::hasTable('riwayat_surat_peringatan')) {
            Schema::create('riwayat_surat_peringatan', function (Blueprint $table) {
                $table->integer('id');
                $table->string('jenis', 30);
                $table->string('nama_peringatan', 60);
                $table->date('tanggal');
                $table->string('berkas', 500)->nullable();

                $table->primary(['id', 'nama_peringatan', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_surat_peringatan');
    }
};
