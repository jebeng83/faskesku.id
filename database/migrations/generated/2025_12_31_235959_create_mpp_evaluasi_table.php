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
        if (! Schema::hasTable('mpp_evaluasi')) {
            Schema::create('mpp_evaluasi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->string('kd_konsulan', 20)->nullable()->index('kd_konsulan');
                $table->string('diagnosis', 150)->default('');
                $table->string('kelompok', 150)->default('');
                $table->string('assesmen', 250);
                $table->string('identifikasi', 250);
                $table->string('rencana', 2000);
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mpp_evaluasi');
    }
};
