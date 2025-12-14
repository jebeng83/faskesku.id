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
        if (! Schema::hasTable('akun_penagihan_piutang')) {
            Schema::create('akun_penagihan_piutang', function (Blueprint $table) {
                $table->string('kd_rek', 15)->primary();
                $table->string('nama_bank', 70)->nullable();
                $table->string('atas_nama', 50)->nullable();
                $table->string('no_rek', 20)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akun_penagihan_piutang');
    }
};
