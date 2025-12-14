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
        if (! Schema::hasTable('generated_numbers')) {
            Schema::create('generated_numbers', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('type', 20);
                $table->date('tanggal');
                $table->string('kd_dokter', 20)->nullable();
                $table->string('kd_poli', 5)->nullable();
                $table->string('generated_number', 50);
                $table->integer('sequence_number');
                $table->timestamps();

                $table->index(['type', 'tanggal', 'kd_dokter', 'kd_poli']);
                $table->unique(['type', 'tanggal', 'kd_dokter', 'kd_poli', 'sequence_number'], 'unique_generated_number');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('generated_numbers');
    }
};
