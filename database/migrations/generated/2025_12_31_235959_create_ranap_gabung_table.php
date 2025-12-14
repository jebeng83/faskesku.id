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
        if (! Schema::hasTable('ranap_gabung')) {
            Schema::create('ranap_gabung', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('no_rawat2', 17)->index('no_rawat2');

                $table->primary(['no_rawat', 'no_rawat2']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ranap_gabung');
    }
};
