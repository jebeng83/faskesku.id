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
        if (Schema::hasTable('tokopemesanan')) {
            Schema::table('tokopemesanan', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'tokopemesanan_ibfk_1')->references(['kode_suplier'])->on('tokosuplier')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'tokopemesanan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tokopemesanan')) {
            Schema::table('tokopemesanan', function (Blueprint $table) {
                $table->dropForeign('tokopemesanan_ibfk_1');
                $table->dropForeign('tokopemesanan_ibfk_2');
            });
        }
    }
};
