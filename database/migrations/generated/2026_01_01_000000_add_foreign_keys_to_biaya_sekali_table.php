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
        if (Schema::hasTable('biaya_sekali')) {
            Schema::table('biaya_sekali', function (Blueprint $table) {
                $table->foreign(['kd_kamar'], 'biaya_sekali_ibfk_1')->references(['kd_kamar'])->on('kamar')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('biaya_sekali')) {
            Schema::table('biaya_sekali', function (Blueprint $table) {
                $table->dropForeign('biaya_sekali_ibfk_1');
            });
        }
    }
};
