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
        if (!Schema::hasTable('data_triase_igdsekunder')) {
            Schema::create('data_triase_igdsekunder', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->string('anamnesa_singkat', 400);
                $table->string('catatan', 100);
                $table->enum('plan', ['Zona Kuning', 'Zona Hijau']);
                $table->dateTime('tanggaltriase');
                $table->string('nik', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_triase_igdsekunder');
    }
};
