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
        if (Schema::hasTable('checklist_pre_operasi')) {
            Schema::table('checklist_pre_operasi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'checklist_pre_operasi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip_petugas_ruangan'], 'checklist_pre_operasi_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip_perawat_ok'], 'checklist_pre_operasi_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter_anestesi'], 'checklist_pre_operasi_ibfk_4')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter_bedah'], 'checklist_pre_operasi_ibfk_5')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('checklist_pre_operasi')) {
            Schema::table('checklist_pre_operasi', function (Blueprint $table) {
                $table->dropForeign('checklist_pre_operasi_ibfk_1');
                $table->dropForeign('checklist_pre_operasi_ibfk_2');
                $table->dropForeign('checklist_pre_operasi_ibfk_3');
                $table->dropForeign('checklist_pre_operasi_ibfk_4');
                $table->dropForeign('checklist_pre_operasi_ibfk_5');
            });
        }
    }
};
