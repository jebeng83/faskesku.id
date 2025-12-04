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
        if (Schema::hasTable('surat_buta_warna')) {
            Schema::table('surat_buta_warna', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'surat_buta_warna_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_buta_warna')) {
            Schema::table('surat_buta_warna', function (Blueprint $table) {
                $table->dropForeign('surat_buta_warna_ibfk_1');
            });
        }
    }
};
