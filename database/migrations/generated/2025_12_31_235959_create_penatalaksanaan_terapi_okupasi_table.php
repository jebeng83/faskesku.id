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
        if (! Schema::hasTable('penatalaksanaan_terapi_okupasi')) {
            Schema::create('penatalaksanaan_terapi_okupasi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->string('keluhan_utama', 400)->default('');
                $table->string('rpd', 300)->default('');
                $table->string('rps', 300);
                $table->string('anamnesa_general', 300);
                $table->string('tanda_vital', 150);
                $table->string('pemeriksaan_penunjang', 200);
                $table->enum('spesialisasi', ['Pediatri', 'Dewasa', 'Geriatri', 'Psikososial', '-']);
                $table->string('keterangan_spesialisasi', 30);
                $table->string('pemeriksaan_okupasi_terapi', 200);
                $table->string('aset', 150);
                $table->string('limitasi', 150);
                $table->string('diagnosa_terapi_okupasi', 100);
                $table->string('rencana_intervensi', 400);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penatalaksanaan_terapi_okupasi');
    }
};
