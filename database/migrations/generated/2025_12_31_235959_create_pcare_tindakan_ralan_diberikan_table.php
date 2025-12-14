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
        if (! Schema::hasTable('pcare_tindakan_ralan_diberikan')) {
            Schema::create('pcare_tindakan_ralan_diberikan', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->string('noKunjungan', 40);
                $table->string('kdTindakanSK', 15)->nullable();
                $table->date('tgl_perawatan');
                $table->time('jam');
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');
                $table->double('material');
                $table->double('bhp');
                $table->double('tarif_tindakandr');
                $table->double('tarif_tindakanpr');
                $table->double('kso');
                $table->double('menejemen');
                $table->double('biaya_rawat');

                $table->primary(['no_rawat', 'noKunjungan', 'tgl_perawatan', 'jam', 'kd_jenis_prw']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pcare_tindakan_ralan_diberikan');
    }
};
