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
        if (!Schema::hasTable('catatan_observasi_hemodialisa')) {
            Schema::create('catatan_observasi_hemodialisa', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->string('qb', 10)->nullable();
                $table->string('qd', 8);
                $table->string('tekanan_arteri', 5)->nullable();
                $table->string('tekanan_vena', 5)->nullable();
                $table->string('tmp', 5)->nullable();
                $table->string('ufr', 5)->nullable();
                $table->string('tensi', 8)->nullable();
                $table->string('nadi', 6)->nullable();
                $table->string('suhu', 5)->nullable();
                $table->string('spo2', 5)->nullable();
                $table->string('tindakan', 100)->nullable();
                $table->string('ufg', 10)->nullable();
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
        Schema::dropIfExists('catatan_observasi_hemodialisa');
    }
};
