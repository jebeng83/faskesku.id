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
        if (!Schema::hasTable('set_keterlambatan')) {
            Schema::create('set_keterlambatan', function (Blueprint $table) {
                $table->integer('toleransi')->nullable();
                $table->integer('terlambat1')->nullable();
                $table->integer('terlambat2')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_keterlambatan');
    }
};
