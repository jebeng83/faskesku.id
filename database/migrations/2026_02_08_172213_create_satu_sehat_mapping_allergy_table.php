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
        Schema::create('satusehat_mapping_alergi', function (Blueprint $table) {
            $table->id();
            $table->string('alergi_kode', 50)->index(); // Foreign key ke data_alergi local
            $table->string('nama_alergi')->index(); // Nama alergi lokal (denormalisasi/cache)
            
            // KFA Mapping (Obat)
            $table->string('kfa_code', 50)->nullable();
            $table->string('kfa_display')->nullable();
            
            // SNOMED Mapping (Manifestasi/Substansi lain)
            $table->string('snomed_code', 50)->nullable();
            $table->string('snomed_display')->nullable();
            
            // Kategori (medication, food, environment)
            $table->string('category', 20)->default('environment'); 
            
            $table->timestamps();

            // Index dan unique constraint jika diperlukan
            // $table->unique('alergi_kode');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satusehat_mapping_alergi');
    }
};
