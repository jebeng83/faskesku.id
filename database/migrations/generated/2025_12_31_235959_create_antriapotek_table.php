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
        if (!Schema::hasTable('antriapotek')) {
            Schema::create('antriapotek', function (Blueprint $table) {
                $table->integer('loket')->index('loket');
                $table->integer('antrian')->index('antrian');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antriapotek');
    }
};
