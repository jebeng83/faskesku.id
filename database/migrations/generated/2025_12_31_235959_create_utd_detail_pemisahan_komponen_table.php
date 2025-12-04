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
        if (!Schema::hasTable('utd_detail_pemisahan_komponen')) {
            Schema::create('utd_detail_pemisahan_komponen', function (Blueprint $table) {
                $table->string('no_donor', 15)->nullable()->index('no_donor');
                $table->string('no_kantong', 20)->primary();
                $table->string('kode_komponen', 5)->nullable();
                $table->date('tanggal_kadaluarsa')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utd_detail_pemisahan_komponen');
    }
};
