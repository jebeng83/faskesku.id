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
        if (Schema::hasTable('dapurpembelian')) {
            Schema::table('dapurpembelian', function (Blueprint $table) {
                $table->foreign(['nip'], 'dapurpembelian_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'dapurpembelian_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_suplier'], 'dapurpembelian_ibfk_3')->references(['kode_suplier'])->on('dapursuplier')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dapurpembelian')) {
            Schema::table('dapurpembelian', function (Blueprint $table) {
                $table->dropForeign('dapurpembelian_ibfk_1');
                $table->dropForeign('dapurpembelian_ibfk_2');
                $table->dropForeign('dapurpembelian_ibfk_3');
            });
        }
    }
};
