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
        if (Schema::hasTable('surat_persetujuan_rawat_inap')) {
            Schema::table('surat_persetujuan_rawat_inap', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'surat_persetujuan_rawat_inap_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'surat_persetujuan_rawat_inap_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_persetujuan_rawat_inap')) {
            Schema::table('surat_persetujuan_rawat_inap', function (Blueprint $table) {
                $table->dropForeign('surat_persetujuan_rawat_inap_ibfk_1');
                $table->dropForeign('surat_persetujuan_rawat_inap_ibfk_2');
            });
        }
    }
};
