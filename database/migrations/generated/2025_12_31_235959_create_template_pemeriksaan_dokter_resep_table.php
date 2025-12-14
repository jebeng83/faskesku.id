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
        if (! Schema::hasTable('template_pemeriksaan_dokter_resep')) {
            Schema::create('template_pemeriksaan_dokter_resep', function (Blueprint $table) {
                $table->string('no_template', 20);
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->double('jml')->nullable();
                $table->string('aturan_pakai', 150)->nullable();

                $table->primary(['no_template', 'kode_brng']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_pemeriksaan_dokter_resep');
    }
};
