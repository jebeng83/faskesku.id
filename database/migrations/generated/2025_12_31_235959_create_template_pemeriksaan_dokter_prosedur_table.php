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
        if (! Schema::hasTable('template_pemeriksaan_dokter_prosedur')) {
            Schema::create('template_pemeriksaan_dokter_prosedur', function (Blueprint $table) {
                $table->string('no_template', 20);
                $table->string('kode', 8)->index('kode');
                $table->integer('urut');

                $table->primary(['no_template', 'kode']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_pemeriksaan_dokter_prosedur');
    }
};
