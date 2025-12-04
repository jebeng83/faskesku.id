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
        if (Schema::hasTable('satu_sehat_mapping_lokasi_ralan')) {
            Schema::table('satu_sehat_mapping_lokasi_ralan', function (Blueprint $table) {
                $table->foreign(['kd_poli'], 'satu_sehat_mapping_lokasi_ralan_ibfk_1')->references(['kd_poli'])->on('poliklinik')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['id_organisasi_satusehat'], 'satu_sehat_mapping_lokasi_ralan_ibfk_2')->references(['id_organisasi_satusehat'])->on('satu_sehat_mapping_departemen')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('satu_sehat_mapping_lokasi_ralan')) {
            Schema::table('satu_sehat_mapping_lokasi_ralan', function (Blueprint $table) {
                $table->dropForeign('satu_sehat_mapping_lokasi_ralan_ibfk_1');
                $table->dropForeign('satu_sehat_mapping_lokasi_ralan_ibfk_2');
            });
        }
    }
};
