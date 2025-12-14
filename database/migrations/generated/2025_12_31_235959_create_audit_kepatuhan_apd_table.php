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
        if (! Schema::hasTable('audit_kepatuhan_apd')) {
            Schema::create('audit_kepatuhan_apd', function (Blueprint $table) {
                $table->string('nik', 20);
                $table->string('tindakan', 50);
                $table->dateTime('tanggal');
                $table->enum('topi', ['Ya', 'Tidak'])->nullable();
                $table->enum('masker', ['Ya', 'Tidak'])->nullable();
                $table->enum('kacamata', ['Ya', 'Tidak'])->nullable();
                $table->enum('sarungtangan', ['Ya', 'Tidak'])->nullable();
                $table->enum('apron', ['Ya', 'Tidak'])->nullable();
                $table->enum('sepatu', ['Ya', 'Tidak'])->nullable();

                $table->primary(['nik', 'tindakan', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_kepatuhan_apd');
    }
};
