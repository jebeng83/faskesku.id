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
        if (!Schema::hasTable('cssd_barang')) {
            Schema::create('cssd_barang', function (Blueprint $table) {
                $table->string('no_inventaris', 30)->primary();
                $table->enum('jenis_barang', ['Heacting Set', 'Partus Set', 'Set Bedah', 'Set Minor', 'Set SC', 'Set Kuret', 'Set Hernia', 'Set THT', 'Set APP', 'Set Histerektomi', 'Set Tonsil', 'Set Mata', 'Set Pheco', 'Set Bedah Mulut', 'Set Othopedi Minor', 'Set Bor Orthopedi', 'Set Vaskuler', 'Set Hemoroid', 'Set Duk', 'Set Instrumen Satuan', 'Selang', '-'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cssd_barang');
    }
};
