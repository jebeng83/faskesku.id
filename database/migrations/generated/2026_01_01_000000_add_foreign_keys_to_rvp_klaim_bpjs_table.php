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
        if (Schema::hasTable('rvp_klaim_bpjs')) {
            Schema::table('rvp_klaim_bpjs', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'rvp_klaim_bpjs_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'rvp_klaim_bpjs_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'rvp_klaim_bpjs_ibfk_3')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek_kontra'], 'rvp_klaim_bpjs_ibfk_4')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('rvp_klaim_bpjs')) {
            Schema::table('rvp_klaim_bpjs', function (Blueprint $table) {
                $table->dropForeign('rvp_klaim_bpjs_ibfk_1');
                $table->dropForeign('rvp_klaim_bpjs_ibfk_2');
                $table->dropForeign('rvp_klaim_bpjs_ibfk_3');
                $table->dropForeign('rvp_klaim_bpjs_ibfk_4');
            });
        }
    }
};
