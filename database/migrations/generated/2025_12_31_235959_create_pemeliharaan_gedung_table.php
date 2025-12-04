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
        if (!Schema::hasTable('pemeliharaan_gedung')) {
            Schema::create('pemeliharaan_gedung', function (Blueprint $table) {
                $table->string('no_pemeliharaan', 20)->primary();
                $table->date('tanggal');
                $table->string('uraian_kegiatan');
                $table->string('nip', 20)->index('nip');
                $table->enum('pelaksana', ['Teknisi Rumah Sakit', 'Pihak ke III']);
                $table->double('biaya');
                $table->enum('jenis_pemeliharaan', ['Running Maintenance', 'Shut Down Maintenance', 'Emergency Maintenance']);
                $table->string('tindak_lanjut', 100);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeliharaan_gedung');
    }
};
