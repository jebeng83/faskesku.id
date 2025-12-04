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
        if (Schema::hasTable('surat_penolakan_anjuran_medis_pembuat_pernyataan')) {
            Schema::table('surat_penolakan_anjuran_medis_pembuat_pernyataan', function (Blueprint $table) {
                $table->foreign(['no_surat'], 'surat_penolakan_anjuran_medis_pembuat_pernyataan_ibfk_1')->references(['no_surat'])->on('surat_penolakan_anjuran_medis')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_penolakan_anjuran_medis_pembuat_pernyataan')) {
            Schema::table('surat_penolakan_anjuran_medis_pembuat_pernyataan', function (Blueprint $table) {
                $table->dropForeign('surat_penolakan_anjuran_medis_pembuat_pernyataan_ibfk_1');
            });
        }
    }
};
