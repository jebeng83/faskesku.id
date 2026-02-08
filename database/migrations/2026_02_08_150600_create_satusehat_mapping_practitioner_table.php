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
        Schema::create('satusehat_mapping_practitioner', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100)->comment('Nama practitioner');
            $table->string('nik', 20)->unique()->comment('NIK practitioner (unique)');
            $table->string('satusehat_id', 100)->comment('IHS ID dari SATU SEHAT');
            $table->text('fhir_json')->nullable()->comment('Full FHIR Practitioner resource');
            $table->timestamps();
            
            // Indexes
            $table->index('satusehat_id');
            $table->index('nama');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satusehat_mapping_practitioner');
    }
};
