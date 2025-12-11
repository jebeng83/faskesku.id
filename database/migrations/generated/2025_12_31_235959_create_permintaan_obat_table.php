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
        if (!Schema::hasTable('permintaan_obat')) {
            Schema::create('permintaan_obat', function (Blueprint $table) {
                $table->date('tanggal');
                $table->time('jam');
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kode_brng', 15)->index('kode_brng');

                $table->primary(['tanggal', 'jam', 'no_rawat', 'kode_brng']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_obat');
    }
};
