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
        if (Schema::hasTable('resep_dokter_racikan')) {
            Schema::table('resep_dokter_racikan', function (Blueprint $table) {
                $table->foreign(['no_resep'], 'resep_dokter_racikan_ibfk_1')->references(['no_resep'])->on('resep_obat')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_racik'], 'resep_dokter_racikan_ibfk_2')->references(['kd_racik'])->on('metode_racik')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('resep_dokter_racikan')) {
            Schema::table('resep_dokter_racikan', function (Blueprint $table) {
                $table->dropForeign('resep_dokter_racikan_ibfk_1');
                $table->dropForeign('resep_dokter_racikan_ibfk_2');
            });
        }
    }
};
