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
        if (Schema::hasTable('jns_perawatan_utd')) {
            Schema::table('jns_perawatan_utd', function (Blueprint $table) {
                $table->foreign(['kd_pj'], 'jns_perawatan_utd_ibfk_1')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('jns_perawatan_utd')) {
            Schema::table('jns_perawatan_utd', function (Blueprint $table) {
                $table->dropForeign('jns_perawatan_utd_ibfk_1');
            });
        }
    }
};
