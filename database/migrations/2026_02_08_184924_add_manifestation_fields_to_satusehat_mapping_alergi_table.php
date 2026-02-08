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
        Schema::table('satusehat_mapping_alergi', function (Blueprint $table) {
            // Manifestasi/Reaksi default
            $table->string('manifestation_code', 50)->nullable()->after('snomed_display');
            $table->string('manifestation_display')->nullable()->after('manifestation_code');
            
            // Criticality (low, high, unable-to-assess)
            $table->string('criticality', 30)->default('unable-to-assess')->after('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('satusehat_mapping_alergi', function (Blueprint $table) {
            $table->dropColumn(['manifestation_code', 'manifestation_display', 'criticality']);
        });
    }
};
