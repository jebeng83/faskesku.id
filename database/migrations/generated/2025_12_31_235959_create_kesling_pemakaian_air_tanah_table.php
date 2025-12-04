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
        if (!Schema::hasTable('kesling_pemakaian_air_tanah')) {
            Schema::create('kesling_pemakaian_air_tanah', function (Blueprint $table) {
                $table->string('nip', 20);
                $table->dateTime('tanggal');
                $table->double('meteran')->nullable();
                $table->double('jumlahharian')->nullable();
                $table->string('keterangan', 50)->nullable();

                $table->primary(['nip', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kesling_pemakaian_air_tanah');
    }
};
