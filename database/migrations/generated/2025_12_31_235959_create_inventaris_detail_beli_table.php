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
        if (! Schema::hasTable('inventaris_detail_beli')) {
            Schema::create('inventaris_detail_beli', function (Blueprint $table) {
                $table->string('no_faktur', 15);
                $table->string('kode_barang', 20)->index('kode_barang');
                $table->double('jumlah');
                $table->double('harga');
                $table->double('subtotal');
                $table->double('dis');
                $table->double('besardis');
                $table->double('total');

                $table->primary(['no_faktur', 'kode_barang']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_detail_beli');
    }
};
