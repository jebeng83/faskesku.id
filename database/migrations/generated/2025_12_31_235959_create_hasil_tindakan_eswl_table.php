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
        if (! Schema::hasTable('hasil_tindakan_eswl')) {
            Schema::create('hasil_tindakan_eswl', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('mulai');
                $table->dateTime('selesai');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('nip', 20)->index('nip');
                $table->string('diagnosa', 50);
                $table->string('tindakan', 50);
                $table->string('obat_analgesik', 150);
                $table->string('obat_lain', 150);
                $table->string('uraian_tindakan', 300);
                $table->string('uraian_tindakan_focus', 50);
                $table->string('uraian_tindakan_rate', 50);
                $table->string('uraian_tindakan_power', 50);
                $table->string('uraian_tindakan_shock', 50);
                $table->string('diintegrasi', 50);
                $table->string('kekurangan', 50);
                $table->string('anjungan', 50);

                $table->primary(['no_rawat', 'mulai']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_tindakan_eswl');
    }
};
