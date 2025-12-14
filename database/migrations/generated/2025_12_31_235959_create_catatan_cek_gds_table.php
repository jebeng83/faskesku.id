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
        if (! Schema::hasTable('catatan_cek_gds')) {
            Schema::create('catatan_cek_gds', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->string('gdp', 5)->nullable();
                $table->string('insulin', 30)->nullable();
                $table->string('obat_gula', 30)->nullable();
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
        Schema::dropIfExists('catatan_cek_gds');
    }
};
