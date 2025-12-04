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
        if (Schema::hasTable('dpjp_ranap')) {
            Schema::table('dpjp_ranap', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'dpjp_ranap_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_dokter'], 'dpjp_ranap_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dpjp_ranap')) {
            Schema::table('dpjp_ranap', function (Blueprint $table) {
                $table->dropForeign('dpjp_ranap_ibfk_1');
                $table->dropForeign('dpjp_ranap_ibfk_2');
            });
        }
    }
};
