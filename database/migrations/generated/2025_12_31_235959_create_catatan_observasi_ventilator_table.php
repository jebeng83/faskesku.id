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
        if (! Schema::hasTable('catatan_observasi_ventilator')) {
            Schema::create('catatan_observasi_ventilator', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->enum('mode', ['CPAP', 'Nasal IMV', 'IMV', 'SIMV', 'A/C Atau SIPPV', 'PSV', 'Volume Guarantee', 'HFO', 'HFO + IMV'])->nullable();
                $table->string('vt', 5)->nullable();
                $table->string('pakar', 30)->nullable();
                $table->string('rr', 5)->nullable();
                $table->string('reefps', 5)->nullable();
                $table->string('ee', 5)->nullable();
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
        Schema::dropIfExists('catatan_observasi_ventilator');
    }
};
