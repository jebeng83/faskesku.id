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
        if (Schema::hasTable('pembelian')) {
            Schema::table('pembelian', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'pembelian_ibfk_1')->references(['kode_suplier'])->on('datasuplier')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'pembelian_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_bangsal'], 'pembelian_ibfk_3')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'pembelian_ibfk_4')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pembelian')) {
            Schema::table('pembelian', function (Blueprint $table) {
                $table->dropForeign('pembelian_ibfk_1');
                $table->dropForeign('pembelian_ibfk_2');
                $table->dropForeign('pembelian_ibfk_3');
                $table->dropForeign('pembelian_ibfk_4');
            });
        }
    }
};
