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
        if (Schema::hasTable('inventaris_bukti_pemesanan')) {
            Schema::table('inventaris_bukti_pemesanan', function (Blueprint $table) {
                $table->foreign(['no_faktur'], 'inventaris_bukti_pemesanan_ibfk_1')->references(['no_faktur'])->on('inventaris_pemesanan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inventaris_bukti_pemesanan')) {
            Schema::table('inventaris_bukti_pemesanan', function (Blueprint $table) {
                $table->dropForeign('inventaris_bukti_pemesanan_ibfk_1');
            });
        }
    }
};
