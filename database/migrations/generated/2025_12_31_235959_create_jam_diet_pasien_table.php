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
        if (! Schema::hasTable('jam_diet_pasien')) {
            Schema::create('jam_diet_pasien', function (Blueprint $table) {
                $table->enum('waktu', ['Pagi', 'Pagi2', 'Pagi3', 'Siang', 'Siang2', 'Siang3', 'Sore', 'Sore2', 'Sore3', 'Malam', 'Malam2', 'Malam3'])->primary();
                $table->char('jam', 5)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jam_diet_pasien');
    }
};
