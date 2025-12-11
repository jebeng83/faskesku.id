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
        if (!Schema::hasTable('kasift')) {
            Schema::create('kasift', function (Blueprint $table) {
                $table->integer('id')->primary();
                $table->bigInteger('jmlks')->index('jmlks');
                $table->double('bsr')->index('bsr');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kasift');
    }
};
