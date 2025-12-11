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
        if (Schema::hasTable('surat_sub_klasifikasi')) {
            Schema::table('surat_sub_klasifikasi', function (Blueprint $table) {
                $table->foreign(['kd_klasifikasi'], 'surat_sub_klasifikasi_ibfk_1')->references(['kd'])->on('surat_klasifikasi')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_sub_klasifikasi')) {
            Schema::table('surat_sub_klasifikasi', function (Blueprint $table) {
                $table->dropForeign('surat_sub_klasifikasi_ibfk_1');
            });
        }
    }
};
