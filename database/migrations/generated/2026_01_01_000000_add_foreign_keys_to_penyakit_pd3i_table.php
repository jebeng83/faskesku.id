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
        if (Schema::hasTable('penyakit_pd3i')) {
            Schema::table('penyakit_pd3i', function (Blueprint $table) {
                $table->foreign(['kd_penyakit'], 'penyakit_pd3i_ibfk_1')->references(['kd_penyakit'])->on('penyakit')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('penyakit_pd3i')) {
            Schema::table('penyakit_pd3i', function (Blueprint $table) {
                $table->dropForeign('penyakit_pd3i_ibfk_1');
            });
        }
    }
};
