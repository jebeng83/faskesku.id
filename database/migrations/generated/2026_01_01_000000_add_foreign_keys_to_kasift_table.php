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
        if (Schema::hasTable('kasift')) {
            Schema::table('kasift', function (Blueprint $table) {
                $table->foreign(['id'], 'kasift_ibfk_1')->references(['id'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('kasift')) {
            Schema::table('kasift', function (Blueprint $table) {
                $table->dropForeign('kasift_ibfk_1');
            });
        }
    }
};
