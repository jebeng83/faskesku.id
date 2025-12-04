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
        if (Schema::hasTable('set_jgtambah')) {
            Schema::table('set_jgtambah', function (Blueprint $table) {
                $table->foreign(['pendidikan'], 'set_jgtambah_ibfk_1')->references(['tingkat'])->on('pendidikan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_jgtambah')) {
            Schema::table('set_jgtambah', function (Blueprint $table) {
                $table->dropForeign('set_jgtambah_ibfk_1');
            });
        }
    }
};
