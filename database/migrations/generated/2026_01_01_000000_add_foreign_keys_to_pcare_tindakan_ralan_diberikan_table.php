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
        if (Schema::hasTable('pcare_tindakan_ralan_diberikan')) {
            Schema::table('pcare_tindakan_ralan_diberikan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'pcare_tindakan_ralan_diberikan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_jenis_prw'], 'pcare_tindakan_ralan_diberikan_ibfk_2')->references(['kd_jenis_prw'])->on('maping_tindakan_pcare')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pcare_tindakan_ralan_diberikan')) {
            Schema::table('pcare_tindakan_ralan_diberikan', function (Blueprint $table) {
                $table->dropForeign('pcare_tindakan_ralan_diberikan_ibfk_1');
                $table->dropForeign('pcare_tindakan_ralan_diberikan_ibfk_2');
            });
        }
    }
};
