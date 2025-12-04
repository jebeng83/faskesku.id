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
        if (Schema::hasTable('perbaikan_inventaris')) {
            Schema::table('perbaikan_inventaris', function (Blueprint $table) {
                $table->foreign(['no_permintaan'], 'perbaikan_inventaris_ibfk_1')->references(['no_permintaan'])->on('permintaan_perbaikan_inventaris')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'perbaikan_inventaris_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('perbaikan_inventaris')) {
            Schema::table('perbaikan_inventaris', function (Blueprint $table) {
                $table->dropForeign('perbaikan_inventaris_ibfk_1');
                $table->dropForeign('perbaikan_inventaris_ibfk_2');
            });
        }
    }
};
