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
        if (!Schema::hasTable('audit_kamar_jenazah')) {
            Schema::create('audit_kamar_jenazah', function (Blueprint $table) {
                $table->dateTime('tanggal')->primary();
                $table->enum('audit1', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit2', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit3', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit4', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit5', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit6', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit7', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit8', ['Ya', 'Tidak'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_kamar_jenazah');
    }
};
