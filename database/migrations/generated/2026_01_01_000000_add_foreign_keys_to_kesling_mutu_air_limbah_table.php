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
        if (Schema::hasTable('kesling_mutu_air_limbah')) {
            Schema::table('kesling_mutu_air_limbah', function (Blueprint $table) {
                $table->foreign(['nip'], 'kesling_mutu_air_limbah_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('kesling_mutu_air_limbah')) {
            Schema::table('kesling_mutu_air_limbah', function (Blueprint $table) {
                $table->dropForeign('kesling_mutu_air_limbah_ibfk_1');
            });
        }
    }
};
