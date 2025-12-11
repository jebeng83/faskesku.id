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
        if (Schema::hasTable('dapur_detail_returbeli')) {
            Schema::table('dapur_detail_returbeli', function (Blueprint $table) {
                $table->foreign(['kode_sat'], 'dapur_detail_returbeli_ibfk_1')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_brng'], 'dapur_detail_returbeli_ibfk_2')->references(['kode_brng'])->on('dapurbarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_retur_beli'], 'dapur_detail_returbeli_ibfk_3')->references(['no_retur_beli'])->on('dapurreturbeli')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dapur_detail_returbeli')) {
            Schema::table('dapur_detail_returbeli', function (Blueprint $table) {
                $table->dropForeign('dapur_detail_returbeli_ibfk_1');
                $table->dropForeign('dapur_detail_returbeli_ibfk_2');
                $table->dropForeign('dapur_detail_returbeli_ibfk_3');
            });
        }
    }
};
