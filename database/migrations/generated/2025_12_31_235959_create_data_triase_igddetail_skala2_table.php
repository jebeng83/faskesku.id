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
        if (!Schema::hasTable('data_triase_igddetail_skala2')) {
            Schema::create('data_triase_igddetail_skala2', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->string('kode_skala2', 3)->index('kode_skala2');

                $table->primary(['no_rawat', 'kode_skala2']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_triase_igddetail_skala2');
    }
};
