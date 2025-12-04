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
        if (!Schema::hasTable('detail_piutang_jasa_perusahaan')) {
            Schema::create('detail_piutang_jasa_perusahaan', function (Blueprint $table) {
                $table->string('no_piutang', 20);
                $table->string('kode_kategori', 5)->index('kode_kategori');
                $table->double('jml')->nullable();
                $table->double('harga')->nullable();
                $table->double('subtotal')->nullable();
                $table->double('diskon')->nullable();
                $table->double('besar_diskon')->nullable();
                $table->double('total')->nullable();

                $table->primary(['no_piutang', 'kode_kategori']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_piutang_jasa_perusahaan');
    }
};
