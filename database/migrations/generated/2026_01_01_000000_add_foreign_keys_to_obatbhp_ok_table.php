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
        if (Schema::hasTable('obatbhp_ok')) {
            Schema::table('obatbhp_ok', function (Blueprint $table) {
                $table->foreign(['kode_sat'], 'obatbhp_ok_ibfk_1')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('obatbhp_ok')) {
            Schema::table('obatbhp_ok', function (Blueprint $table) {
                $table->dropForeign('obatbhp_ok_ibfk_1');
            });
        }
    }
};
