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
        if (Schema::hasTable('bukti_penyerahan_resep_obat')) {
            Schema::table('bukti_penyerahan_resep_obat', function (Blueprint $table) {
                $table->foreign(['no_resep'], 'bukti_penyerahan_resep_obat_ibfk_1')->references(['no_resep'])->on('resep_obat')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bukti_penyerahan_resep_obat')) {
            Schema::table('bukti_penyerahan_resep_obat', function (Blueprint $table) {
                $table->dropForeign('bukti_penyerahan_resep_obat_ibfk_1');
            });
        }
    }
};
