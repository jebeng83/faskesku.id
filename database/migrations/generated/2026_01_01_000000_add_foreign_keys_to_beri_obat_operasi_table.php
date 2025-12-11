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
        if (Schema::hasTable('beri_obat_operasi')) {
            Schema::table('beri_obat_operasi', function (Blueprint $table) {
                $table->foreign(['kd_obat'], 'beri_obat_operasi_ibfk_2')->references(['kd_obat'])->on('obatbhp_ok')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'beri_obat_operasi_ibfk_3')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('beri_obat_operasi')) {
            Schema::table('beri_obat_operasi', function (Blueprint $table) {
                $table->dropForeign('beri_obat_operasi_ibfk_2');
                $table->dropForeign('beri_obat_operasi_ibfk_3');
            });
        }
    }
};
