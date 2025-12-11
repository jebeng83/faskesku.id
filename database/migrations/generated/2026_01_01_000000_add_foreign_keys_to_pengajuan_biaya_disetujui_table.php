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
        if (Schema::hasTable('pengajuan_biaya_disetujui')) {
            Schema::table('pengajuan_biaya_disetujui', function (Blueprint $table) {
                $table->foreign(['no_pengajuan'], 'pengajuan_biaya_disetujui_ibfk_1')->references(['no_pengajuan'])->on('pengajuan_biaya')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pengajuan_biaya_disetujui')) {
            Schema::table('pengajuan_biaya_disetujui', function (Blueprint $table) {
                $table->dropForeign('pengajuan_biaya_disetujui_ibfk_1');
            });
        }
    }
};
