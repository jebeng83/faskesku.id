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
        if (! Schema::hasTable('ipsrsbarang')) {
            Schema::create('ipsrsbarang', function (Blueprint $table) {
                $table->string('kode_brng', 15)->primary();
                $table->string('nama_brng', 80)->index('nama_brng');
                $table->char('kode_sat', 4)->index('kode_sat');
                $table->char('jenis', 5)->nullable()->index('jenis');
                $table->double('stok')->index('stok');
                $table->double('harga')->index('harga');
                $table->enum('status', ['0', '1']);

                $table->index(['jenis'], 'jenis_2');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ipsrsbarang');
    }
};
