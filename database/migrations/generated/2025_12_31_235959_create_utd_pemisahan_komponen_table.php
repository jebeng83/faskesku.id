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
        if (!Schema::hasTable('utd_pemisahan_komponen')) {
            Schema::create('utd_pemisahan_komponen', function (Blueprint $table) {
                $table->string('no_donor', 15)->primary();
                $table->date('tanggal')->nullable();
                $table->enum('dinas', ['Pagi', 'Siang', 'Sore', 'Malam'])->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utd_pemisahan_komponen');
    }
};
