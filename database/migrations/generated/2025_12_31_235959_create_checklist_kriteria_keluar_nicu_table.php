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
        if (!Schema::hasTable('checklist_kriteria_keluar_nicu')) {
            Schema::create('checklist_kriteria_keluar_nicu', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('respirasi1', ['Ya', 'Tidak']);
                $table->enum('respirasi2', ['Ya', 'Tidak']);
                $table->enum('respirasi3', ['Ya', 'Tidak']);
                $table->enum('kardio1', ['Ya', 'Tidak']);
                $table->enum('kardio2', ['Ya', 'Tidak']);
                $table->enum('nutrisi1', ['Ya', 'Tidak']);
                $table->enum('nutrisi2', ['Ya', 'Tidak']);
                $table->enum('nutrisi3', ['Ya', 'Tidak']);
                $table->enum('suhutubuh1', ['Ya', 'Tidak']);
                $table->enum('suhutubuh2', ['Ya', 'Tidak']);
                $table->enum('infeksi1', ['Ya', 'Tidak']);
                $table->enum('infeksi2', ['Ya', 'Tidak']);
                $table->enum('infeksi3', ['Ya', 'Tidak']);
                $table->enum('keputusan', ['Layak Dipindahkan Ke Ruang Rawat Bayi/Rawat Gabung', 'Layak Pulang', 'Tetap Di NICU']);
                $table->string('keterangan', 50)->nullable();
                $table->string('nik', 20)->nullable()->index('nik');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checklist_kriteria_keluar_nicu');
    }
};
