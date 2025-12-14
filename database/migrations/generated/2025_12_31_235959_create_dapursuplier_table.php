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
        if (! Schema::hasTable('dapursuplier')) {
            Schema::create('dapursuplier', function (Blueprint $table) {
                $table->char('kode_suplier', 5)->primary();
                $table->string('nama_suplier', 50)->nullable()->index('nama_suplier');
                $table->string('alamat', 50)->nullable()->index('alamat');
                $table->string('kota', 20)->nullable()->index('kota');
                $table->string('no_telp', 13)->nullable()->index('no_telp');
                $table->string('nama_bank', 30)->nullable();
                $table->string('rekening', 20)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dapursuplier');
    }
};
