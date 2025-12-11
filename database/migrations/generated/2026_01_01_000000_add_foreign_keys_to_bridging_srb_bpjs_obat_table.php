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
        if (Schema::hasTable('bridging_srb_bpjs_obat')) {
            Schema::table('bridging_srb_bpjs_obat', function (Blueprint $table) {
                $table->foreign(['no_sep'], 'bridging_srb_bpjs_obat_ibfk_1')->references(['no_sep'])->on('bridging_sep')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bridging_srb_bpjs_obat')) {
            Schema::table('bridging_srb_bpjs_obat', function (Blueprint $table) {
                $table->dropForeign('bridging_srb_bpjs_obat_ibfk_1');
            });
        }
    }
};
