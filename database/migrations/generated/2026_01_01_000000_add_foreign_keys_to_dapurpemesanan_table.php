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
        if (Schema::hasTable('dapurpemesanan')) {
            Schema::table('dapurpemesanan', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'dapurpemesanan_ibfk_1')->references(['kode_suplier'])->on('dapursuplier')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'dapurpemesanan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dapurpemesanan')) {
            Schema::table('dapurpemesanan', function (Blueprint $table) {
                $table->dropForeign('dapurpemesanan_ibfk_1');
                $table->dropForeign('dapurpemesanan_ibfk_2');
            });
        }
    }
};
