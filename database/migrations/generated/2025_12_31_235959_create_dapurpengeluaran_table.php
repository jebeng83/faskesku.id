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
        if (! Schema::hasTable('dapurpengeluaran')) {
            Schema::create('dapurpengeluaran', function (Blueprint $table) {
                $table->string('no_keluar', 15)->primary();
                $table->date('tanggal')->index('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->string('keterangan', 150)->index('keterangan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dapurpengeluaran');
    }
};
