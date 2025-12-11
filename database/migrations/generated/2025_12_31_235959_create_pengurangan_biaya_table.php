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
        if (!Schema::hasTable('pengurangan_biaya')) {
            Schema::create('pengurangan_biaya', function (Blueprint $table) {
                $table->string('no_rawat', 17)->default('');
                $table->string('nama_pengurangan', 60);
                $table->double('besar_pengurangan')->nullable();

                $table->primary(['no_rawat', 'nama_pengurangan']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengurangan_biaya');
    }
};
