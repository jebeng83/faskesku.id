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
        if (Schema::hasTable('pemeliharaan_inventaris')) {
            Schema::table('pemeliharaan_inventaris', function (Blueprint $table) {
                $table->foreign(['no_inventaris'], 'pemeliharaan_inventaris_ibfk_1')->references(['no_inventaris'])->on('inventaris')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'pemeliharaan_inventaris_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pemeliharaan_inventaris')) {
            Schema::table('pemeliharaan_inventaris', function (Blueprint $table) {
                $table->dropForeign('pemeliharaan_inventaris_ibfk_1');
                $table->dropForeign('pemeliharaan_inventaris_ibfk_2');
            });
        }
    }
};
