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
        if (Schema::hasTable('balasan_pengaduan')) {
            Schema::table('balasan_pengaduan', function (Blueprint $table) {
                $table->foreign(['id_pengaduan'], 'balasan_pengaduan_ibfk_1')->references(['id'])->on('pengaduan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('balasan_pengaduan')) {
            Schema::table('balasan_pengaduan', function (Blueprint $table) {
                $table->dropForeign('balasan_pengaduan_ibfk_1');
            });
        }
    }
};
