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
        if (Schema::hasTable('bridging_resep_apotek_bpjs_racikan')) {
            Schema::table('bridging_resep_apotek_bpjs_racikan', function (Blueprint $table) {
                $table->foreign(['no_sep_apotek'], 'bridging_resep_apotek_bpjs_racikan_ibfk_1')->references(['no_sep_apotek'])->on('bridging_resep_apotek_bpjs')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'bridging_resep_apotek_bpjs_racikan_ibfk_2')->references(['kode_brng'])->on('maping_obat_apotek_bpjs')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bridging_resep_apotek_bpjs_racikan')) {
            Schema::table('bridging_resep_apotek_bpjs_racikan', function (Blueprint $table) {
                $table->dropForeign('bridging_resep_apotek_bpjs_racikan_ibfk_1');
                $table->dropForeign('bridging_resep_apotek_bpjs_racikan_ibfk_2');
            });
        }
    }
};
