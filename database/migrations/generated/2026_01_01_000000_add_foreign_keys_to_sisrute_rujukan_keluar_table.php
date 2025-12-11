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
        if (Schema::hasTable('sisrute_rujukan_keluar')) {
            Schema::table('sisrute_rujukan_keluar', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'sisrute_rujukan_keluar_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('sisrute_rujukan_keluar')) {
            Schema::table('sisrute_rujukan_keluar', function (Blueprint $table) {
                $table->dropForeign('sisrute_rujukan_keluar_ibfk_1');
            });
        }
    }
};
