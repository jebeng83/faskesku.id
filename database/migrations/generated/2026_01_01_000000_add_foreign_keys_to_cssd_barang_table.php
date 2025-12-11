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
        if (Schema::hasTable('cssd_barang')) {
            Schema::table('cssd_barang', function (Blueprint $table) {
                $table->foreign(['no_inventaris'], 'cssd_barang_ibfk_1')->references(['no_inventaris'])->on('inventaris')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('cssd_barang')) {
            Schema::table('cssd_barang', function (Blueprint $table) {
                $table->dropForeign('cssd_barang_ibfk_1');
            });
        }
    }
};
