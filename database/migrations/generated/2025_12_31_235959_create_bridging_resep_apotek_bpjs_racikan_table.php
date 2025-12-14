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
        if (! Schema::hasTable('bridging_resep_apotek_bpjs_racikan')) {
            Schema::create('bridging_resep_apotek_bpjs_racikan', function (Blueprint $table) {
                $table->string('no_sep_apotek', 40)->index('no_sep_apotek');
                $table->string('nomor_racik', 3)->nullable();
                $table->string('kode_brng', 15)->nullable()->index('kode_brng');
                $table->string('signa1', 5)->nullable();
                $table->string('signa2', 5)->nullable();
                $table->double('jml_obat')->nullable();
                $table->double('permintaan')->nullable();
                $table->double('jho')->nullable();
                $table->string('catatan', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bridging_resep_apotek_bpjs_racikan');
    }
};
