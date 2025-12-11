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
        if (Schema::hasTable('master_triase_skala4')) {
            Schema::table('master_triase_skala4', function (Blueprint $table) {
                $table->foreign(['kode_pemeriksaan'], 'master_triase_skala1_ibfk_4')->references(['kode_pemeriksaan'])->on('master_triase_pemeriksaan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('master_triase_skala4')) {
            Schema::table('master_triase_skala4', function (Blueprint $table) {
                $table->dropForeign('master_triase_skala1_ibfk_4');
            });
        }
    }
};
