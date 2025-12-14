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
        if (! Schema::hasTable('checklist_kriteria_masuk_hcu')) {
            Schema::create('checklist_kriteria_masuk_hcu', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('kardiologi1', ['Ya', 'Tidak']);
                $table->enum('kardiologi2', ['Ya', 'Tidak']);
                $table->enum('kardiologi3', ['Ya', 'Tidak']);
                $table->enum('kardiologi4', ['Ya', 'Tidak']);
                $table->enum('kardiologi5', ['Ya', 'Tidak']);
                $table->enum('kardiologi6', ['Ya', 'Tidak']);
                $table->enum('pernapasan1', ['Ya', 'Tidak']);
                $table->enum('pernapasan2', ['Ya', 'Tidak']);
                $table->enum('pernapasan3', ['Ya', 'Tidak']);
                $table->enum('syaraf1', ['Ya', 'Tidak']);
                $table->enum('syaraf2', ['Ya', 'Tidak']);
                $table->enum('syaraf3', ['Ya', 'Tidak']);
                $table->enum('syaraf4', ['Ya', 'Tidak']);
                $table->enum('pencernaan1', ['Ya', 'Tidak']);
                $table->enum('pencernaan2', ['Ya', 'Tidak']);
                $table->enum('pencernaan3', ['Ya', 'Tidak']);
                $table->enum('pencernaan4', ['Ya', 'Tidak']);
                $table->enum('pembedahan1', ['Ya', 'Tidak']);
                $table->enum('pembedahan2', ['Ya', 'Tidak']);
                $table->enum('hematologi1', ['Ya', 'Tidak']);
                $table->enum('hematologi2', ['Ya', 'Tidak']);
                $table->enum('infeksi', ['Ya', 'Tidak']);
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
        Schema::dropIfExists('checklist_kriteria_masuk_hcu');
    }
};
