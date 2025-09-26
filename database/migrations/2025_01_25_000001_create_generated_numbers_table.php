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
        Schema::create('generated_numbers', function (Blueprint $table) {
            $table->id();
            $table->string('type', 20); // 'no_rawat' or 'no_reg'
            $table->date('tanggal');
            $table->string('kd_dokter', 20)->nullable();
            $table->string('kd_poli', 5)->nullable();
            $table->string('generated_number', 50);
            $table->integer('sequence_number');
            $table->timestamps();
            
            // Unique constraint to prevent duplicates
            $table->unique(['type', 'tanggal', 'kd_dokter', 'kd_poli', 'sequence_number'], 'unique_generated_number');
            
            // Index for faster lookups
            $table->index(['type', 'tanggal', 'kd_dokter', 'kd_poli']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('generated_numbers');
    }
};