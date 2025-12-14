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
        if (! Schema::hasTable('riwayat_imunisasi')) {
            Schema::create('riwayat_imunisasi', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15);
                $table->string('kode_imunisasi', 3)->index('kode_imunisasi');
                $table->tinyInteger('no_imunisasi');

                $table->primary(['no_rkm_medis', 'kode_imunisasi', 'no_imunisasi']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_imunisasi');
    }
};
