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
        if (!Schema::hasTable('data_triase_igddetail_skala1')) {
            Schema::create('data_triase_igddetail_skala1', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->string('kode_skala1', 3)->index('data_triase_igddetail_skala1_ibfk_1');

                $table->primary(['no_rawat', 'kode_skala1']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_triase_igddetail_skala1');
    }
};
