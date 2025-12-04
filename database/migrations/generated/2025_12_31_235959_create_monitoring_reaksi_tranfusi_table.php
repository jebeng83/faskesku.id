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
        if (!Schema::hasTable('monitoring_reaksi_tranfusi')) {
            Schema::create('monitoring_reaksi_tranfusi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->string('produk_darah', 40)->nullable();
                $table->string('no_kantong', 20)->nullable();
                $table->string('lokasi_insersi', 40);
                $table->string('td', 8);
                $table->string('hr', 5)->nullable();
                $table->string('rr', 5)->nullable();
                $table->string('suhu', 5)->nullable();
                $table->string('jenis_reaksi_alergi', 70)->nullable();
                $table->string('keterangan', 70)->nullable();
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tgl_perawatan', 'jam_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitoring_reaksi_tranfusi');
    }
};
