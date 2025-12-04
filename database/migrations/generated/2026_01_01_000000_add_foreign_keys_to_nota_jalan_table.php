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
        if (Schema::hasTable('nota_jalan')) {
            Schema::table('nota_jalan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'nota_jalan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('nota_jalan')) {
            Schema::table('nota_jalan', function (Blueprint $table) {
                $table->dropForeign('nota_jalan_ibfk_1');
            });
        }
    }
};
