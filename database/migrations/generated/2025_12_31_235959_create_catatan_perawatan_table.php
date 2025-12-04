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
        if (!Schema::hasTable('catatan_perawatan')) {
            Schema::create('catatan_perawatan', function (Blueprint $table) {
                $table->date('tanggal')->nullable();
                $table->time('jam')->nullable();
                $table->string('no_rawat', 17)->nullable()->index('no_rawat');
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->string('catatan', 700)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_perawatan');
    }
};
