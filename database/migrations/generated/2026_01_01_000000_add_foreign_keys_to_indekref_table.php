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
        if (Schema::hasTable('indekref')) {
            Schema::table('indekref', function (Blueprint $table) {
                $table->foreign(['kdindex'], 'indekref_ibfk_1')->references(['dep_id'])->on('departemen')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('indekref')) {
            Schema::table('indekref', function (Blueprint $table) {
                $table->dropForeign('indekref_ibfk_1');
            });
        }
    }
};
