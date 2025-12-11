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
        if (Schema::hasTable('satu_sehat_mapping_lokasi_ruangrad')) {
            Schema::table('satu_sehat_mapping_lokasi_ruangrad', function (Blueprint $table) {
                $table->foreign(['id_organisasi_satusehat'], 'satu_sehat_mapping_lokasi_ruangrad_ibfk_1')->references(['id_organisasi_satusehat'])->on('satu_sehat_mapping_departemen')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('satu_sehat_mapping_lokasi_ruangrad')) {
            Schema::table('satu_sehat_mapping_lokasi_ruangrad', function (Blueprint $table) {
                $table->dropForeign('satu_sehat_mapping_lokasi_ruangrad_ibfk_1');
            });
        }
    }
};
