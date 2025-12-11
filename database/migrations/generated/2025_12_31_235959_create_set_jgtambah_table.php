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
        if (!Schema::hasTable('set_jgtambah')) {
            Schema::create('set_jgtambah', function (Blueprint $table) {
                $table->double('tnj');
                $table->string('pendidikan', 80)->primary();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_jgtambah');
    }
};
