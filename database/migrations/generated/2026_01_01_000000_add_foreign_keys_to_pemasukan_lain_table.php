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
        if (Schema::hasTable('pemasukan_lain')) {
            Schema::table('pemasukan_lain', function (Blueprint $table) {
                $table->foreign(['nip'], 'pemasukan_lain_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_kategori'], 'pemasukan_lain_ibfk_2')->references(['kode_kategori'])->on('kategori_pemasukan_lain')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pemasukan_lain')) {
            Schema::table('pemasukan_lain', function (Blueprint $table) {
                $table->dropForeign('pemasukan_lain_ibfk_1');
                $table->dropForeign('pemasukan_lain_ibfk_2');
            });
        }
    }
};
