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
        if (!Schema::hasTable('pnm_tnj_harian')) {
            Schema::create('pnm_tnj_harian', function (Blueprint $table) {
                $table->integer('id');
                $table->integer('id_tnj')->index('id_tnj');

                $table->primary(['id', 'id_tnj']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pnm_tnj_harian');
    }
};
