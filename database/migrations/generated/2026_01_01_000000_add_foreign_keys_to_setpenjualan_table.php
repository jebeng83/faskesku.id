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
        if (Schema::hasTable('setpenjualan')) {
            Schema::table('setpenjualan', function (Blueprint $table) {
                $table->foreign(['kdjns'], 'setpenjualan_ibfk_1')->references(['kdjns'])->on('jenis')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('setpenjualan')) {
            Schema::table('setpenjualan', function (Blueprint $table) {
                $table->dropForeign('setpenjualan_ibfk_1');
            });
        }
    }
};
