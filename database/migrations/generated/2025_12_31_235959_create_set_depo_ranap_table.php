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
        if (!Schema::hasTable('set_depo_ranap')) {
            Schema::create('set_depo_ranap', function (Blueprint $table) {
                $table->char('kd_bangsal', 5);
                $table->char('kd_depo', 5)->index('kd_depo');

                $table->primary(['kd_bangsal', 'kd_depo']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_depo_ranap');
    }
};
