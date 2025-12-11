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
        if (Schema::hasTable('tampreturjual')) {
            Schema::table('tampreturjual', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'tampreturjual_ibfk_3')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tampreturjual')) {
            Schema::table('tampreturjual', function (Blueprint $table) {
                $table->dropForeign('tampreturjual_ibfk_3');
            });
        }
    }
};
