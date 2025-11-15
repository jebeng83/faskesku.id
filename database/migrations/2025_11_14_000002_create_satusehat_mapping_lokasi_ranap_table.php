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
        Schema::create('satu_sehat_mapping_lokasi_ranap', function (Blueprint $table) {
            $table->char('kd_bangsal', 5);
            $table->string('id_organisasi_satusehat', 64)->nullable();
            $table->string('id_lokasi_satusehat', 64)->nullable();
            $table->string('longitude', 30)->nullable();
            $table->string('latitude', 30)->nullable();
            $table->string('altittude', 30)->nullable();

            $table->primary('kd_bangsal');

            $table->foreign('kd_bangsal')
                ->references('kd_bangsal')
                ->on('bangsal')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('satu_sehat_mapping_lokasi_ranap');
    }
};