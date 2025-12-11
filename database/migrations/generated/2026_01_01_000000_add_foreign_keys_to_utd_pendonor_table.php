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
        if (Schema::hasTable('utd_pendonor')) {
            Schema::table('utd_pendonor', function (Blueprint $table) {
                $table->foreign(['kd_kel'], 'utd_pendonor_ibfk_1')->references(['kd_kel'])->on('kelurahan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_kec'], 'utd_pendonor_ibfk_2')->references(['kd_kec'])->on('kecamatan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_kab'], 'utd_pendonor_ibfk_3')->references(['kd_kab'])->on('kabupaten')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_prop'], 'utd_pendonor_ibfk_4')->references(['kd_prop'])->on('propinsi')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_pendonor')) {
            Schema::table('utd_pendonor', function (Blueprint $table) {
                $table->dropForeign('utd_pendonor_ibfk_1');
                $table->dropForeign('utd_pendonor_ibfk_2');
                $table->dropForeign('utd_pendonor_ibfk_3');
                $table->dropForeign('utd_pendonor_ibfk_4');
            });
        }
    }
};
