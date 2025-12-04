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
        if (Schema::hasTable('set_pjlab')) {
            Schema::table('set_pjlab', function (Blueprint $table) {
                $table->foreign(['kd_dokterlab'], 'set_pjlab_ibfk_1')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokterrad'], 'set_pjlab_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokterhemodialisa'], 'set_pjlab_ibfk_3')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokterutd'], 'set_pjlab_ibfk_4')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokterlabpa'], 'set_pjlab_ibfk_5')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokterlabmb'], 'set_pjlab_ibfk_6')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_pjlab')) {
            Schema::table('set_pjlab', function (Blueprint $table) {
                $table->dropForeign('set_pjlab_ibfk_1');
                $table->dropForeign('set_pjlab_ibfk_2');
                $table->dropForeign('set_pjlab_ibfk_3');
                $table->dropForeign('set_pjlab_ibfk_4');
                $table->dropForeign('set_pjlab_ibfk_5');
                $table->dropForeign('set_pjlab_ibfk_6');
            });
        }
    }
};
