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
        if (Schema::hasTable('bpjs_prb')) {
            Schema::table('bpjs_prb', function (Blueprint $table) {
                $table->foreign(['no_sep'], 'bpjs_prb_ibfk_1')->references(['no_sep'])->on('bridging_sep')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bpjs_prb')) {
            Schema::table('bpjs_prb', function (Blueprint $table) {
                $table->dropForeign('bpjs_prb_ibfk_1');
            });
        }
    }
};
