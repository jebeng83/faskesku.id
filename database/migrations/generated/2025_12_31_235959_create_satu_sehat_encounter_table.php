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
        if (! Schema::hasTable('satu_sehat_encounter')) {
            Schema::create('satu_sehat_encounter', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->string('id_encounter', 40)->nullable();
                $table->string('id_encounter_2', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_encounter');
    }
};
