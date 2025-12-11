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
        if (Schema::hasTable('subrekening')) {
            Schema::table('subrekening', function (Blueprint $table) {
                $table->foreign(['kd_rek'], 'subrekening_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek2'], 'subrekening_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('subrekening')) {
            Schema::table('subrekening', function (Blueprint $table) {
                $table->dropForeign('subrekening_ibfk_1');
                $table->dropForeign('subrekening_ibfk_2');
            });
        }
    }
};
