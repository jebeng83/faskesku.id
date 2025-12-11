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
        if (!Schema::hasTable('referensi_mobilejkn_bpjs_batal')) {
            Schema::create('referensi_mobilejkn_bpjs_batal', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15)->index('no_rkm_medis');
                $table->string('no_rawat_batal', 17)->nullable();
                $table->string('nomorreferensi', 40);
                $table->dateTime('tanggalbatal');
                $table->string('keterangan', 200)->nullable();
                $table->enum('statuskirim', ['Sudah', 'Belum']);
                $table->string('nobooking', 15)->primary();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referensi_mobilejkn_bpjs_batal');
    }
};
