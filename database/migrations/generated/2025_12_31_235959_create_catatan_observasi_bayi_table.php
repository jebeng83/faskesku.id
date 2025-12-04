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
        if (!Schema::hasTable('catatan_observasi_bayi')) {
            Schema::create('catatan_observasi_bayi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->string('gcs', 10)->nullable();
                $table->string('td', 8)->nullable();
                $table->string('hr', 5)->nullable();
                $table->string('rr', 5)->nullable();
                $table->string('suhu', 5)->nullable();
                $table->string('spo2', 3)->nullable();
                $table->string('nch', 70)->nullable();
                $table->string('ikterik_status', 30)->nullable();
                $table->string('retraksi_dada', 30)->nullable();
                $table->string('ogt_residu', 30)->nullable();
                $table->string('asi_jumlah', 30)->nullable();
                $table->string('pasi_jumlah', 30)->nullable();
                $table->string('bak_status', 30)->nullable();
                $table->string('bab_status', 30)->nullable();
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
        Schema::dropIfExists('catatan_observasi_bayi');
    }
};
