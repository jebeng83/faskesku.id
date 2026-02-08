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
        // Table untuk tracking Encounter yang sudah dikirim ke SATU SEHAT
        Schema::create('satusehat_encounter', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 17)->unique();
            $table->string('satusehat_id', 100)->nullable();
            $table->text('fhir_json')->nullable();
            $table->string('status', 20)->default('pending'); // pending, sent, finished, error
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->index('no_rawat');
            $table->index('status');
            $table->index('sent_at');
        });
        
        // Table untuk mapping Patient lokal ke SATU SEHAT
        Schema::create('satusehat_patient_mapping', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 16)->unique();
            $table->string('no_rkm_medis', 15)->nullable();
            $table->string('satusehat_id', 100);
            $table->timestamps();
            
            $table->index('nik');
            $table->index('no_rkm_medis');
        });
        
        // Table untuk tracking semua resources (optional, untuk general purpose)
        Schema::create('satusehat_resources', function (Blueprint $table) {
            $table->id();
            $table->string('resource_type', 50); // Encounter, Condition, Observation, dll
            $table->string('local_id', 100); // ID lokal (no_rawat, dll)
            $table->string('satusehat_id', 100)->nullable(); // UUID dari SATU SEHAT
            $table->text('fhir_payload')->nullable(); // Full FHIR resource (JSON)
            $table->string('status', 20)->default('pending'); // pending, sent, error
            $table->text('error_message')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
            
            $table->index('resource_type');
            $table->index('local_id');
            $table->index('status');
            $table->index(['resource_type', 'local_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satusehat_tracking_tables');
    }
};
