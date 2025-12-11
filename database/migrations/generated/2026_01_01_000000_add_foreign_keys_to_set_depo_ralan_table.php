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
        if (Schema::hasTable('set_depo_ralan')) {
            Schema::table('set_depo_ralan', function (Blueprint $table) {
                $table->foreign(['kd_poli'], 'set_depo_ralan_ibfk_1')->references(['kd_poli'])->on('poliklinik')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsal'], 'set_depo_ralan_ibfk_2')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_depo_ralan')) {
            Schema::table('set_depo_ralan', function (Blueprint $table) {
                $table->dropForeign('set_depo_ralan_ibfk_1');
                $table->dropForeign('set_depo_ralan_ibfk_2');
            });
        }
    }
};
