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
        if (Schema::hasTable('returpasien')) {
            Schema::table('returpasien', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'returpasien_ibfk_3')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_brng'], 'returpasien_ibfk_4')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('returpasien')) {
            Schema::table('returpasien', function (Blueprint $table) {
                $table->dropForeign('returpasien_ibfk_3');
                $table->dropForeign('returpasien_ibfk_4');
            });
        }
    }
};
