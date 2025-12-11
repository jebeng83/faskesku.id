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
        if (!Schema::hasTable('suku_bangsa')) {
            Schema::create('suku_bangsa', function (Blueprint $table) {
                $table->integer('id', true);
                $table->string('nama_suku_bangsa', 30)->nullable()->unique('nama_suku_bangsa');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suku_bangsa');
    }
};
