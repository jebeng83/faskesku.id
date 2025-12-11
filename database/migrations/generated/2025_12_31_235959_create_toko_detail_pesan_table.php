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
        if (!Schema::hasTable('toko_detail_pesan')) {
            Schema::create('toko_detail_pesan', function (Blueprint $table) {
                $table->string('no_faktur', 20)->index('no_faktur');
                $table->string('kode_brng', 40)->nullable()->index('kode_brng');
                $table->char('kode_sat', 4)->index('kode_sat');
                $table->double('jumlah');
                $table->double('harga');
                $table->double('subtotal');
                $table->double('dis');
                $table->double('besardis');
                $table->double('total');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toko_detail_pesan');
    }
};
