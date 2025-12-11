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
        if (!Schema::hasTable('zis_keterangan_ternak_penerima_dankes')) {
            Schema::create('zis_keterangan_ternak_penerima_dankes', function (Blueprint $table) {
                $table->char('kode', 3)->primary();
                $table->string('keterangan', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zis_keterangan_ternak_penerima_dankes');
    }
};
