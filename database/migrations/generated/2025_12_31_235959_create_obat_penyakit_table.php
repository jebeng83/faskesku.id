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
        if (! Schema::hasTable('obat_penyakit')) {
            Schema::create('obat_penyakit', function (Blueprint $table) {
                $table->string('kd_penyakit', 15)->default('')->index('kd_penyakit');
                $table->string('kode_brng', 15)->index('kd_obat');
                $table->string('referensi', 60)->nullable();

                $table->primary(['kd_penyakit', 'kode_brng']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obat_penyakit');
    }
};
