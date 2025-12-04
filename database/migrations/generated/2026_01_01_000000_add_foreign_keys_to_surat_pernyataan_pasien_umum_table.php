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
        if (Schema::hasTable('surat_pernyataan_pasien_umum')) {
            Schema::table('surat_pernyataan_pasien_umum', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'surat_pernyataan_pasien_umum_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'surat_pernyataan_pasien_umum_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_pernyataan_pasien_umum')) {
            Schema::table('surat_pernyataan_pasien_umum', function (Blueprint $table) {
                $table->dropForeign('surat_pernyataan_pasien_umum_ibfk_1');
                $table->dropForeign('surat_pernyataan_pasien_umum_ibfk_2');
            });
        }
    }
};
