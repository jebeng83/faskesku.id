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
        if (! Schema::hasTable('bayar_detail_periksa_lab_perujuk')) {
            Schema::create('bayar_detail_periksa_lab_perujuk', function (Blueprint $table) {
                $table->string('no_bayar', 30)->default('')->index('no_bayar');
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');
                $table->date('tgl_periksa');
                $table->time('jam');
                $table->integer('id_template')->index('id_template');
                $table->double('bagian_perujuk');

                $table->primary(['no_bayar', 'no_rawat', 'kd_jenis_prw', 'tgl_periksa', 'jam', 'id_template']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_detail_periksa_lab_perujuk');
    }
};
