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
        if (Schema::hasTable('utd_donor')) {
            Schema::table('utd_donor', function (Blueprint $table) {
                $table->foreign(['petugas_aftap'], 'utd_donor_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['petugas_u_saring'], 'utd_donor_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_pendonor'], 'utd_donor_ibfk_3')->references(['no_pendonor'])->on('utd_pendonor')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_donor')) {
            Schema::table('utd_donor', function (Blueprint $table) {
                $table->dropForeign('utd_donor_ibfk_1');
                $table->dropForeign('utd_donor_ibfk_2');
                $table->dropForeign('utd_donor_ibfk_3');
            });
        }
    }
};
