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
        if (! Schema::hasTable('diagnosa_pasien')) {
            Schema::create('diagnosa_pasien', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kd_penyakit', 15)->index('kd_penyakit');
                $table->enum('status', ['Ralan', 'Ranap'])->index('status');
                $table->tinyInteger('prioritas')->index('prioritas');
                $table->enum('status_penyakit', ['Lama', 'Baru'])->nullable();

                $table->primary(['no_rawat', 'kd_penyakit', 'status']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnosa_pasien');
    }
};
