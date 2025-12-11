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
        if (Schema::hasTable('inacbg_grouping_stage1')) {
            Schema::table('inacbg_grouping_stage1', function (Blueprint $table) {
                $table->foreign(['no_sep'], 'inacbg_grouping_stage1_ibfk_1')->references(['no_sep'])->on('bridging_sep')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inacbg_grouping_stage1')) {
            Schema::table('inacbg_grouping_stage1', function (Blueprint $table) {
                $table->dropForeign('inacbg_grouping_stage1_ibfk_1');
            });
        }
    }
};
