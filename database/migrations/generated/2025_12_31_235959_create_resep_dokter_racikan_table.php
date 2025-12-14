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
        if (! Schema::hasTable('resep_dokter_racikan')) {
            Schema::create('resep_dokter_racikan', function (Blueprint $table) {
                $table->string('no_resep', 14);
                $table->string('no_racik', 2);
                $table->string('nama_racik', 100);
                $table->string('kd_racik', 3)->index('kd_racik');
                $table->integer('jml_dr');
                $table->string('aturan_pakai', 150);
                $table->string('keterangan', 50);

                $table->primary(['no_resep', 'no_racik']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resep_dokter_racikan');
    }
};
