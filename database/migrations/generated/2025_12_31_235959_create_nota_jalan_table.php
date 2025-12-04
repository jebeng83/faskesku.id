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
        if (!Schema::hasTable('nota_jalan')) {
            Schema::create('nota_jalan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->default('')->primary();
                $table->string('no_nota', 17)->nullable()->unique('no_nota');
                $table->date('tanggal')->nullable()->index('tanggal');
                $table->time('jam')->nullable()->index('jam');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nota_jalan');
    }
};
