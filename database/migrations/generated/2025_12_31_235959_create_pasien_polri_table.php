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
        if (! Schema::hasTable('pasien_polri')) {
            Schema::create('pasien_polri', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15)->primary();
                $table->integer('golongan_polri')->index('golongan_polri');
                $table->integer('pangkat_polri')->index('pangkat_polri');
                $table->integer('satuan_polri')->index('satuan_polri');
                $table->integer('jabatan_polri')->index('jabatan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasien_polri');
    }
};
