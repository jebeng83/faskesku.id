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
        if (Schema::hasTable('inventaris_sterilisasi_cssd')) {
            Schema::table('inventaris_sterilisasi_cssd', function (Blueprint $table) {
                $table->foreign(['nip'], 'inventaris_sterilisasi_cssd_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_sirkulasi'], 'inventaris_sterilisasi_cssd_ibfk_2')->references(['no_sirkulasi'])->on('inventaris_ambil_cssd')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inventaris_sterilisasi_cssd')) {
            Schema::table('inventaris_sterilisasi_cssd', function (Blueprint $table) {
                $table->dropForeign('inventaris_sterilisasi_cssd_ibfk_1');
                $table->dropForeign('inventaris_sterilisasi_cssd_ibfk_2');
            });
        }
    }
};
