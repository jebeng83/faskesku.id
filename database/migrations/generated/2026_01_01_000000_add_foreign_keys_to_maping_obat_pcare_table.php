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
        if (Schema::hasTable('maping_obat_pcare')) {
            Schema::table('maping_obat_pcare', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'maping_obat_pcare_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('maping_obat_pcare')) {
            Schema::table('maping_obat_pcare', function (Blueprint $table) {
                $table->dropForeign('maping_obat_pcare_ibfk_1');
            });
        }
    }
};
