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
        if (!Schema::hasTable('checklist_kriteria_masuk_icu')) {
            Schema::create('checklist_kriteria_masuk_icu', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('prioritas1_1', ['Ya', 'Tidak']);
                $table->enum('prioritas1_2', ['Ya', 'Tidak']);
                $table->enum('prioritas1_3', ['Ya', 'Tidak']);
                $table->enum('prioritas1_4', ['Ya', 'Tidak']);
                $table->enum('prioritas1_5', ['Ya', 'Tidak']);
                $table->enum('prioritas1_6', ['Ya', 'Tidak']);
                $table->enum('prioritas2_1', ['Ya', 'Tidak']);
                $table->enum('prioritas2_2', ['Ya', 'Tidak']);
                $table->enum('prioritas2_3', ['Ya', 'Tidak']);
                $table->enum('prioritas2_4', ['Ya', 'Tidak']);
                $table->enum('prioritas2_5', ['Ya', 'Tidak']);
                $table->enum('prioritas2_6', ['Ya', 'Tidak']);
                $table->enum('prioritas2_7', ['Ya', 'Tidak']);
                $table->enum('prioritas2_8', ['Ya', 'Tidak']);
                $table->enum('prioritas3_1', ['Ya', 'Tidak']);
                $table->enum('prioritas3_2', ['Ya', 'Tidak']);
                $table->enum('prioritas3_3', ['Ya', 'Tidak']);
                $table->enum('prioritas3_4', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_tanda_vital_1', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_tanda_vital_2', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_tanda_vital_3', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_tanda_vital_4', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_tanda_vital_5', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_laborat_1', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_laborat_2', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_laborat_3', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_laborat_4', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_laborat_5', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_laborat_6', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_radiologi_1', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_radiologi_2', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_klinis_1', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_klinis_2', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_klinis_3', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_klinis_4', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_klinis_5', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_klinis_6', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_klinis_7', ['Ya', 'Tidak']);
                $table->enum('kriteria_fisiologis_klinis_8', ['Ya', 'Tidak']);
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
        Schema::dropIfExists('checklist_kriteria_masuk_icu');
    }
};
