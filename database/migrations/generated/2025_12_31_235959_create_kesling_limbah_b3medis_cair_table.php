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
        if (!Schema::hasTable('kesling_limbah_b3medis_cair')) {
            Schema::create('kesling_limbah_b3medis_cair', function (Blueprint $table) {
                $table->string('nip', 20);
                $table->dateTime('tanggal');
                $table->double('jmllimbah')->nullable();
                $table->string('tujuan_penyerahan', 50)->nullable();
                $table->string('bukti_dokumen', 20)->nullable();
                $table->double('sisa_di_tps')->nullable();
                $table->string('keterangan', 60);

                $table->primary(['nip', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kesling_limbah_b3medis_cair');
    }
};
