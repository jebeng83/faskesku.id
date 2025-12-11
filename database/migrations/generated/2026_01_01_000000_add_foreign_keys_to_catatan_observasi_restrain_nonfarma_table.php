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
        if (Schema::hasTable('catatan_observasi_restrain_nonfarma')) {
            Schema::table('catatan_observasi_restrain_nonfarma', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'catatan_observasi_restrain_nonfarma_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'catatan_observasi_restrain_nonfarma_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('catatan_observasi_restrain_nonfarma')) {
            Schema::table('catatan_observasi_restrain_nonfarma', function (Blueprint $table) {
                $table->dropForeign('catatan_observasi_restrain_nonfarma_ibfk_1');
                $table->dropForeign('catatan_observasi_restrain_nonfarma_ibfk_2');
            });
        }
    }
};
