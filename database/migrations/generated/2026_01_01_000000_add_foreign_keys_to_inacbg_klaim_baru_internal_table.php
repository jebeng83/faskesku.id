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
        if (Schema::hasTable('inacbg_klaim_baru_internal')) {
            Schema::table('inacbg_klaim_baru_internal', function (Blueprint $table) {
                $table->foreign(['no_sep'], 'inacbg_klaim_baru_internal_ibfk_1')->references(['no_sep'])->on('bridging_sep_internal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inacbg_klaim_baru_internal')) {
            Schema::table('inacbg_klaim_baru_internal', function (Blueprint $table) {
                $table->dropForeign('inacbg_klaim_baru_internal_ibfk_1');
            });
        }
    }
};
