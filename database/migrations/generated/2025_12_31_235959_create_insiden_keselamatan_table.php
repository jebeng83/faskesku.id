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
        if (! Schema::hasTable('insiden_keselamatan')) {
            Schema::create('insiden_keselamatan', function (Blueprint $table) {
                $table->string('kode_insiden', 5)->primary();
                $table->string('nama_insiden', 100);
                $table->enum('jenis_insiden', ['KTC', 'KNC', 'KTD', 'Sentinel']);
                $table->enum('dampak', ['1. Tidak Signifikan', '2. Minor', '3. Moderat', '4. Mayor', '5. Katastropik']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insiden_keselamatan');
    }
};
