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
        if (!Schema::hasTable('audit_bundle_iadp')) {
            Schema::create('audit_bundle_iadp', function (Blueprint $table) {
                $table->dateTime('tanggal');
                $table->string('nik', 20)->index('nik');
                $table->enum('handhygiene', ['Ya', 'Tidak'])->nullable();
                $table->enum('apd', ['Ya', 'Tidak'])->nullable();
                $table->enum('skin_antiseptik', ['Ya', 'Tidak'])->nullable();
                $table->enum('lokasi_iv', ['Ya', 'Tidak'])->nullable();
                $table->enum('perawatan_rutin', ['Ya', 'Tidak'])->nullable();

                $table->primary(['tanggal', 'nik']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_bundle_iadp');
    }
};
