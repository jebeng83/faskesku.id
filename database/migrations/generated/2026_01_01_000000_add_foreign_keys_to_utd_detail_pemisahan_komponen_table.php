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
        if (Schema::hasTable('utd_detail_pemisahan_komponen')) {
            Schema::table('utd_detail_pemisahan_komponen', function (Blueprint $table) {
                $table->foreign(['no_donor'], 'utd_detail_pemisahan_komponen_ibfk_1')->references(['no_donor'])->on('utd_pemisahan_komponen')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_detail_pemisahan_komponen')) {
            Schema::table('utd_detail_pemisahan_komponen', function (Blueprint $table) {
                $table->dropForeign('utd_detail_pemisahan_komponen_ibfk_1');
            });
        }
    }
};
