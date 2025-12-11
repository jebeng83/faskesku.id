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
        if (Schema::hasTable('tambahjaga')) {
            Schema::table('tambahjaga', function (Blueprint $table) {
                $table->foreign(['id'], 'tambahjaga_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tambahjaga')) {
            Schema::table('tambahjaga', function (Blueprint $table) {
                $table->dropForeign('tambahjaga_ibfk_1');
            });
        }
    }
};
