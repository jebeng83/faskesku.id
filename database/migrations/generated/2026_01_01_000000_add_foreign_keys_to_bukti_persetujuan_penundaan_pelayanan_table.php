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
        if (Schema::hasTable('bukti_persetujuan_penundaan_pelayanan')) {
            Schema::table('bukti_persetujuan_penundaan_pelayanan', function (Blueprint $table) {
                $table->foreign(['no_surat'], 'bukti_persetujuan_penundaan_pelayanan_ibfk_1')->references(['no_surat'])->on('persetujuan_penundaan_pelayanan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bukti_persetujuan_penundaan_pelayanan')) {
            Schema::table('bukti_persetujuan_penundaan_pelayanan', function (Blueprint $table) {
                $table->dropForeign('bukti_persetujuan_penundaan_pelayanan_ibfk_1');
            });
        }
    }
};
