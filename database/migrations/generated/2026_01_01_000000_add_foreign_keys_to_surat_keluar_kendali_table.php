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
        if (Schema::hasTable('surat_keluar_kendali')) {
            Schema::table('surat_keluar_kendali', function (Blueprint $table) {
                $table->foreign(['kd_indeks'], 'surat_keluar_kendali_ibfk_1')->references(['kd'])->on('surat_indeks')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_urut'], 'surat_keluar_kendali_ibfk_2')->references(['no_urut'])->on('surat_keluar')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_keluar_kendali')) {
            Schema::table('surat_keluar_kendali', function (Blueprint $table) {
                $table->dropForeign('surat_keluar_kendali_ibfk_1');
                $table->dropForeign('surat_keluar_kendali_ibfk_2');
            });
        }
    }
};
