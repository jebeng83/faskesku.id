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
        if (!Schema::hasTable('set_depo_ralan')) {
            Schema::create('set_depo_ralan', function (Blueprint $table) {
                $table->char('kd_poli', 5);
                $table->char('kd_bangsal', 5)->index('kd_bangsal');

                $table->primary(['kd_poli', 'kd_bangsal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_depo_ralan');
    }
};
