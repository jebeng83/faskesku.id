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
        if (Schema::hasTable('data_triase_igdprimer')) {
            Schema::table('data_triase_igdprimer', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'data_triase_igdprimer_ibfk_1')->references(['no_rawat'])->on('data_triase_igd')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nik'], 'data_triase_igdprimer_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('data_triase_igdprimer')) {
            Schema::table('data_triase_igdprimer', function (Blueprint $table) {
                $table->dropForeign('data_triase_igdprimer_ibfk_1');
                $table->dropForeign('data_triase_igdprimer_ibfk_2');
            });
        }
    }
};
