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
        if (Schema::hasTable('master_rencana_keperawatan_mata')) {
            Schema::table('master_rencana_keperawatan_mata', function (Blueprint $table) {
                $table->foreign(['kode_masalah'], 'master_rencana_keperawatan_mata_ibfk_1')->references(['kode_masalah'])->on('master_masalah_keperawatan_mata')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('master_rencana_keperawatan_mata')) {
            Schema::table('master_rencana_keperawatan_mata', function (Blueprint $table) {
                $table->dropForeign('master_rencana_keperawatan_mata_ibfk_1');
            });
        }
    }
};
