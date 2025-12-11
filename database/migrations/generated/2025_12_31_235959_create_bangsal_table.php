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
        if (!Schema::hasTable('bangsal')) {
            Schema::create('bangsal', function (Blueprint $table) {
                $table->char('kd_bangsal', 5)->primary();
                $table->string('nm_bangsal', 30)->nullable()->index('nm_bangsal');
                $table->enum('status', ['0', '1'])->nullable()->index('status');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bangsal');
    }
};
