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
        if (Schema::hasTable('paket_operasi')) {
            Schema::table('paket_operasi', function (Blueprint $table) {
                $table->foreign(['kd_pj'], 'paket_operasi_ibfk_1')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('paket_operasi')) {
            Schema::table('paket_operasi', function (Blueprint $table) {
                $table->dropForeign('paket_operasi_ibfk_1');
            });
        }
    }
};
