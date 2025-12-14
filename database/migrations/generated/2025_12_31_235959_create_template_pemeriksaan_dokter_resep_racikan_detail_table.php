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
        if (! Schema::hasTable('template_pemeriksaan_dokter_resep_racikan_detail')) {
            Schema::create('template_pemeriksaan_dokter_resep_racikan_detail', function (Blueprint $table) {
                $table->string('no_template', 20);
                $table->string('no_racik', 2);
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->double('p1')->nullable();
                $table->double('p2')->nullable();
                $table->string('kandungan', 10)->nullable();
                $table->double('jml')->nullable();

                $table->primary(['no_template', 'no_racik', 'kode_brng']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_pemeriksaan_dokter_resep_racikan_detail');
    }
};
