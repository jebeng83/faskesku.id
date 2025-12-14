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
        if (! Schema::hasTable('biaya_harian')) {
            Schema::create('biaya_harian', function (Blueprint $table) {
                $table->string('kd_kamar', 15);
                $table->string('nama_biaya', 50);
                $table->double('besar_biaya')->index('besar_biaya');
                $table->integer('jml')->index('jml');

                $table->primary(['kd_kamar', 'nama_biaya']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biaya_harian');
    }
};
