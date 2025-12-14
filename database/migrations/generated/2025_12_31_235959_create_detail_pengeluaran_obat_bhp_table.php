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
        if (! Schema::hasTable('detail_pengeluaran_obat_bhp')) {
            Schema::create('detail_pengeluaran_obat_bhp', function (Blueprint $table) {
                $table->string('no_keluar', 15)->index('no_keluar');
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->char('kode_sat', 4)->index('kode_sat');
                $table->string('no_batch', 20)->nullable();
                $table->double('jumlah')->index('jumlah');
                $table->double('harga_beli')->index('harga_beli');
                $table->double('total')->index('total');
                $table->string('no_faktur', 20);

                $table->primary(['no_keluar', 'kode_brng']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_pengeluaran_obat_bhp');
    }
};
