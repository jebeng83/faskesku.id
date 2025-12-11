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
        if (Schema::hasTable('booking_periksa_balasan')) {
            Schema::table('booking_periksa_balasan', function (Blueprint $table) {
                $table->foreign(['no_booking'], 'booking_periksa_balasan_ibfk_1')->references(['no_booking'])->on('booking_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('booking_periksa_balasan')) {
            Schema::table('booking_periksa_balasan', function (Blueprint $table) {
                $table->dropForeign('booking_periksa_balasan_ibfk_1');
            });
        }
    }
};
