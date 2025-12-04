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
        if (!Schema::hasTable('rekening')) {
            Schema::create('rekening', function (Blueprint $table) {
                $table->string('kd_rek', 15)->default('')->primary();
                $table->string('nm_rek', 100)->nullable()->index('nm_rek');
                $table->enum('tipe', ['N', 'M', 'R'])->nullable()->index('tipe');
                $table->enum('balance', ['D', 'K'])->nullable()->index('balance');
                $table->enum('level', ['0', '1'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekening');
    }
};
