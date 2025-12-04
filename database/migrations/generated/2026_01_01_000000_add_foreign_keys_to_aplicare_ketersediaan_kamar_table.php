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
        if (Schema::hasTable('aplicare_ketersediaan_kamar')) {
            Schema::table('aplicare_ketersediaan_kamar', function (Blueprint $table) {
                $table->foreign(['kd_bangsal'], 'aplicare_ketersediaan_kamar_ibfk_1')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('aplicare_ketersediaan_kamar')) {
            Schema::table('aplicare_ketersediaan_kamar', function (Blueprint $table) {
                $table->dropForeign('aplicare_ketersediaan_kamar_ibfk_1');
            });
        }
    }
};
