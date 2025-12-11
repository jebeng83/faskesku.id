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
        if (Schema::hasTable('surat_bebas_tbc')) {
            Schema::table('surat_bebas_tbc', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'surat_bebas_tbc_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'surat_bebas_tbc_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_bebas_tbc')) {
            Schema::table('surat_bebas_tbc', function (Blueprint $table) {
                $table->dropForeign('surat_bebas_tbc_ibfk_1');
                $table->dropForeign('surat_bebas_tbc_ibfk_2');
            });
        }
    }
};
