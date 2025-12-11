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
        if (Schema::hasTable('siranap_ketersediaan_kamar')) {
            Schema::table('siranap_ketersediaan_kamar', function (Blueprint $table) {
                $table->foreign(['kd_bangsal'], 'siranap_ketersediaan_kamar_ibfk_1')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('siranap_ketersediaan_kamar')) {
            Schema::table('siranap_ketersediaan_kamar', function (Blueprint $table) {
                $table->dropForeign('siranap_ketersediaan_kamar_ibfk_1');
            });
        }
    }
};
