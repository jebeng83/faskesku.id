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
        if (Schema::hasTable('bukti_surat_pernyataan_memilih_dpjp')) {
            Schema::table('bukti_surat_pernyataan_memilih_dpjp', function (Blueprint $table) {
                $table->foreign(['no_pernyataan'], 'bukti_surat_pernyataan_memilih_dpjp_ibfk_1')->references(['no_pernyataan'])->on('surat_pernyataan_memilih_dpjp')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bukti_surat_pernyataan_memilih_dpjp')) {
            Schema::table('bukti_surat_pernyataan_memilih_dpjp', function (Blueprint $table) {
                $table->dropForeign('bukti_surat_pernyataan_memilih_dpjp_ibfk_1');
            });
        }
    }
};
