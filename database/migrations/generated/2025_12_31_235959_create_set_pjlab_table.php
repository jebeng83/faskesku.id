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
        if (!Schema::hasTable('set_pjlab')) {
            Schema::create('set_pjlab', function (Blueprint $table) {
                $table->string('kd_dokterlab', 20)->index('kd_dokterlab');
                $table->string('kd_dokterrad', 20)->index('kd_dokterrad');
                $table->string('kd_dokterhemodialisa', 20)->index('kd_dokterhemodialisa');
                $table->string('kd_dokterutd', 20)->nullable()->index('kd_dokterutd');
                $table->string('kd_dokterlabpa', 20)->index('kd_dokterlabpa');
                $table->string('kd_dokterlabmb', 20)->index('kd_dokterlabmb');

                $table->primary(['kd_dokterlab', 'kd_dokterrad', 'kd_dokterhemodialisa']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_pjlab');
    }
};
