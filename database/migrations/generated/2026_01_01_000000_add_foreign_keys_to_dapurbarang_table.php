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
        if (Schema::hasTable('dapurbarang')) {
            Schema::table('dapurbarang', function (Blueprint $table) {
                $table->foreign(['kode_sat'], 'dapurbarang_ibfk_1')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dapurbarang')) {
            Schema::table('dapurbarang', function (Blueprint $table) {
                $table->dropForeign('dapurbarang_ibfk_1');
            });
        }
    }
};
