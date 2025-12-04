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
        if (Schema::hasTable('inacbg_coder_nik')) {
            Schema::table('inacbg_coder_nik', function (Blueprint $table) {
                $table->foreign(['nik'], 'inacbg_coder_nik_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inacbg_coder_nik')) {
            Schema::table('inacbg_coder_nik', function (Blueprint $table) {
                $table->dropForeign('inacbg_coder_nik_ibfk_1');
            });
        }
    }
};
