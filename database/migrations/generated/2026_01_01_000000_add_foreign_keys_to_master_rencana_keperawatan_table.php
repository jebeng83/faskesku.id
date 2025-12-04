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
        if (Schema::hasTable('master_rencana_keperawatan')) {
            Schema::table('master_rencana_keperawatan', function (Blueprint $table) {
                $table->foreign(['kode_masalah'], 'master_rencana_keperawatan_ibfk_1')->references(['kode_masalah'])->on('master_masalah_keperawatan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('master_rencana_keperawatan')) {
            Schema::table('master_rencana_keperawatan', function (Blueprint $table) {
                $table->dropForeign('master_rencana_keperawatan_ibfk_1');
            });
        }
    }
};
