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
        if (Schema::hasTable('surat_pulang_atas_permintaan_sendiri')) {
            Schema::table('surat_pulang_atas_permintaan_sendiri', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'surat_pulang_atas_permintaan_sendiri_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'surat_pulang_atas_permintaan_sendiri_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_pulang_atas_permintaan_sendiri')) {
            Schema::table('surat_pulang_atas_permintaan_sendiri', function (Blueprint $table) {
                $table->dropForeign('surat_pulang_atas_permintaan_sendiri_ibfk_1');
                $table->dropForeign('surat_pulang_atas_permintaan_sendiri_ibfk_2');
            });
        }
    }
};
