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
        if (! Schema::hasTable('data_triase_igddetail_skala5')) {
            Schema::create('data_triase_igddetail_skala5', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->string('kode_skala5', 3)->index('kode_skala5');

                $table->primary(['no_rawat', 'kode_skala5']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_triase_igddetail_skala5');
    }
};
