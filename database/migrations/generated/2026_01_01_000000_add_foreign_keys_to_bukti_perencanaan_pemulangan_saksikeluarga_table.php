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
        if (Schema::hasTable('bukti_perencanaan_pemulangan_saksikeluarga')) {
            Schema::table('bukti_perencanaan_pemulangan_saksikeluarga', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'bukti_perencanaan_pemulangan_saksikeluarga_ibfk_1')->references(['no_rawat'])->on('perencanaan_pemulangan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bukti_perencanaan_pemulangan_saksikeluarga')) {
            Schema::table('bukti_perencanaan_pemulangan_saksikeluarga', function (Blueprint $table) {
                $table->dropForeign('bukti_perencanaan_pemulangan_saksikeluarga_ibfk_1');
            });
        }
    }
};
