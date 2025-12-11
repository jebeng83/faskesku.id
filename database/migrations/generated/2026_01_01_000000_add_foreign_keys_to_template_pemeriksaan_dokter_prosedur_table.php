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
        if (Schema::hasTable('template_pemeriksaan_dokter_prosedur')) {
            Schema::table('template_pemeriksaan_dokter_prosedur', function (Blueprint $table) {
                $table->foreign(['no_template'], 'template_pemeriksaan_dokter_prosedur_ibfk_1')->references(['no_template'])->on('template_pemeriksaan_dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode'], 'template_pemeriksaan_dokter_prosedur_ibfk_2')->references(['kode'])->on('icd9')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('template_pemeriksaan_dokter_prosedur')) {
            Schema::table('template_pemeriksaan_dokter_prosedur', function (Blueprint $table) {
                $table->dropForeign('template_pemeriksaan_dokter_prosedur_ibfk_1');
                $table->dropForeign('template_pemeriksaan_dokter_prosedur_ibfk_2');
            });
        }
    }
};
