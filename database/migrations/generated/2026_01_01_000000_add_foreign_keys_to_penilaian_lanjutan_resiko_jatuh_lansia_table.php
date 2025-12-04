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
        if (Schema::hasTable('penilaian_lanjutan_resiko_jatuh_lansia')) {
            Schema::table('penilaian_lanjutan_resiko_jatuh_lansia', function (Blueprint $table) {
                $table->foreign(['nip'], 'penilaian_lanjutan_resiko_jatuh_lansia_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('penilaian_lanjutan_resiko_jatuh_lansia')) {
            Schema::table('penilaian_lanjutan_resiko_jatuh_lansia', function (Blueprint $table) {
                $table->dropForeign('penilaian_lanjutan_resiko_jatuh_lansia_ibfk_1');
            });
        }
    }
};
