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
        if (Schema::hasTable('utd_penggunaan_medis_donor')) {
            Schema::table('utd_penggunaan_medis_donor', function (Blueprint $table) {
                $table->foreign(['no_donor'], 'utd_penggunaan_medis_donor_ibfk_1')->references(['no_donor'])->on('utd_donor')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'utd_penggunaan_medis_donor_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_penggunaan_medis_donor')) {
            Schema::table('utd_penggunaan_medis_donor', function (Blueprint $table) {
                $table->dropForeign('utd_penggunaan_medis_donor_ibfk_1');
                $table->dropForeign('utd_penggunaan_medis_donor_ibfk_2');
            });
        }
    }
};
