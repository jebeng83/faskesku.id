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
        if (Schema::hasTable('bridging_surat_pri_bpjs')) {
            Schema::table('bridging_surat_pri_bpjs', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'bridging_surat_pri_bpjs_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bridging_surat_pri_bpjs')) {
            Schema::table('bridging_surat_pri_bpjs', function (Blueprint $table) {
                $table->dropForeign('bridging_surat_pri_bpjs_ibfk_1');
            });
        }
    }
};
