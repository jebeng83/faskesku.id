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
        if (!Schema::hasTable('catatan_cairan_hemodialisa')) {
            Schema::create('catatan_cairan_hemodialisa', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->string('minum', 10)->nullable();
                $table->string('infus', 10)->nullable();
                $table->string('tranfusi', 10)->nullable();
                $table->string('sisa_priming', 10)->nullable();
                $table->string('wash_out', 10)->nullable();
                $table->string('urine', 10)->nullable();
                $table->string('pendarahan', 10)->nullable();
                $table->string('muntah', 10)->nullable();
                $table->string('keterangan', 100)->nullable();
                $table->string('nip', 20)->nullable()->index('nip');

                $table->primary(['no_rawat', 'tgl_perawatan', 'jam_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_cairan_hemodialisa');
    }
};
