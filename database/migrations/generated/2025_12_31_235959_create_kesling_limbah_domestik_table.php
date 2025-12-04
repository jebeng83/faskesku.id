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
        if (!Schema::hasTable('kesling_limbah_domestik')) {
            Schema::create('kesling_limbah_domestik', function (Blueprint $table) {
                $table->string('nip', 20);
                $table->dateTime('tanggal');
                $table->double('jumlahlimbah')->nullable();
                $table->dateTime('tanggalangkut')->nullable();
                $table->string('keterangan', 50)->nullable();

                $table->primary(['nip', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kesling_limbah_domestik');
    }
};
