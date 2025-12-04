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
        if (Schema::hasTable('konver_sat')) {
            Schema::table('konver_sat', function (Blueprint $table) {
                $table->foreign(['kode_sat'], 'konver_sat_ibfk_1')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('konver_sat')) {
            Schema::table('konver_sat', function (Blueprint $table) {
                $table->dropForeign('konver_sat_ibfk_1');
            });
        }
    }
};
