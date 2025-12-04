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
        if (!Schema::hasTable('returbeli')) {
            Schema::create('returbeli', function (Blueprint $table) {
                $table->string('no_retur_beli', 20)->primary();
                $table->date('tgl_retur')->nullable();
                $table->char('nip', 20)->nullable()->index('nip');
                $table->char('kode_suplier', 5)->index('kode_suplier');
                $table->char('kd_bangsal', 5)->index('kd_bangsal');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('returbeli');
    }
};
