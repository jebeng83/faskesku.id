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
        if (Schema::hasTable('skp_kriteria_penilaian')) {
            Schema::table('skp_kriteria_penilaian', function (Blueprint $table) {
                $table->foreign(['kode_kategori'], 'skp_kriteria_penilaian_ibfk_1')->references(['kode_kategori'])->on('skp_kategori_penilaian')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('skp_kriteria_penilaian')) {
            Schema::table('skp_kriteria_penilaian', function (Blueprint $table) {
                $table->dropForeign('skp_kriteria_penilaian_ibfk_1');
            });
        }
    }
};
