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
        if (! Schema::hasTable('bridging_resep_apotek_bpjs')) {
            Schema::create('bridging_resep_apotek_bpjs', function (Blueprint $table) {
                $table->string('no_sep', 40)->nullable()->index('no_sep');
                $table->string('no_sep_apotek', 40)->primary();
                $table->dateTime('tgl_sep');
                $table->string('kdpoli', 15);
                $table->string('nmpoli', 50);
                $table->enum('kdjenis', ['1. Obat PRB', '2. Obat Kronis Blm Stabil', '3. Obat Kemoterapi'])->nullable();
                $table->string('nota_piutang', 20)->nullable();
                $table->string('id_user_sep', 50)->nullable();
                $table->dateTime('tgl_resep')->nullable();
                $table->dateTime('tgl_pelayanan')->nullable();
                $table->string('kodedpjp', 10);
                $table->string('nmdpjp', 100);
                $table->enum('iterasi', ['0. Non Iterasi', '1. Iterasi']);
                $table->string('no_kartu', 25);
                $table->string('nama_pasien', 100);
                $table->string('kdppkrujukan', 12);
                $table->string('nmppkpelayanan', 200);
                $table->double('byTagRsp');
                $table->double('byVerRsp');
                $table->enum('status', ['Piutang', 'Non Piutang']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bridging_resep_apotek_bpjs');
    }
};
