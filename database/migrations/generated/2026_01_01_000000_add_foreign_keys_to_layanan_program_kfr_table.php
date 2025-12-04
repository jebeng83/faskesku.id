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
        if (Schema::hasTable('layanan_program_kfr')) {
            Schema::table('layanan_program_kfr', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'layanan_program_kfr_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat_layanan'], 'layanan_program_kfr_ibfk_2')->references(['no_rawat'])->on('layanan_kedokteran_fisik_rehabilitasi')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'layanan_program_kfr_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('layanan_program_kfr')) {
            Schema::table('layanan_program_kfr', function (Blueprint $table) {
                $table->dropForeign('layanan_program_kfr_ibfk_1');
                $table->dropForeign('layanan_program_kfr_ibfk_2');
                $table->dropForeign('layanan_program_kfr_ibfk_3');
            });
        }
    }
};
