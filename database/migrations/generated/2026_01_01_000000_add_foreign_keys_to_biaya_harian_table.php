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
        if (Schema::hasTable('biaya_harian')) {
            Schema::table('biaya_harian', function (Blueprint $table) {
                $table->foreign(['kd_kamar'], 'biaya_harian_ibfk_1')->references(['kd_kamar'])->on('kamar')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('biaya_harian')) {
            Schema::table('biaya_harian', function (Blueprint $table) {
                $table->dropForeign('biaya_harian_ibfk_1');
            });
        }
    }
};
