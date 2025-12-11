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
        if (Schema::hasTable('pemesanan')) {
            Schema::table('pemesanan', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'pemesanan_ibfk_1')->references(['kode_suplier'])->on('datasuplier')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'pemesanan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsal'], 'pemesanan_ibfk_3')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pemesanan')) {
            Schema::table('pemesanan', function (Blueprint $table) {
                $table->dropForeign('pemesanan_ibfk_1');
                $table->dropForeign('pemesanan_ibfk_2');
                $table->dropForeign('pemesanan_ibfk_3');
            });
        }
    }
};
