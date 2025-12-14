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
        if (! Schema::hasTable('inacbg_klaim_baru2')) {
            Schema::create('inacbg_klaim_baru2', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->string('no_sep', 40)->default('')->unique('no_sep');
                $table->string('patient_id', 30)->nullable();
                $table->string('admission_id', 30)->nullable();
                $table->string('hospital_admission_id', 30)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inacbg_klaim_baru2');
    }
};
