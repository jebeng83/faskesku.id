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
        if (Schema::hasTable('checklist_kesiapan_anestesi')) {
            Schema::table('checklist_kesiapan_anestesi', function (Blueprint $table) {
                $table->foreign(['nip'], 'checklist_kesiapan_anestesi_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'checklist_kesiapan_anestesi_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'checklist_kesiapan_anestesi_ibfk_3')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('checklist_kesiapan_anestesi')) {
            Schema::table('checklist_kesiapan_anestesi', function (Blueprint $table) {
                $table->dropForeign('checklist_kesiapan_anestesi_ibfk_1');
                $table->dropForeign('checklist_kesiapan_anestesi_ibfk_2');
                $table->dropForeign('checklist_kesiapan_anestesi_ibfk_3');
            });
        }
    }
};
