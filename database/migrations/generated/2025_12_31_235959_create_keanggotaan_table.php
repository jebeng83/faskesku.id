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
        if (!Schema::hasTable('keanggotaan')) {
            Schema::create('keanggotaan', function (Blueprint $table) {
                $table->integer('id')->primary();
                $table->char('koperasi', 5)->index('koperasi');
                $table->char('jamsostek', 5)->index('jamsostek');
                $table->char('bpjs', 5)->index('bpjs');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keanggotaan');
    }
};
