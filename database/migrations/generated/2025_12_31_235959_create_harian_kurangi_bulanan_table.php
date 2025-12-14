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
        if (! Schema::hasTable('harian_kurangi_bulanan')) {
            Schema::create('harian_kurangi_bulanan', function (Blueprint $table) {
                $table->integer('harian')->index('harian');
                $table->integer('bulanan')->index('bulanan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harian_kurangi_bulanan');
    }
};
