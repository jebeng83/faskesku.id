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
        if (! Schema::hasTable('insiden_keselamatan_pasien')) {
            Schema::create('insiden_keselamatan_pasien', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_kejadian');
                $table->time('jam_kejadian');
                $table->date('tgl_lapor');
                $table->time('jam_lapor');
                $table->string('kode_insiden', 5)->index('kode_insiden');
                $table->string('nip', 20)->index('nip');
                $table->string('lokasi', 60);
                $table->string('kronologis', 300);
                $table->string('unit_terkait', 60);
                $table->string('akibat', 150);
                $table->string('tindakan_insiden', 150);
                $table->string('identifikasi_masalah', 150);
                $table->string('rtl', 150);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insiden_keselamatan_pasien');
    }
};
