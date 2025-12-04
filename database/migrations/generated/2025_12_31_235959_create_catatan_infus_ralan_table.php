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
        if (!Schema::hasTable('catatan_infus_ralan')) {
            Schema::create('catatan_infus_ralan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_infus');
                $table->time('jam_infus');
                $table->string('nip', 20)->index('nip');
                $table->string('kolf', 10);
                $table->string('nm_cairan', 30);
                $table->string('obat', 30);
                $table->string('keterangan', 50);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_infus_ralan');
    }
};
