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
        if (!Schema::hasTable('data_klasifikasi_pasien_ranap')) {
            Schema::create('data_klasifikasi_pasien_ranap', function (Blueprint $table) {
                $table->date('tanggal');
                $table->string('no_rawat', 51)->index('no_rawat');
                $table->enum('Minimal', ['TIDAK', 'IYA'])->nullable();
                $table->enum('Partial', ['TIDAK', 'IYA'])->nullable();
                $table->enum('Total', ['TIDAK', 'IYA'])->nullable();
                $table->string('kd_kamar', 45)->nullable()->index('kd_kamar');

                $table->primary(['tanggal', 'no_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_klasifikasi_pasien_ranap');
    }
};
