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
        if (!Schema::hasTable('satu_sehat_observation_lab_mb')) {
            Schema::create('satu_sehat_observation_lab_mb', function (Blueprint $table) {
                $table->string('noorder', 15);
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');
                $table->integer('id_template')->index('id_template');
                $table->string('id_observation', 40)->nullable();

                $table->primary(['noorder', 'kd_jenis_prw', 'id_template']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_observation_lab_mb');
    }
};
