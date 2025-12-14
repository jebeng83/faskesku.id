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
        if (! Schema::hasTable('permintaan_perbaikan_inventaris')) {
            Schema::create('permintaan_perbaikan_inventaris', function (Blueprint $table) {
                $table->string('no_permintaan', 15)->primary();
                $table->string('no_inventaris', 30)->nullable()->index('no_inventaris');
                $table->string('nik', 20)->nullable()->index('nik');
                $table->dateTime('tanggal')->nullable();
                $table->string('deskripsi_kerusakan', 300)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_perbaikan_inventaris');
    }
};
