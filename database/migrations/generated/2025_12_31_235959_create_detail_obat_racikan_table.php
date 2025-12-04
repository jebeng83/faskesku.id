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
        if (!Schema::hasTable('detail_obat_racikan')) {
            Schema::create('detail_obat_racikan', function (Blueprint $table) {
                $table->date('tgl_perawatan');
                $table->time('jam');
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('no_racik', 2);
                $table->string('kode_brng', 15)->index('kode_brng');

                $table->primary(['tgl_perawatan', 'jam', 'no_rawat', 'no_racik', 'kode_brng']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_obat_racikan');
    }
};
