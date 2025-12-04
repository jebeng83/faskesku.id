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
        if (!Schema::hasTable('jamsostek')) {
            Schema::create('jamsostek', function (Blueprint $table) {
                $table->char('stts', 5)->primary();
                $table->double('biaya')->index('biaya');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jamsostek');
    }
};
