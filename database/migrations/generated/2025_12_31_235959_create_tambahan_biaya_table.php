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
        if (! Schema::hasTable('tambahan_biaya')) {
            Schema::create('tambahan_biaya', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->string('nama_biaya', 60);
                $table->double('besar_biaya');

                $table->primary(['no_rawat', 'nama_biaya']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tambahan_biaya');
    }
};
