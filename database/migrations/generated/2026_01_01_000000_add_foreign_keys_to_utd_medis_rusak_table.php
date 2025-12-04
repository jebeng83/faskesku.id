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
        if (Schema::hasTable('utd_medis_rusak')) {
            Schema::table('utd_medis_rusak', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'utd_medis_rusak_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'utd_medis_rusak_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('utd_medis_rusak')) {
            Schema::table('utd_medis_rusak', function (Blueprint $table) {
                $table->dropForeign('utd_medis_rusak_ibfk_1');
                $table->dropForeign('utd_medis_rusak_ibfk_2');
            });
        }
    }
};
