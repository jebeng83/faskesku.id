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
        if (! Schema::hasTable('sisa_diet_pasien')) {
            Schema::create('sisa_diet_pasien', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kd_kamar', 15)->index('kd_kamar');
                $table->date('tanggal')->index('tanggal');
                $table->enum('waktu', ['Pagi', 'Pagi2', 'Pagi3', 'Siang', 'Siang2', 'Siang3', 'Sore', 'Sore2', 'Sore3', 'Malam', 'Malam2', 'Malam3'])->index('waktu');
                $table->integer('karbohidrat')->nullable();
                $table->integer('hewani')->nullable();
                $table->integer('nabati')->nullable();
                $table->integer('sayur')->nullable();
                $table->integer('buah')->nullable();

                $table->primary(['no_rawat', 'kd_kamar', 'tanggal', 'waktu']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sisa_diet_pasien');
    }
};
