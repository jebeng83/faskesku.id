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
        if (Schema::hasTable('set_otomatis_tindakan_ralan_petugas')) {
            Schema::table('set_otomatis_tindakan_ralan_petugas', function (Blueprint $table) {
                $table->foreign(['kd_jenis_prw'], 'set_otomatis_tindakan_ralan_petugas_ibfk_1')->references(['kd_jenis_prw'])->on('jns_perawatan')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_pj'], 'set_otomatis_tindakan_ralan_petugas_ibfk_2')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_otomatis_tindakan_ralan_petugas')) {
            Schema::table('set_otomatis_tindakan_ralan_petugas', function (Blueprint $table) {
                $table->dropForeign('set_otomatis_tindakan_ralan_petugas_ibfk_1');
                $table->dropForeign('set_otomatis_tindakan_ralan_petugas_ibfk_2');
            });
        }
    }
};
