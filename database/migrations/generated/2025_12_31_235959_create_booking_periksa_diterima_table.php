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
        if (!Schema::hasTable('booking_periksa_diterima')) {
            Schema::create('booking_periksa_diterima', function (Blueprint $table) {
                $table->string('no_booking', 17)->primary();
                $table->string('no_rkm_medis', 15)->nullable()->index('no_rkm_medis');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_periksa_diterima');
    }
};
