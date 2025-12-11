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
        if (Schema::hasTable('prosedur_pasien')) {
            Schema::table('prosedur_pasien', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'prosedur_pasien_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode'], 'prosedur_pasien_ibfk_2')->references(['kode'])->on('icd9')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('prosedur_pasien')) {
            Schema::table('prosedur_pasien', function (Blueprint $table) {
                $table->dropForeign('prosedur_pasien_ibfk_1');
                $table->dropForeign('prosedur_pasien_ibfk_2');
            });
        }
    }
};
