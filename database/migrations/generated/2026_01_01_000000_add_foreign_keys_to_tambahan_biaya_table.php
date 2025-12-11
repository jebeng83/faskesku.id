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
        if (Schema::hasTable('tambahan_biaya')) {
            Schema::table('tambahan_biaya', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'tambahan_biaya_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tambahan_biaya')) {
            Schema::table('tambahan_biaya', function (Blueprint $table) {
                $table->dropForeign('tambahan_biaya_ibfk_1');
            });
        }
    }
};
