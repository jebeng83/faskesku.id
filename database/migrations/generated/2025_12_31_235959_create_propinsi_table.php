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
        if (!Schema::hasTable('propinsi')) {
            Schema::create('propinsi', function (Blueprint $table) {
                $table->integer('kd_prop', true);
                $table->string('nm_prop', 30)->unique('nm_prop');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('propinsi');
    }
};
