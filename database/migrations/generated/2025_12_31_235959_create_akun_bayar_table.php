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
        if (!Schema::hasTable('akun_bayar')) {
            Schema::create('akun_bayar', function (Blueprint $table) {
                $table->string('nama_bayar', 50)->primary();
                $table->string('kd_rek', 15)->nullable()->index('akun_bayar_ibfk_1');
                $table->double('ppn')->nullable()->index('ppn');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akun_bayar');
    }
};
