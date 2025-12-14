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
        if (! Schema::hasTable('inventaris_detail_hibah')) {
            Schema::create('inventaris_detail_hibah', function (Blueprint $table) {
                $table->string('no_hibah', 20)->index('no_hibah');
                $table->string('kode_barang', 20)->default('')->index('kode_barang');
                $table->double('jumlah')->nullable();
                $table->double('h_hibah')->nullable();
                $table->double('subtotalhibah')->nullable();

                $table->primary(['no_hibah', 'kode_barang']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_detail_hibah');
    }
};
