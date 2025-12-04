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
        if (!Schema::hasTable('detail_beri_diet')) {
            Schema::create('detail_beri_diet', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kd_kamar', 15)->index('kd_kamar');
                $table->date('tanggal')->index('tanggal');
                $table->enum('waktu', ['Pagi', 'Pagi2', 'Pagi3', 'Siang', 'Siang2', 'Siang3', 'Sore', 'Sore2', 'Sore3', 'Malam', 'Malam2', 'Malam3'])->index('waktu');
                $table->string('kd_diet', 3)->index('kd_diet');

                $table->primary(['no_rawat', 'kd_kamar', 'tanggal', 'waktu', 'kd_diet']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_beri_diet');
    }
};
