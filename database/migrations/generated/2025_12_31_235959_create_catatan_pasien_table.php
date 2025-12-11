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
        if (!Schema::hasTable('catatan_pasien')) {
            Schema::create('catatan_pasien', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15)->index('no_rkm_medis');
                $table->text('catatan')->nullable();

                $table->primary(['no_rkm_medis']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_pasien');
    }
};
