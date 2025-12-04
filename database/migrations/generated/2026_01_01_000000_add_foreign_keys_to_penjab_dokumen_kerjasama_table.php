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
        if (Schema::hasTable('penjab_dokumen_kerjasama')) {
            Schema::table('penjab_dokumen_kerjasama', function (Blueprint $table) {
                $table->foreign(['kd_pj'], 'penjab_dokumen_kerjasama_ibfk_1')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('penjab_dokumen_kerjasama')) {
            Schema::table('penjab_dokumen_kerjasama', function (Blueprint $table) {
                $table->dropForeign('penjab_dokumen_kerjasama_ibfk_1');
            });
        }
    }
};
