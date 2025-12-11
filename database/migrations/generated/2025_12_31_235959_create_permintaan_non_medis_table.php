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
        if (!Schema::hasTable('permintaan_non_medis')) {
            Schema::create('permintaan_non_medis', function (Blueprint $table) {
                $table->string('no_permintaan', 20)->primary();
                $table->string('ruang', 50)->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
                $table->date('tanggal')->nullable();
                $table->enum('status', ['Baru', 'Disetujui', 'Tidak Disetujui'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_non_medis');
    }
};
