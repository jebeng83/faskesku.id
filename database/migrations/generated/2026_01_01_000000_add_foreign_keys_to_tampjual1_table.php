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
        if (Schema::hasTable('tampjual1')) {
            Schema::table('tampjual1', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'tampjual1_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tampjual1')) {
            Schema::table('tampjual1', function (Blueprint $table) {
                $table->dropForeign('tampjual1_ibfk_1');
            });
        }
    }
};
