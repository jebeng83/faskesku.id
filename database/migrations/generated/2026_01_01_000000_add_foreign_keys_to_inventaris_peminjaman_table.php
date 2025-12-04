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
        if (Schema::hasTable('inventaris_peminjaman')) {
            Schema::table('inventaris_peminjaman', function (Blueprint $table) {
                $table->foreign(['no_inventaris'], 'inventaris_peminjaman_ibfk_1')->references(['no_inventaris'])->on('inventaris')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'inventaris_peminjaman_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inventaris_peminjaman')) {
            Schema::table('inventaris_peminjaman', function (Blueprint $table) {
                $table->dropForeign('inventaris_peminjaman_ibfk_1');
                $table->dropForeign('inventaris_peminjaman_ibfk_2');
            });
        }
    }
};
