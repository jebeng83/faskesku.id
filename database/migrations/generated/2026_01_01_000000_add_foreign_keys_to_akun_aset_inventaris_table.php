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
        if (Schema::hasTable('akun_aset_inventaris')) {
            Schema::table('akun_aset_inventaris', function (Blueprint $table) {
                $table->foreign(['kd_rek'], 'akun_aset_inventaris_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['id_jenis'], 'akun_aset_inventaris_ibfk_2')->references(['id_jenis'])->on('inventaris_jenis')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('akun_aset_inventaris')) {
            Schema::table('akun_aset_inventaris', function (Blueprint $table) {
                $table->dropForeign('akun_aset_inventaris_ibfk_1');
                $table->dropForeign('akun_aset_inventaris_ibfk_2');
            });
        }
    }
};
