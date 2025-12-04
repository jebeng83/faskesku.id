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
        if (!Schema::hasTable('audit_fasilitas_kebersihan_tangan')) {
            Schema::create('audit_fasilitas_kebersihan_tangan', function (Blueprint $table) {
                $table->dateTime('tanggal');
                $table->string('id_ruang', 5)->index('id_ruang');
                $table->enum('audit1', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit2', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit3', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit4', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit5', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit6', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit7', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit8', ['Ya', 'Tidak'])->nullable();
                $table->enum('audit9', ['Ya', 'Tidak']);

                $table->primary(['tanggal', 'id_ruang']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_fasilitas_kebersihan_tangan');
    }
};
