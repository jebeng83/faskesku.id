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
        if (!Schema::hasTable('inventaris_titip_faktur')) {
            Schema::create('inventaris_titip_faktur', function (Blueprint $table) {
                $table->string('no_tagihan', 20)->primary();
                $table->date('tanggal')->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
                $table->string('keterangan', 150)->nullable();
                $table->enum('status', ['Ditagihkan', 'Dibayar']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_titip_faktur');
    }
};
