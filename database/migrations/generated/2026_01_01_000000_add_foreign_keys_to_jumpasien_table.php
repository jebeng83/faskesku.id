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
        if (Schema::hasTable('jumpasien')) {
            Schema::table('jumpasien', function (Blueprint $table) {
                $table->foreign(['id'], 'jumpasien_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('jumpasien')) {
            Schema::table('jumpasien', function (Blueprint $table) {
                $table->dropForeign('jumpasien_ibfk_1');
            });
        }
    }
};
