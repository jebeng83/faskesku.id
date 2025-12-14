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
        if (! Schema::hasTable('checklist_kriteria_masuk_nicu')) {
            Schema::create('checklist_kriteria_masuk_nicu', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('respirasi1', ['Ya', 'Tidak']);
                $table->enum('respirasi2', ['Ya', 'Tidak']);
                $table->enum('respirasi3', ['Ya', 'Tidak']);
                $table->enum('respirasi4', ['Ya', 'Tidak']);
                $table->enum('prematur1', ['Ya', 'Tidak']);
                $table->enum('prematur2', ['Ya', 'Tidak']);
                $table->enum('prematur3', ['Ya', 'Tidak']);
                $table->enum('kardio1', ['Ya', 'Tidak']);
                $table->enum('kardio2', ['Ya', 'Tidak']);
                $table->enum('kardio3', ['Ya', 'Tidak']);
                $table->enum('neuro1', ['Ya', 'Tidak']);
                $table->enum('neuro2', ['Ya', 'Tidak']);
                $table->enum('neuro3', ['Ya', 'Tidak']);
                $table->enum('metabolik1', ['Ya', 'Tidak']);
                $table->enum('metabolik2', ['Ya', 'Tidak']);
                $table->enum('metabolik3', ['Ya', 'Tidak']);
                $table->enum('kondisilain1', ['Ya', 'Tidak']);
                $table->enum('kondisilain2', ['Ya', 'Tidak']);
                $table->enum('kondisilain3', ['Ya', 'Tidak']);
                $table->enum('kondisilain4', ['Ya', 'Tidak']);
                $table->enum('keputusan', ['Diterima Di NICU', 'Tidak Diterima - Dirawat Di Ruang Perawatan Bayi Lain']);
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
        Schema::dropIfExists('checklist_kriteria_masuk_nicu');
    }
};
