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
        if (Schema::hasTable('penyakit')) {
            Schema::table('penyakit', function (Blueprint $table) {
                $table->foreign(['kd_ktg'], 'penyakit_ibfk_1')->references(['kd_ktg'])->on('kategori_penyakit')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('penyakit')) {
            Schema::table('penyakit', function (Blueprint $table) {
                $table->dropForeign('penyakit_ibfk_1');
            });
        }
    }
};
