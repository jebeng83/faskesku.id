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
        if (! Schema::hasTable('penyakit')) {
            Schema::create('penyakit', function (Blueprint $table) {
                $table->string('kd_penyakit', 15)->primary();
                $table->string('nm_penyakit', 100)->nullable()->index('nm_penyakit');
                $table->text('ciri_ciri')->nullable();
                $table->string('keterangan', 60)->nullable();
                $table->string('kd_ktg', 8)->nullable()->index('kd_ktg');
                $table->enum('status', ['Menular', 'Tidak Menular'])->index('status');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penyakit');
    }
};
