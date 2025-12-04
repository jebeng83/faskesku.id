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
        if (Schema::hasTable('pengeluaran_obat_bhp')) {
            Schema::table('pengeluaran_obat_bhp', function (Blueprint $table) {
                $table->foreign(['nip'], 'pengeluaran_obat_bhp_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_bangsal'], 'pengeluaran_obat_bhp_ibfk_2')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pengeluaran_obat_bhp')) {
            Schema::table('pengeluaran_obat_bhp', function (Blueprint $table) {
                $table->dropForeign('pengeluaran_obat_bhp_ibfk_1');
                $table->dropForeign('pengeluaran_obat_bhp_ibfk_2');
            });
        }
    }
};
