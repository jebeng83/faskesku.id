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
        if (Schema::hasTable('surat_cuti_hamil')) {
            Schema::table('surat_cuti_hamil', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'surat_cuti_hamil_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_cuti_hamil')) {
            Schema::table('surat_cuti_hamil', function (Blueprint $table) {
                $table->dropForeign('surat_cuti_hamil_ibfk_1');
            });
        }
    }
};
