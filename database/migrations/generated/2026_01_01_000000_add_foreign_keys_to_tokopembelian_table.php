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
        if (Schema::hasTable('tokopembelian')) {
            Schema::table('tokopembelian', function (Blueprint $table) {
                $table->foreign(['nip'], 'tokopembelian_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_rek'], 'tokopembelian_ibfk_2')->references(['kd_rek'])->on('akun_bayar')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_suplier'], 'tokopembelian_ibfk_3')->references(['kode_suplier'])->on('tokosuplier')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tokopembelian')) {
            Schema::table('tokopembelian', function (Blueprint $table) {
                $table->dropForeign('tokopembelian_ibfk_1');
                $table->dropForeign('tokopembelian_ibfk_2');
                $table->dropForeign('tokopembelian_ibfk_3');
            });
        }
    }
};
