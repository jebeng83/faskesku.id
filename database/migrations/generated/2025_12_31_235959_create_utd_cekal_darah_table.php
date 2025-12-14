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
        if (! Schema::hasTable('utd_cekal_darah')) {
            Schema::create('utd_cekal_darah', function (Blueprint $table) {
                $table->string('no_donor', 15)->primary();
                $table->date('tanggal')->nullable();
                $table->enum('dinas', ['Pagi', 'Siang', 'Sore', 'Malam'])->nullable();
                $table->string('petugas_pemusnahan', 20)->nullable()->index('petugas_pemusnahan');
                $table->string('keterangan', 100)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utd_cekal_darah');
    }
};
