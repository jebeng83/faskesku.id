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
        if (Schema::hasTable('ipsrs_detail_hibah')) {
            Schema::table('ipsrs_detail_hibah', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'ipsrs_detail_hibah_ibfk_1')->references(['kode_brng'])->on('ipsrsbarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_hibah'], 'ipsrs_detail_hibah_ibfk_2')->references(['no_hibah'])->on('ipsrs_hibah')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'ipsrs_detail_hibah_ibfk_3')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ipsrs_detail_hibah')) {
            Schema::table('ipsrs_detail_hibah', function (Blueprint $table) {
                $table->dropForeign('ipsrs_detail_hibah_ibfk_1');
                $table->dropForeign('ipsrs_detail_hibah_ibfk_2');
                $table->dropForeign('ipsrs_detail_hibah_ibfk_3');
            });
        }
    }
};
