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
        if (!Schema::hasTable('checklist_kriteria_keluar_icu')) {
            Schema::create('checklist_kriteria_keluar_icu', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('kriteria1', ['Ya', 'Tidak']);
                $table->enum('kriteria2', ['Ya', 'Tidak']);
                $table->enum('kriteria3', ['Ya', 'Tidak']);
                $table->enum('kriteria4', ['Ya', 'Tidak']);
                $table->enum('kriteria5', ['Ya', 'Tidak']);
                $table->enum('kriteria6', ['Ya', 'Tidak']);
                $table->enum('kriteria7', ['Ya', 'Tidak']);
                $table->enum('kriteria8', ['Ya', 'Tidak']);
                $table->enum('kriteria9', ['Ya', 'Tidak']);
                $table->enum('kriteria10', ['Ya', 'Tidak']);
                $table->enum('kriteria11', ['Ya', 'Tidak']);
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
        Schema::dropIfExists('checklist_kriteria_keluar_icu');
    }
};
