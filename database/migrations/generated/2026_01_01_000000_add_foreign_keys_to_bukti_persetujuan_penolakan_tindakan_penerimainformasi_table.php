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
        if (Schema::hasTable('bukti_persetujuan_penolakan_tindakan_penerimainformasi')) {
            Schema::table('bukti_persetujuan_penolakan_tindakan_penerimainformasi', function (Blueprint $table) {
                $table->foreign(['no_pernyataan'], 'bukti_persetujuan_penolakan_tindakan_penerimainformasi_ibfk_1')->references(['no_pernyataan'])->on('persetujuan_penolakan_tindakan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bukti_persetujuan_penolakan_tindakan_penerimainformasi')) {
            Schema::table('bukti_persetujuan_penolakan_tindakan_penerimainformasi', function (Blueprint $table) {
                $table->dropForeign('bukti_persetujuan_penolakan_tindakan_penerimainformasi_ibfk_1');
            });
        }
    }
};
