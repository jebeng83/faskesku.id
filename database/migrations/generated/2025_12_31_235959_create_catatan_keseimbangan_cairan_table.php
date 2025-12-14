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
        if (! Schema::hasTable('catatan_keseimbangan_cairan')) {
            Schema::create('catatan_keseimbangan_cairan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->string('infus', 4)->nullable();
                $table->string('tranfusi', 4);
                $table->string('minum', 4)->nullable();
                $table->string('urine', 4)->nullable();
                $table->string('drain', 4)->nullable();
                $table->string('ngt', 4);
                $table->string('iwl', 4);
                $table->string('keseimbangan', 4);
                $table->string('keterangan', 200);
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tgl_perawatan', 'jam_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_keseimbangan_cairan');
    }
};
