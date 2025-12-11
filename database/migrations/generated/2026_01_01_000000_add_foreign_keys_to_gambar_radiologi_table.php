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
        if (Schema::hasTable('gambar_radiologi')) {
            Schema::table('gambar_radiologi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'gambar_radiologi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('gambar_radiologi')) {
            Schema::table('gambar_radiologi', function (Blueprint $table) {
                $table->dropForeign('gambar_radiologi_ibfk_1');
            });
        }
    }
};
