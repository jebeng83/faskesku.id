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
        if (!Schema::hasTable('pendidikan')) {
            Schema::create('pendidikan', function (Blueprint $table) {
                $table->string('tingkat', 80)->primary();
                $table->tinyInteger('indek');
                $table->double('gapok1');
                $table->double('kenaikan');
                $table->integer('maksimal');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendidikan');
    }
};
