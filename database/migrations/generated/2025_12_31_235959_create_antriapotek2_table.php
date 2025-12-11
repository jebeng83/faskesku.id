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
        if (!Schema::hasTable('antriapotek2')) {
            Schema::create('antriapotek2', function (Blueprint $table) {
                $table->string('no_resep', 14)->nullable();
                $table->enum('status', ['0', '1'])->nullable();
                $table->string('no_rawat', 17);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antriapotek2');
    }
};
