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
        if (Schema::hasTable('pelayanan_informasi_obat')) {
            Schema::table('pelayanan_informasi_obat', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'pelayanan_informasi_obat_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pelayanan_informasi_obat')) {
            Schema::table('pelayanan_informasi_obat', function (Blueprint $table) {
                $table->dropForeign('pelayanan_informasi_obat_ibfk_1');
            });
        }
    }
};
