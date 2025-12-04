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
        if (!Schema::hasTable('inacbg_coder_nik')) {
            Schema::create('inacbg_coder_nik', function (Blueprint $table) {
                $table->string('nik', 20)->primary();
                $table->string('no_ik', 30)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inacbg_coder_nik');
    }
};
