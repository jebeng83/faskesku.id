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
        if (Schema::hasTable('indextotal')) {
            Schema::table('indextotal', function (Blueprint $table) {
                $table->foreign(['kdindex'], 'indextotal_ibfk_1')->references(['dep_id'])->on('departemen')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('indextotal')) {
            Schema::table('indextotal', function (Blueprint $table) {
                $table->dropForeign('indextotal_ibfk_1');
            });
        }
    }
};
