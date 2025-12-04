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
        if (!Schema::hasTable('perbaikan_inventaris')) {
            Schema::create('perbaikan_inventaris', function (Blueprint $table) {
                $table->string('no_permintaan', 15)->primary();
                $table->date('tanggal');
                $table->string('uraian_kegiatan');
                $table->string('nip', 20)->index('nip');
                $table->enum('pelaksana', ['Teknisi Rumah Sakit', 'Teknisi Rujukan', 'Pihak ke III']);
                $table->double('biaya');
                $table->string('keterangan');
                $table->enum('status', ['Bisa Diperbaiki', 'Tidak Bisa Diperbaiki']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perbaikan_inventaris');
    }
};
