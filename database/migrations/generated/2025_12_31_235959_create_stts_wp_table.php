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
        if (!Schema::hasTable('stts_wp')) {
            Schema::create('stts_wp', function (Blueprint $table) {
                $table->char('stts', 5)->primary();
                $table->string('ktg', 50);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stts_wp');
    }
};
