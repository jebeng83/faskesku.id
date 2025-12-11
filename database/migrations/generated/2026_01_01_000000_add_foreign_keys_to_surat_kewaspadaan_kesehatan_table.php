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
        if (Schema::hasTable('surat_kewaspadaan_kesehatan')) {
            Schema::table('surat_kewaspadaan_kesehatan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'surat_kewaspadaan_kesehatan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_kewaspadaan_kesehatan')) {
            Schema::table('surat_kewaspadaan_kesehatan', function (Blueprint $table) {
                $table->dropForeign('surat_kewaspadaan_kesehatan_ibfk_1');
            });
        }
    }
};
