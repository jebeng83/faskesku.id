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
        if (Schema::hasTable('jns_perawatan_inap')) {
            Schema::table('jns_perawatan_inap', function (Blueprint $table) {
                $table->foreign(['kd_kategori'], 'jns_perawatan_inap_ibfk_7')->references(['kd_kategori'])->on('kategori_perawatan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_pj'], 'jns_perawatan_inap_ibfk_8')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_bangsal'], 'jns_perawatan_inap_ibfk_9')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('jns_perawatan_inap')) {
            Schema::table('jns_perawatan_inap', function (Blueprint $table) {
                $table->dropForeign('jns_perawatan_inap_ibfk_7');
                $table->dropForeign('jns_perawatan_inap_ibfk_8');
                $table->dropForeign('jns_perawatan_inap_ibfk_9');
            });
        }
    }
};
