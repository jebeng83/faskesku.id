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
        if (!Schema::hasTable('kodetransaksi_tujuan_transfer_bankmandiri')) {
            Schema::create('kodetransaksi_tujuan_transfer_bankmandiri', function (Blueprint $table) {
                $table->string('kode_metode', 5)->index('kode_metode');
                $table->string('kode_bank', 10)->index('kode_bank');
                $table->string('kode_transaksi', 15)->nullable();

                $table->primary(['kode_metode', 'kode_bank']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kodetransaksi_tujuan_transfer_bankmandiri');
    }
};
