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
        if (Schema::hasTable('surat_persetujuan_rawat_inap_pembuat_pernyataan')) {
            Schema::table('surat_persetujuan_rawat_inap_pembuat_pernyataan', function (Blueprint $table) {
                $table->foreign(['no_surat'], 'surat_persetujuan_rawat_inap_pembuat_pernyataan_ibfk_1')->references(['no_surat'])->on('surat_persetujuan_rawat_inap')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_persetujuan_rawat_inap_pembuat_pernyataan')) {
            Schema::table('surat_persetujuan_rawat_inap_pembuat_pernyataan', function (Blueprint $table) {
                $table->dropForeign('surat_persetujuan_rawat_inap_pembuat_pernyataan_ibfk_1');
            });
        }
    }
};
