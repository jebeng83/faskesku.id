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
        if (! Schema::hasTable('pcare_peserta_kegiatan_kelompok')) {
            Schema::create('pcare_peserta_kegiatan_kelompok', function (Blueprint $table) {
                $table->string('eduId', 15);
                $table->string('no_rkm_medis', 15)->index('no_rkm_medis');

                $table->primary(['eduId', 'no_rkm_medis']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pcare_peserta_kegiatan_kelompok');
    }
};
