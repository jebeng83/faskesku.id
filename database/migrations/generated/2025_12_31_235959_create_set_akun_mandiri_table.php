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
        if (!Schema::hasTable('set_akun_mandiri')) {
            Schema::create('set_akun_mandiri', function (Blueprint $table) {
                $table->string('kd_rek', 15)->primary();
                $table->string('kd_rek_biaya', 15);
                $table->string('username', 700)->nullable();
                $table->string('password', 700)->nullable();
                $table->string('client_id', 700)->nullable();
                $table->string('client_secret', 700)->nullable();
                $table->string('kode_rs', 5);
                $table->string('kode_mcm', 8);
                $table->string('no_rekening', 30);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_akun_mandiri');
    }
};
