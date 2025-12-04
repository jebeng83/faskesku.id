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
        if (!Schema::hasTable('stts_kerja')) {
            Schema::create('stts_kerja', function (Blueprint $table) {
                $table->char('stts', 3)->primary();
                $table->string('ktg', 20);
                $table->tinyInteger('indek');
                $table->tinyInteger('hakcuti');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stts_kerja');
    }
};
