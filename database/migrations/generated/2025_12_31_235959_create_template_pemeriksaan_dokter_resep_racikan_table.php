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
        if (!Schema::hasTable('template_pemeriksaan_dokter_resep_racikan')) {
            Schema::create('template_pemeriksaan_dokter_resep_racikan', function (Blueprint $table) {
                $table->string('no_template', 20);
                $table->string('no_racik', 2);
                $table->string('nama_racik', 100)->nullable();
                $table->string('kd_racik', 3)->nullable()->index('kd_racik');
                $table->integer('jml_dr')->nullable();
                $table->string('aturan_pakai', 150)->nullable();
                $table->string('keterangan', 50)->nullable();

                $table->primary(['no_template', 'no_racik']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_pemeriksaan_dokter_resep_racikan');
    }
};
