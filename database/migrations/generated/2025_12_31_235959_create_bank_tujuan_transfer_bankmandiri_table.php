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
        if (!Schema::hasTable('bank_tujuan_transfer_bankmandiri')) {
            Schema::create('bank_tujuan_transfer_bankmandiri', function (Blueprint $table) {
                $table->string('kode_bank', 10)->primary();
                $table->string('nama_bank', 60)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_tujuan_transfer_bankmandiri');
    }
};
