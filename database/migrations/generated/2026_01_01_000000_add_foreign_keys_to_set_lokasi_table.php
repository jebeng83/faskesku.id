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
        if (Schema::hasTable('set_lokasi')) {
            Schema::table('set_lokasi', function (Blueprint $table) {
                $table->foreign(['kd_bangsal'], 'set_lokasi_ibfk_1')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_lokasi')) {
            Schema::table('set_lokasi', function (Blueprint $table) {
                $table->dropForeign('set_lokasi_ibfk_1');
            });
        }
    }
};
