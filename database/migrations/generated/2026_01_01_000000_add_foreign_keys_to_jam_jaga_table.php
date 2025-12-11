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
        if (Schema::hasTable('jam_jaga')) {
            Schema::table('jam_jaga', function (Blueprint $table) {
                $table->foreign(['dep_id'], 'jam_jaga_ibfk_1')->references(['dep_id'])->on('departemen')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('jam_jaga')) {
            Schema::table('jam_jaga', function (Blueprint $table) {
                $table->dropForeign('jam_jaga_ibfk_1');
            });
        }
    }
};
