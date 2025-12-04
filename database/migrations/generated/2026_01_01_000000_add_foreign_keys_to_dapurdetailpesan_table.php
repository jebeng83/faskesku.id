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
        if (Schema::hasTable('dapurdetailpesan')) {
            Schema::table('dapurdetailpesan', function (Blueprint $table) {
                $table->foreign(['no_faktur'], 'dapurdetailpesan_ibfk_1')->references(['no_faktur'])->on('dapurpemesanan')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'dapurdetailpesan_ibfk_2')->references(['kode_brng'])->on('dapurbarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'dapurdetailpesan_ibfk_3')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dapurdetailpesan')) {
            Schema::table('dapurdetailpesan', function (Blueprint $table) {
                $table->dropForeign('dapurdetailpesan_ibfk_1');
                $table->dropForeign('dapurdetailpesan_ibfk_2');
                $table->dropForeign('dapurdetailpesan_ibfk_3');
            });
        }
    }
};
