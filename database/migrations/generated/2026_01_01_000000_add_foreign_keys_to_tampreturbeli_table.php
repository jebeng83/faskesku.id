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
        if (Schema::hasTable('tampreturbeli')) {
            Schema::table('tampreturbeli', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'tampreturbeli_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tampreturbeli')) {
            Schema::table('tampreturbeli', function (Blueprint $table) {
                $table->dropForeign('tampreturbeli_ibfk_2');
            });
        }
    }
};
