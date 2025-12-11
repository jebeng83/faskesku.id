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
        if (!Schema::hasTable('pengajuan_biaya_disetujui')) {
            Schema::create('pengajuan_biaya_disetujui', function (Blueprint $table) {
                $table->string('no_pengajuan', 20)->primary();
                $table->double('jumlah');
                $table->double('harga');
                $table->double('total');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuan_biaya_disetujui');
    }
};
