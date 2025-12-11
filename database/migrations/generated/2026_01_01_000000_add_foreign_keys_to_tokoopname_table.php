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
        if (Schema::hasTable('tokoopname')) {
            Schema::table('tokoopname', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'tokoopname_ibfk_1')->references(['kode_brng'])->on('tokobarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tokoopname')) {
            Schema::table('tokoopname', function (Blueprint $table) {
                $table->dropForeign('tokoopname_ibfk_1');
            });
        }
    }
};
