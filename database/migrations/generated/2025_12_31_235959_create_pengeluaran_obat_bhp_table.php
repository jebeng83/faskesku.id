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
        if (!Schema::hasTable('pengeluaran_obat_bhp')) {
            Schema::create('pengeluaran_obat_bhp', function (Blueprint $table) {
                $table->string('no_keluar', 15)->primary();
                $table->date('tanggal')->index('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->string('keterangan', 200)->index('keterangan');
                $table->char('kd_bangsal', 5)->nullable()->index('kd_bangsal');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengeluaran_obat_bhp');
    }
};
