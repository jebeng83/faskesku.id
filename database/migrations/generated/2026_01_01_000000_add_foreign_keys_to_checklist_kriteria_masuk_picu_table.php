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
        if (Schema::hasTable('checklist_kriteria_masuk_picu')) {
            Schema::table('checklist_kriteria_masuk_picu', function (Blueprint $table) {
                $table->foreign(['nik'], 'checklist_kriteria_masuk_picu_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'checklist_kriteria_masuk_picu_ibfk_2')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('checklist_kriteria_masuk_picu')) {
            Schema::table('checklist_kriteria_masuk_picu', function (Blueprint $table) {
                $table->dropForeign('checklist_kriteria_masuk_picu_ibfk_1');
                $table->dropForeign('checklist_kriteria_masuk_picu_ibfk_2');
            });
        }
    }
};
