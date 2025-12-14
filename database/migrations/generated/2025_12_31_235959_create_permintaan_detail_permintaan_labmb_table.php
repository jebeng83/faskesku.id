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
        if (! Schema::hasTable('permintaan_detail_permintaan_labmb')) {
            Schema::create('permintaan_detail_permintaan_labmb', function (Blueprint $table) {
                $table->string('noorder', 15);
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');
                $table->integer('id_template')->index('id_template');
                $table->enum('stts_bayar', ['Sudah', 'Belum'])->nullable();

                $table->primary(['noorder', 'kd_jenis_prw', 'id_template']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_detail_permintaan_labmb');
    }
};
