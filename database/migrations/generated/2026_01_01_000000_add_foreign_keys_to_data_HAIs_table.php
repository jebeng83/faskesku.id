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
        if (Schema::hasTable('data_HAIs')) {
            Schema::table('data_HAIs', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'data_HAIs_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_kamar'], 'data_HAIs_ibfk_2')->references(['kd_kamar'])->on('kamar')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('data_HAIs')) {
            Schema::table('data_HAIs', function (Blueprint $table) {
                $table->dropForeign('data_HAIs_ibfk_1');
                $table->dropForeign('data_HAIs_ibfk_2');
            });
        }
    }
};
