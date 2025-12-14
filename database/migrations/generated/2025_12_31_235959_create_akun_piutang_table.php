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
        if (! Schema::hasTable('akun_piutang')) {
            Schema::create('akun_piutang', function (Blueprint $table) {
                $table->string('nama_bayar', 50)->primary();
                $table->string('kd_rek', 15)->nullable()->index('kd_rek');
                $table->char('kd_pj', 3)->nullable()->index('kd_pj');

                $table->unique(['kd_rek', 'kd_pj'], 'kd_rek_2');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akun_piutang');
    }
};
