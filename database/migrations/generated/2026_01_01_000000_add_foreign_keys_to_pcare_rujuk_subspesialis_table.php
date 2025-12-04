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
        if (Schema::hasTable('pcare_rujuk_subspesialis')) {
            Schema::table('pcare_rujuk_subspesialis', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'pcare_rujuk_subspesialis_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pcare_rujuk_subspesialis')) {
            Schema::table('pcare_rujuk_subspesialis', function (Blueprint $table) {
                $table->dropForeign('pcare_rujuk_subspesialis_ibfk_1');
            });
        }
    }
};
