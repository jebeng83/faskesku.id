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
        if (Schema::hasTable('petugas')) {
            Schema::table('petugas', function (Blueprint $table) {
                $table->foreign(['nip'], 'petugas_ibfk_4')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_jbtn'], 'petugas_ibfk_5')->references(['kd_jbtn'])->on('jabatan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('petugas')) {
            Schema::table('petugas', function (Blueprint $table) {
                $table->dropForeign('petugas_ibfk_4');
                $table->dropForeign('petugas_ibfk_5');
            });
        }
    }
};
