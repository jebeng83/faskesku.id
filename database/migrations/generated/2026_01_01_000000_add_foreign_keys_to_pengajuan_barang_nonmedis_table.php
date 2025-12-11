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
        if (Schema::hasTable('pengajuan_barang_nonmedis')) {
            Schema::table('pengajuan_barang_nonmedis', function (Blueprint $table) {
                $table->foreign(['nip'], 'pengajuan_barang_nonmedis_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pengajuan_barang_nonmedis')) {
            Schema::table('pengajuan_barang_nonmedis', function (Blueprint $table) {
                $table->dropForeign('pengajuan_barang_nonmedis_ibfk_1');
            });
        }
    }
};
