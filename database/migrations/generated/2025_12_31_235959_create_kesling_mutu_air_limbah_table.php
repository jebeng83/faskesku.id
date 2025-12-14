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
        if (! Schema::hasTable('kesling_mutu_air_limbah')) {
            Schema::create('kesling_mutu_air_limbah', function (Blueprint $table) {
                $table->string('nip', 20);
                $table->dateTime('tanggal');
                $table->double('meteran')->nullable();
                $table->double('jumlahharian')->nullable();
                $table->double('ph')->nullable();
                $table->double('suhu')->nullable();
                $table->double('tds');
                $table->double('ec');
                $table->double('salt');

                $table->primary(['nip', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kesling_mutu_air_limbah');
    }
};
