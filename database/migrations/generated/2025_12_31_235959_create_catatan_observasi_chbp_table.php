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
        if (!Schema::hasTable('catatan_observasi_chbp')) {
            Schema::create('catatan_observasi_chbp', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->string('td', 8);
                $table->string('hr', 5)->nullable();
                $table->string('suhu', 5)->nullable();
                $table->string('djj', 5);
                $table->string('his', 20);
                $table->string('ppv', 10);
                $table->string('keterangan', 50);
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
        Schema::dropIfExists('catatan_observasi_chbp');
    }
};
