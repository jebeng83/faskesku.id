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
        if (Schema::hasTable('bridging_dukcapil')) {
            Schema::table('bridging_dukcapil', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'bridging_dukcapil_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bridging_dukcapil')) {
            Schema::table('bridging_dukcapil', function (Blueprint $table) {
                $table->dropForeign('bridging_dukcapil_ibfk_1');
            });
        }
    }
};
