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
        if (Schema::hasTable('master_triase_skala5')) {
            Schema::table('master_triase_skala5', function (Blueprint $table) {
                $table->foreign(['kode_pemeriksaan'], 'master_triase_skala1_ibfk_5')->references(['kode_pemeriksaan'])->on('master_triase_pemeriksaan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('master_triase_skala5')) {
            Schema::table('master_triase_skala5', function (Blueprint $table) {
                $table->dropForeign('master_triase_skala1_ibfk_5');
            });
        }
    }
};
